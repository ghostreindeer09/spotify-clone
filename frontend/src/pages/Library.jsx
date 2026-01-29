import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaUser, FaPlus, FaMusic } from 'react-icons/fa';
import PlaylistCard from '../components/PlaylistCard';

const Library = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/playlists');
            const data = await res.json();
            setPlaylists(data);
        } catch (error) {
            setPlaylists([
                { _id: 'p1', name: "Today's Top Hits", description: 'The hottest tracks right now', coverImage: '' },
                { _id: 'p2', name: 'Chill Vibes', description: 'Kick back and relax', coverImage: '' },
                { _id: 'p3', name: 'Workout Mix', description: 'Power through your workout', coverImage: '' },
                { _id: 'p4', name: 'Discover Weekly', description: 'Your personal mixtape', coverImage: '' },
                { _id: 'p5', name: 'Release Radar', description: 'Latest music from artists you follow', coverImage: '' },
                { _id: 'p6', name: 'Liked Songs', description: 'Your favorite tracks', coverImage: '' },
            ]);
        } finally {
            setLoading(false);
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
                <section className="section">
                    <div className="section-header">
                        <h2>Your Library</h2>
                        <button
                            style={{
                                background: 'var(--spotify-green)',
                                border: 'none',
                                borderRadius: 20,
                                padding: '8px 16px',
                                color: 'black',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8
                            }}
                        >
                            <FaPlus size={12} />
                            Create Playlist
                        </button>
                    </div>

                    <div className="card-grid">
                        {/* Liked Songs special card */}
                        <div
                            className="playlist-card"
                            onClick={() => navigate('/playlist/liked')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="playlist-card-image" style={{
                                background: 'linear-gradient(135deg, #450af5, #8e2de2)',
                            }}>
                                <FaMusic color="white" size={48} />
                            </div>
                            <h4>Liked Songs</h4>
                            <p>Your favorite tracks</p>
                        </div>

                        {playlists.map((playlist) => (
                            <PlaylistCard key={playlist._id} playlist={playlist} />
                        ))}
                    </div>
                </section>

                <section className="section" style={{ marginTop: 40 }}>
                    <div className="section-header">
                        <h2>Your Playlists</h2>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 8,
                        padding: 16
                    }}>
                        {playlists.map((playlist, index) => (
                            <div
                                key={playlist._id}
                                onClick={() => navigate(`/playlist/${playlist._id}`)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                    padding: 8,
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 4,
                                    background: `linear-gradient(135deg, hsl(${index * 40}, 70%, 50%), hsl(${index * 40 + 60}, 70%, 40%))`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FaMusic color="white" size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: 14, marginBottom: 4 }}>{playlist.name}</h4>
                                    <p style={{ fontSize: 12, color: 'var(--spotify-text)' }}>Playlist • {playlist.songs?.length || 5} songs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Library;
