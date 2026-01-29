import { usePlayer } from '../context/PlayerContext';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

const SongCard = ({ song, songs }) => {
    const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();

    const isCurrentSong = currentSong?._id === song._id;

    const handleClick = () => {
        if (isCurrentSong) {
            togglePlay();
        } else {
            playSong(song, songs);
        }
    };

    return (
        <div className="song-card" onClick={handleClick}>
            <div className="song-card-image">
                {song.coverImage ? (
                    <img src={song.coverImage} alt={song.title} />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FaMusic color="white" size={40} />
                    </div>
                )}
                <button className="play-button" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
                    {isCurrentSong && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
            </div>
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
        </div>
    );
};

export default SongCard;
