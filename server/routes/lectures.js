import express from 'express';
import Lecture from '../models/Lecture.js';
import auth from '../middleware/auth.js';
import { isTeacher } from '../middleware/roles.js';

const router = express.Router();

// Get all lectures
router.get('/', auth, async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('teacher', 'name');
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a lecture (teachers only)
router.post('/', [auth, isTeacher], async (req, res) => {
  try {
    const { title, description, liveLink, startTime, duration } = req.body;

    const lecture = new Lecture({
      title,
      description,
      liveLink,
      startTime,
      duration,
      teacher: req.user.userId
    });

    await lecture.save();
    res.status(201).json(lecture);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lecture status
router.patch('/:id/status', [auth, isTeacher], async (req, res) => {
  try {
    const { isLive } = req.body;
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    if (lecture.teacher.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    lecture.isLive = isLive;
    await lecture.save();

    res.json(lecture);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;