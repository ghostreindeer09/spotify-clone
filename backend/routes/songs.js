const express = require('express');
const Song = require('../models/Song');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Demo songs data (for when MongoDB is not connected)
const demoSongs = [
    {
        _id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 200,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        genre: 'Synth-pop',
        plays: 2847493
    },
    {
        _id: '2',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: '÷',
        duration: 234,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        genre: 'Pop',
        plays: 5892748
    },
    {
        _id: '3',
        title: 'Stay',
        artist: 'The Kid LAROI & Justin Bieber',
        album: 'F*CK LOVE 3',
        duration: 141,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        genre: 'Pop',
        plays: 3284729
    },
    {
        _id: '4',
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        duration: 203,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Dua_Lipa_-_Levitating.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        genre: 'Disco-pop',
        plays: 4192837
    },
    {
        _id: '5',
        title: 'As It Was',
        artist: 'Harry Styles',
        album: "Harry's House",
        duration: 167,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Harry_Styles_-_As_It_Was.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        genre: 'Synth-pop',
        plays: 3847291
    },
    {
        _id: '6',
        title: 'Bad Bunny',
        artist: 'Tití Me Preguntó',
        album: 'Un Verano Sin Ti',
        duration: 244,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/41/Bad_Bunny_-_Un_Verano_sin_Ti.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        genre: 'Reggaeton',
        plays: 2938471
    },
    {
        _id: '7',
        title: 'Anti-Hero',
        artist: 'Taylor Swift',
        album: 'Midnights',
        duration: 200,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        genre: 'Synth-pop',
        plays: 4829371
    },
    {
        _id: '8',
        title: 'About Damn Time',
        artist: 'Lizzo',
        album: 'Special',
        duration: 192,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/1/18/Lizzo_-_About_Damn_Time.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        genre: 'Disco',
        plays: 2384719
    },
    {
        _id: '9',
        title: 'Heat Waves',
        artist: 'Glass Animals',
        album: 'Dreamland',
        duration: 238,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Glass_Animals_-_Dreamland.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        genre: 'Indie pop',
        plays: 3847192
    },
    {
        _id: '10',
        title: 'Positions',
        artist: 'Ariana Grande',
        album: 'Positions',
        duration: 172,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Ariana_Grande_-_Positions.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        genre: 'R&B',
        plays: 3192847
    },
    {
        _id: '11',
        title: 'Peaches',
        artist: 'Justin Bieber',
        album: 'Justice',
        duration: 198,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Justin_Bieber_-_Peaches.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        genre: 'R&B',
        plays: 2847391
    },
    {
        _id: '12',
        title: 'Montero',
        artist: 'Lil Nas X',
        album: 'Montero',
        duration: 137,
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Lil_Nas_X_-_Montero_%28Call_Me_by_Your_Name%29.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        genre: 'Pop rap',
        plays: 2938172
    }
];

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        if (songs.length === 0) {
            return res.json(demoSongs);
        }
        res.json(songs);
    } catch (error) {
        // Return demo songs if DB error
        res.json(demoSongs);
    }
});

// Search songs
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json([]);
        }

        const songs = await Song.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { artist: { $regex: q, $options: 'i' } },
                { album: { $regex: q, $options: 'i' } }
            ]
        });

        if (songs.length === 0) {
            // Search in demo songs
            const filtered = demoSongs.filter(song =>
                song.title.toLowerCase().includes(q.toLowerCase()) ||
                song.artist.toLowerCase().includes(q.toLowerCase()) ||
                song.album.toLowerCase().includes(q.toLowerCase())
            );
            return res.json(filtered);
        }

        res.json(songs);
    } catch (error) {
        // Search in demo songs
        const { q } = req.query;
        const filtered = demoSongs.filter(song =>
            song.title.toLowerCase().includes(q.toLowerCase()) ||
            song.artist.toLowerCase().includes(q.toLowerCase()) ||
            song.album.toLowerCase().includes(q.toLowerCase())
        );
        res.json(filtered);
    }
});

// Get song by ID
router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            const demoSong = demoSongs.find(s => s._id === req.params.id);
            if (demoSong) return res.json(demoSong);
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(song);
    } catch (error) {
        const demoSong = demoSongs.find(s => s._id === req.params.id);
        if (demoSong) return res.json(demoSong);
        res.status(500).json({ message: error.message });
    }
});

// Increment play count
router.post('/:id/play', async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            { $inc: { plays: 1 } },
            { new: true }
        );
        if (!song) {
            return res.json({ success: true }); // Demo mode
        }
        res.json(song);
    } catch (error) {
        res.json({ success: true }); // Demo mode
    }
});

module.exports = router;
