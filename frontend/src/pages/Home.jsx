import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaUser, FaPlay, FaMusic } from 'react-icons/fa';
import SongCard from '../components/SongCard';
import PlaylistCard from '../components/PlaylistCard';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [greeting, setGreeting] = useState('Good evening');
    const navigate = useNavigate();
    const { playSong } = usePlayer();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good morning');
        } else if (hour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [songsRes, playlistsRes] = await Promise.all([
                fetch('http://localhost:5000/api/songs'),
                fetch('http://localhost:5000/api/playlists')
            ]);

            const songsData = await songsRes.json();
            const playlistsData = await playlistsRes.json();

            setSongs(songsData);
            setPlaylists(playlistsData);
        } catch (error) {
            // Use demo data if backend is not available
            setSongs(getDemoSongs());
            setPlaylists(getDemoPlaylists());
        } finally {
            setLoading(false);
        }
    };

    const getDemoSongs = () => [
        { _id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, coverImage: 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', genre: 'Synth-pop', plays: 2847493 },
        { _id: '2', title: 'Shape of You', artist: 'Ed Sheeran', album: '÷', duration: 234, coverImage: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', genre: 'Pop', plays: 5892748 },
        { _id: '3', title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', album: 'F*CK LOVE 3', duration: 141, coverImage: 'https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', genre: 'Pop', plays: 3284729 },
        { _id: '4', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203, coverImage: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Dua_Lipa_-_Levitating.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', genre: 'Disco-pop', plays: 4192837 },
        { _id: '5', title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", duration: 167, coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Harry_Styles_-_As_It_Was.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', genre: 'Synth-pop', plays: 3847291 },
        { _id: '6', title: 'Bad Bunny', artist: 'Tití Me Preguntó', album: 'Un Verano Sin Ti', duration: 244, coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/41/Bad_Bunny_-_Un_Verano_sin_Ti.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', genre: 'Reggaeton', plays: 2938471 },
        { _id: '7', title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: 200, coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', genre: 'Synth-pop', plays: 4829371 },
        { _id: '8', title: 'About Damn Time', artist: 'Lizzo', album: 'Special', duration: 192, coverImage: 'https://upload.wikimedia.org/wikipedia/en/1/18/Lizzo_-_About_Damn_Time.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', genre: 'Disco', plays: 2384719 },
        { _id: '9', title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: 238, coverImage: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Glass_Animals_-_Dreamland.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', genre: 'Indie pop', plays: 3847192 },
        { _id: '10', title: 'Positions', artist: 'Ariana Grande', album: 'Positions', duration: 172, coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Ariana_Grande_-_Positions.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', genre: 'R&B', plays: 3192847 },
        { _id: '11', title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: 198, coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Justin_Bieber_-_Peaches.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', genre: 'R&B', plays: 2847391 },
        { _id: '12', title: 'Montero', artist: 'Lil Nas X', album: 'Montero', duration: 137, coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Lil_Nas_X_-_Montero_%28Call_Me_by_Your_Name%29.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', genre: 'Pop rap', plays: 2938172 }
    ];

    const getDemoPlaylists = () => [
        { _id: 'p1', name: "Today's Top Hits", description: 'The hottest tracks right now', coverImage: '' },
        { _id: 'p2', name: 'Chill Vibes', description: 'Kick back and relax', coverImage: '' },
        { _id: 'p3', name: 'Workout Mix', description: 'Power through your workout', coverImage: '' },
        { _id: 'p4', name: 'Discover Weekly', description: 'Your personal mixtape', coverImage: '' },
        { _id: 'p5', name: 'Release Radar', description: 'Latest music from artists you follow', coverImage: '' },
        { _id: 'p6', name: 'Liked Songs', description: 'Your favorite tracks', coverImage: '' }
    ];

    const quickPicks = songs.slice(0, 6);

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
                <section className="welcome-section">
                    <h1>{greeting}</h1>
                    <div className="welcome-grid">
                        {quickPicks.map((song) => (
                            <div
                                key={song._id}
                                className="welcome-card"
                                onClick={() => playSong(song, songs)}
                            >
                                {song.coverImage ? (
                                    <img src={song.coverImage} alt={song.title} />
                                ) : (
                                    <div style={{
                                        width: 80,
                                        height: 80,
                                        background: 'linear-gradient(135deg, #1DB954, #191414)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <FaMusic color="white" size={24} />
                                    </div>
                                )}
                                <h4>{song.title}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="section">
                    <div className="section-header">
                        <h2>Made for You</h2>
                        <a href="#">Show all</a>
                    </div>
                    <div className="card-grid">
                        {playlists.slice(0, 5).map((playlist) => (
                            <PlaylistCard key={playlist._id} playlist={playlist} />
                        ))}
                    </div>
                </section>

                <section className="section">
                    <div className="section-header">
                        <h2>Popular Tracks</h2>
                        <a href="#">Show all</a>
                    </div>
                    <div className="card-grid">
                        {songs.slice(0, 5).map((song) => (
                            <SongCard key={song._id} song={song} songs={songs} />
                        ))}
                    </div>
                </section>

                <section className="section">
                    <div className="section-header">
                        <h2>Recently Played</h2>
                        <a href="#">Show all</a>
                    </div>
                    <div className="card-grid">
                        {songs.slice(5, 10).map((song) => (
                            <SongCard key={song._id} song={song} songs={songs} />
                        ))}
                    </div>
                </section>

                <section className="section">
                    <div className="section-header">
                        <h2>Jump Back In</h2>
                        <a href="#">Show all</a>
                    </div>
                    <div className="card-grid">
                        {playlists.slice(0, 5).map((playlist, index) => (
                            <PlaylistCard key={`jump-${playlist._id}-${index}`} playlist={playlist} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
