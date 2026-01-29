import { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [queue, setQueue] = useState([]);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState('off'); // 'off', 'all', 'one'

    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            if (repeat === 'one') {
                audio.currentTime = 0;
                audio.play();
            } else {
                playNext();
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [repeat]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const playSong = (song, songList = []) => {
        if (song.audioUrl) {
            audioRef.current.src = song.audioUrl;
            audioRef.current.play().catch(console.error);
            setCurrentSong(song);
            setIsPlaying(true);

            if (songList.length > 0) {
                setQueue(songList);
            }
        }
    };

    const togglePlay = () => {
        if (currentSong) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(console.error);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const playNext = () => {
        if (queue.length > 0 && currentSong) {
            const currentIndex = queue.findIndex(s => s._id === currentSong._id);
            let nextIndex;

            if (shuffle) {
                nextIndex = Math.floor(Math.random() * queue.length);
            } else {
                nextIndex = (currentIndex + 1) % queue.length;
            }

            playSong(queue[nextIndex], queue);
        }
    };

    const playPrevious = () => {
        if (queue.length > 0 && currentSong) {
            const currentIndex = queue.findIndex(s => s._id === currentSong._id);
            const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
            playSong(queue[prevIndex], queue);
        }
    };

    const seekTo = (time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const toggleShuffle = () => {
        setShuffle(!shuffle);
    };

    const toggleRepeat = () => {
        const modes = ['off', 'all', 'one'];
        const currentIndex = modes.indexOf(repeat);
        setRepeat(modes[(currentIndex + 1) % modes.length]);
    };

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            currentTime,
            duration,
            volume,
            queue,
            shuffle,
            repeat,
            playSong,
            togglePlay,
            playNext,
            playPrevious,
            seekTo,
            setVolume,
            toggleShuffle,
            toggleRepeat
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
