import { useNavigate } from 'react-router-dom';
import { FaPlay, FaMusic } from 'react-icons/fa';

const PlaylistCard = ({ playlist }) => {
    const navigate = useNavigate();

    return (
        <div className="playlist-card" onClick={() => navigate(`/playlist/${playlist._id}`)}>
            <div className="playlist-card-image">
                {playlist.coverImage ? (
                    <img src={playlist.coverImage} alt={playlist.name} />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #450af5 0%, #8e2de2 50%, #c4efd9 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FaMusic color="white" size={48} />
                    </div>
                )}
                <button className="play-button">
                    <FaPlay />
                </button>
            </div>
            <h4>{playlist.name}</h4>
            <p>{playlist.description || 'Playlist'}</p>
        </div>
    );
};

export default PlaylistCard;
