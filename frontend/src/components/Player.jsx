import { usePlayer } from '../context/PlayerContext';
import {
    FaPlay,
    FaPause,
    FaStepBackward,
    FaStepForward,
    FaRandom,
    FaRedo,
    FaVolumeUp,
    FaVolumeMute,
    FaHeart,
    FaRegHeart,
    FaMusic
} from 'react-icons/fa';
import { useState } from 'react';

const Player = () => {
    const {
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        shuffle,
        repeat,
        togglePlay,
        playNext,
        playPrevious,
        seekTo,
        setVolume,
        toggleShuffle,
        toggleRepeat
    } = usePlayer();

    const [liked, setLiked] = useState(false);

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seekTo(percent * duration);
    };

    const handleVolumeClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        setVolume(Math.max(0, Math.min(1, percent)));
    };

    return (
        <footer className="player">
            <div className="player-song">
                {currentSong ? (
                    <>
                        {currentSong.coverImage ? (
                            <img src={currentSong.coverImage} alt={currentSong.title} />
                        ) : (
                            <div style={{
                                width: 56,
                                height: 56,
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, #1DB954, #191414)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaMusic color="white" size={20} />
                            </div>
                        )}
                        <div className="player-song-info">
                            <h4>{currentSong.title}</h4>
                            <p>{currentSong.artist}</p>
                        </div>
                        <button
                            className={`player-like ${liked ? 'liked' : ''}`}
                            onClick={() => setLiked(!liked)}
                        >
                            {liked ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </>
                ) : (
                    <>
                        <div style={{
                            width: 56,
                            height: 56,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #282828, #181818)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaMusic color="#535353" size={20} />
                        </div>
                        <div className="player-song-info">
                            <h4 style={{ color: '#b3b3b3' }}>No song playing</h4>
                            <p>Select a song to play</p>
                        </div>
                    </>
                )}
            </div>

            <div className="player-controls">
                <div className="player-buttons">
                    <button
                        className={`player-btn ${shuffle ? 'active' : ''}`}
                        onClick={toggleShuffle}
                        title="Shuffle"
                    >
                        <FaRandom />
                    </button>
                    <button className="player-btn" onClick={playPrevious} title="Previous">
                        <FaStepBackward />
                    </button>
                    <button className="player-btn-main" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: 2 }} />}
                    </button>
                    <button className="player-btn" onClick={playNext} title="Next">
                        <FaStepForward />
                    </button>
                    <button
                        className={`player-btn ${repeat !== 'off' ? 'active' : ''}`}
                        onClick={toggleRepeat}
                        title={repeat === 'one' ? 'Repeat one' : repeat === 'all' ? 'Repeat all' : 'Repeat off'}
                    >
                        <FaRedo />
                        {repeat === 'one' && <span style={{ fontSize: 8, marginLeft: -3 }}>1</span>}
                    </button>
                </div>

                <div className="player-progress">
                    <span className="player-time">{formatTime(currentTime)}</span>
                    <div className="progress-bar" onClick={handleProgressClick}>
                        <div
                            className="progress-fill"
                            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                    </div>
                    <span className="player-time">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="player-volume">
                <button
                    className="player-btn"
                    onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                    title={volume > 0 ? 'Mute' : 'Unmute'}
                >
                    {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
                </button>
                <div className="volume-bar" onClick={handleVolumeClick}>
                    <div className="volume-fill" style={{ width: `${volume * 100}%` }} />
                </div>
            </div>
        </footer>
    );
};

export default Player;
