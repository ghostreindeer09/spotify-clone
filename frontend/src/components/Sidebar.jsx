import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaSpotify,
    FaHome,
    FaSearch,
    FaBook,
    FaPlus,
    FaMusic
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/playlists');
            const data = await response.json();
            setPlaylists(data.slice(0, 6));
        } catch (error) {
            // Use demo playlists if backend is not available
            setPlaylists([
                { _id: 'p1', name: "Today's Top Hits", description: 'The hottest tracks right now', coverImage: '' },
                { _id: 'p2', name: 'Chill Vibes', description: 'Kick back and relax', coverImage: '' },
                { _id: 'p3', name: 'Workout Mix', description: 'Power through your workout', coverImage: '' },
                { _id: 'p4', name: 'Discover Weekly', description: 'Your personal mixtape', coverImage: '' },
                { _id: 'p5', name: 'Release Radar', description: 'Latest music from artists you follow', coverImage: '' },
                { _id: 'p6', name: 'Liked Songs', description: 'Your favorite tracks', coverImage: '' },
            ]);
        }
    };

    return (
        <aside className="sidebar">
            <div className="logo">
                <FaSpotify />
                <h1>Spotify</h1>
            </div>

            <nav className="nav-section">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <FaHome />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <FaSearch />
                    <span>Search</span>
                </NavLink>
            </nav>

            <div className="library-section">
                <div className="library-header">
                    <h3>
                        <FaBook />
                        <span>Your Library</span>
                    </h3>
                    <button title="Create playlist">
                        <FaPlus />
                    </button>
                </div>

                <div className="library-list">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist._id}
                            className="library-item"
                            onClick={() => navigate(`/playlist/${playlist._id}`)}
                        >
                            {playlist.coverImage ? (
                                <img src={playlist.coverImage} alt={playlist.name} />
                            ) : (
                                <div style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 4,
                                    background: 'linear-gradient(135deg, #450af5, #c4efd9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FaMusic color="white" />
                                </div>
                            )}
                            <div className="library-item-info">
                                <h4>{playlist.name}</h4>
                                <p>Playlist</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
