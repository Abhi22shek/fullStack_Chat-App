import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMessages, getUsersFromSidebar, sendMessages} from '../controllers/message.controller.js';
import upload from '../lib/multer.js';

const router = express.Router();

router.get('/users', protectRoute, getUsersFromSidebar);
router.get('/:id', protectRoute, getMessages);

// Use multer middleware for file uploads
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]);

router.post('/send/:id', protectRoute, uploadFields, sendMessages);

export default router;