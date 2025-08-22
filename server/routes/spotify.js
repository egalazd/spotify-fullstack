import express from 'express';
import { searchTracks, health } from '../controllers/spotifyController.js';

const router = express.Router();
router.get('/health', health);
router.get('/search', searchTracks);
export default router;