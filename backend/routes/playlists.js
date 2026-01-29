const express = require('express');
const Playlist = require('../models/Playlist');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Demo playlists
const demoPlaylists = [
    {
        _id: 'p1',
        name: 'Today\'s Top Hits',
        description: 'The hottest tracks right now',
        coverImage: 'https://i.scdn.co/image/ab67706f00000003e1bdd94f3c7e3e7dce3e3e3e',
        songs: ['1', '2', '3', '4', '5'],
        isPublic: true
    },
    {
        _id: 'p2',
        name: 'Chill Vibes',
        description: 'Kick back and relax',
        coverImage: 'https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6',
        songs: ['6', '7', '8', '9'],
        isPublic: true
    },
    {
        _id: 'p3',
        name: 'Workout Mix',
        description: 'Power through your workout',
        coverImage: 'https://i.scdn.co/image/ab67706f00000003e0e4e9e9e9e9e9e9e9e9e9e9',
        songs: ['10', '11', '12', '1', '2'],
        isPublic: true
    },
    {
        _id: 'p4',
        name: 'Discover Weekly',
        description: 'Your personal mixtape of fresh music',
        coverImage: 'https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/l',
        songs: ['3', '5', '7', '9', '11'],
        isPublic: true
    },
    {
        _id: 'p5',
        name: 'Release Radar',
        description: 'Catch all the latest music from artists you follow',
        coverImage: 'https://i.scdn.co/image/ab67706f00000003b71ce5f77e2f6aee6c5a7e7e',
        songs: ['2', '4', '6', '8', '10'],
        isPublic: true
    },
    {
        _id: 'p6',
        name: 'Liked Songs',
        description: 'Your favorite tracks',
        coverImage: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
        songs: ['1', '3', '5', '7', '9', '11'],
        isPublic: false
    }
];

// Get all playlists
router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find({ isPublic: true })
            .populate('owner', 'username')
            .sort({ createdAt: -1 });

        if (playlists.length === 0) {
            return res.json(demoPlaylists);
        }
        res.json(playlists);
    } catch (error) {
        res.json(demoPlaylists);
    }
});

// Get user's playlists
router.get('/my', authMiddleware, async (req, res) => {
    try {
        const playlists = await Playlist.find({ owner: req.user.id })
            .populate('songs')
            .sort({ createdAt: -1 });
        res.json(playlists);
    } catch (error) {
        res.json([]);
    }
});

// Get playlist by ID
router.get('/:id', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
            .populate('songs')
            .populate('owner', 'username');

        if (!playlist) {
            const demoPlaylist = demoPlaylists.find(p => p._id === req.params.id);
            if (demoPlaylist) return res.json(demoPlaylist);
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (error) {
        const demoPlaylist = demoPlaylists.find(p => p._id === req.params.id);
        if (demoPlaylist) return res.json(demoPlaylist);
        res.status(500).json({ message: error.message });
    }
});

// Create playlist
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, description, coverImage, isPublic } = req.body;
        const playlist = new Playlist({
            name,
            description,
            coverImage,
            owner: req.user.id,
            isPublic: isPublic !== false
        });
        await playlist.save();
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add song to playlist
router.post('/:id/songs', authMiddleware, async (req, res) => {
    try {
        const { songId } = req.body;
        const playlist = await Playlist.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            await playlist.save();
        }

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove song from playlist
router.delete('/:id/songs/:songId', authMiddleware, async (req, res) => {
    try {
        const playlist = await Playlist.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        playlist.songs = playlist.songs.filter(
            song => song.toString() !== req.params.songId
        );
        await playlist.save();

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
