import { useState, useEffect } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SongCard from '../components/SongCard';
import { usePlayer } from '../context/PlayerContext';

const genreColors = [
    { name: 'Pop', color: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
    { name: 'Hip-Hop', color: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
    { name: 'Rock', color: 'linear-gradient(135deg, #EF4444, #7C3AED)' },
    { name: 'R&B', color: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' },
    { name: 'Indie', color: 'linear-gradient(135deg, #10B981, #3B82F6)' },
    { name: 'Dance/Electronic', color: 'linear-gradient(135deg, #06B6D4, #3B82F6)' },
    { name: 'Country', color: 'linear-gradient(135deg, #F59E0B, #84CC16)' },
    { name: 'Jazz', color: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' },
    { name: 'Classical', color: 'linear-gradient(135deg, #6366F1, #EC4899)' },
    { name: 'Metal', color: 'linear-gradient(135deg, #1F2937, #6B7280)' },
    { name: 'Soul', color: 'linear-gradient(135deg, #F472B6, #FCD34D)' },
    { name: 'Reggae', color: 'linear-gradient(135deg, #10B981, #FCD34D)' },
    { name: 'Latin', color: 'linear-gradient(135deg, #EF4444, #FCD34D)' },
    { name: 'Chill', color: 'linear-gradient(135deg, #06B6D4, #10B981)' },
    { name: 'Workout', color: 'linear-gradient(135deg, #EF4444, #F59E0B)' },
    { name: 'Focus', color: 'linear-gradient(135deg, #1F2937, #3B82F6)' },
];

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllSongs();
    }, []);

    const fetchAllSongs = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/songs');
            const data = await res.json();
            setAllSongs(data);
        } catch (error) {
            setAllSongs(getDemoSongs());
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
    ];

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            setSearching(true);
            try {
                const res = await fetch(`http://localhost:5000/api/songs/search?q=${encodeURIComponent(value)}`);
                const data = await res.json();
                setResults(data);
            } catch (error) {
                // Search locally
                const filtered = allSongs.filter(song =>
                    song.title.toLowerCase().includes(value.toLowerCase()) ||
                    song.artist.toLowerCase().includes(value.toLowerCase()) ||
                    song.album.toLowerCase().includes(value.toLowerCase())
                );
                setResults(filtered);
            }
        } else {
            setSearching(false);
            setResults([]);
        }
    };

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
                <div className="search-container" style={{ maxWidth: 500 }}>
                    <div className="search-bar">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="What do you want to listen to?"
                            value={query}
                            onChange={handleSearch}
                            autoFocus
                        />
                    </div>
                </div>
                <div className="user-menu">
                    <div className="user-avatar">
                        <FaUser size={12} />
                    </div>
                    <span className="user-name">User</span>
                </div>
            </header>

            <div className="content fade-in">
                {searching ? (
                    <section className="section">
                        <div className="section-header">
                            <h2>Search Results for "{query}"</h2>
                        </div>
                        {results.length > 0 ? (
                            <div className="card-grid">
                                {results.map((song) => (
                                    <SongCard key={song._id} song={song} songs={results} />
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--spotify-text)', marginTop: 20 }}>
                                No results found for "{query}"
                            </p>
                        )}
                    </section>
                ) : (
                    <section className="section">
                        <div className="section-header">
                            <h2>Browse All</h2>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: 24
                        }}>
                            {genreColors.map((genre, index) => (
                                <div
                                    key={genre.name}
                                    onClick={() => setQuery(genre.name)}
                                    style={{
                                        background: genre.color,
                                        borderRadius: 8,
                                        padding: 16,
                                        minHeight: 160,
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <h3 style={{ fontSize: 24, fontWeight: 700 }}>{genre.name}</h3>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default Search;
