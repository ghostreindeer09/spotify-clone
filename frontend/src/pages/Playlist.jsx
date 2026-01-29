import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FaChevronLeft,
    FaChevronRight,
    FaUser,
    FaPlay,
    FaPause,
    FaHeart,
    FaEllipsisH,
    FaClock,
    FaMusic
} from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';

const Playlist = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlaylistData();
    }, [id]);

    const getDemoSongs = () => [
        { _id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, coverImage: 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { _id: '2', title: 'Shape of You', artist: 'Ed Sheeran', album: '÷', duration: 234, coverImage: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { _id: '3', title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', album: 'F*CK LOVE 3', duration: 141, coverImage: 'https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { _id: '4', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203, coverImage: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Dua_Lipa_-_Levitating.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
        { _id: '5', title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", duration: 167, coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Harry_Styles_-_As_It_Was.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { _id: '6', title: 'Bad Bunny', artist: 'Tití Me Preguntó', album: 'Un Verano Sin Ti', duration: 244, coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/41/Bad_Bunny_-_Un_Verano_sin_Ti.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
        { _id: '7', title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: 200, coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
        { _id: '8', title: 'About Damn Time', artist: 'Lizzo', album: 'Special', duration: 192, coverImage: 'https://upload.wikimedia.org/wikipedia/en/1/18/Lizzo_-_About_Damn_Time.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    ];

    const fetchPlaylistData = async () => {
        try {
            // For demo, just use hardcoded data
            const demoPlaylists = {
                p1: { name: "Today's Top Hits", description: 'The hottest tracks right now. Cover: Dua Lipa', songs: getDemoSongs().slice(0, 6) },
                p2: { name: 'Chill Vibes', description: 'Kick back and relax with these smooth tracks', songs: getDemoSongs().slice(2, 7) },
                p3: { name: 'Workout Mix', description: 'Power through your workout', songs: getDemoSongs().slice(1, 6) },
                p4: { name: 'Discover Weekly', description: 'Your personal mixtape of fresh music', songs: getDemoSongs().slice(0, 5) },
                p5: { name: 'Release Radar', description: 'Catch all the latest releases', songs: getDemoSongs().slice(3, 8) },
                p6: { name: 'Liked Songs', description: 'Your favorite tracks', songs: getDemoSongs() },
                liked: { name: 'Liked Songs', description: 'Your favorite tracks', songs: getDemoSongs() },
            };

            const playlistData = demoPlaylists[id] || {
                name: 'Unknown Playlist',
                description: 'Playlist not found',
                songs: getDemoSongs().slice(0, 5)
            };

            setPlaylist({
                _id: id,
                ...playlistData,
                coverImage: ''
            });
            setSongs(playlistData.songs);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayAll = () => {
        if (songs.length > 0) {
            playSong(songs[0], songs);
        }
    };

    const handlePlaySong = (song) => {
        if (currentSong?._id === song._id) {
            togglePlay();
        } else {
            playSong(song, songs);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <>
            <header className="header">
                <div className="header-nav">
                    <button className="header-btn" onClick={() => navigate(-1)}>
                        <FaChevronLeft />
                    </button>
                    <button className="header-btn" onClick={() => navigate(1)}>
                        <FaChevronRight />
                    </button>
                </div>
                <div className="user-menu">
                    <div className="user-avatar">
                        <FaUser size={12} />
                    </div>
                    <span className="user-name">User</span>
                </div>
            </header>

            <div className="content fade-in">
                {/* Playlist Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 24,
                    padding: '40px 0',
                    background: `linear-gradient(180deg, rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 100)}, 0.6) 0%, transparent 100%)`,
                    margin: '-32px -32px 0',
                    padding: '60px 32px 24px'
                }}>
                    <div style={{
                        width: 232,
                        height: 232,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #450af5, #8e2de2)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <FaMusic color="white" size={80} />
                    </div>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Playlist</p>
                        <h1 style={{ fontSize: 72, fontWeight: 900, marginBottom: 24, lineHeight: 1 }}>
                            {playlist?.name}
                        </h1>
                        <p style={{ color: 'var(--spotify-text)', fontSize: 14, marginBottom: 8 }}>
                            {playlist?.description}
                        </p>
                        <p style={{ fontSize: 14 }}>
                            <span style={{ fontWeight: 600 }}>Spotify</span>
                            <span style={{ color: 'var(--spotify-text)' }}> • {songs.length} songs</span>
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    padding: '24px 0'
                }}>
                    <button
                        onClick={handlePlayAll}
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            background: 'var(--spotify-green)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s ease, background 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.background = 'var(--spotify-green-light)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = 'var(--spotify-green)';
                        }}
                    >
                        <FaPlay color="black" size={22} style={{ marginLeft: 4 }} />
                    </button>
                    <button style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--spotify-text)',
                        cursor: 'pointer',
                        padding: 8
                    }}>
                        <FaHeart size={32} />
                    </button>
                    <button style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--spotify-text)',
                        cursor: 'pointer',
                        padding: 8
                    }}>
                        <FaEllipsisH size={24} />
                    </button>
                </div>

                {/* Song List */}
                <div className="song-list">
                    <div className="song-list-header">
                        <span>#</span>
                        <span>Title</span>
                        <span>Album</span>
                        <span><FaClock /></span>
                    </div>
                    {songs.map((song, index) => (
                        <div
                            key={song._id}
                            className={`song-list-item ${currentSong?._id === song._id ? 'playing' : ''}`}
                            onClick={() => handlePlaySong(song)}
                        >
                            <div className="song-list-number">
                                <span>{index + 1}</span>
                                {currentSong?._id === song._id && isPlaying ? (
                                    <div className="now-playing-animation">
                                        <span></span><span></span><span></span>
                                    </div>
                                ) : (
                                    <FaPlay size={12} />
                                )}
                            </div>
                            <div className="song-list-song">
                                {song.coverImage ? (
                                    <img src={song.coverImage} alt={song.title} />
                                ) : (
                                    <div style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, #1DB954, #191414)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <FaMusic color="white" size={16} />
                                    </div>
                                )}
                                <div>
                                    <div className="song-list-title">{song.title}</div>
                                    <div className="song-list-artist">{song.artist}</div>
                                </div>
                            </div>
                            <div className="song-list-album">{song.album}</div>
                            <div className="song-list-duration">{formatDuration(song.duration)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Playlist;
