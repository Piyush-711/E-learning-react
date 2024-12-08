import express from 'express';
import Course from '../models/Course.js';
import auth from '../middleware/auth.js';
import { isTeacher } from '../middleware/roles.js';

const router = express.Router();

// Get all courses
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name')
      .populate('lectures');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a course (teachers only)
router.post('/', [auth, isTeacher], async (req, res) => {
  try {
    const { title, language, description, level } = req.body;

    const course = new Course({
      title,
      language,
      description,
      level,
      teacher: req.user.userId
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in a course (students only)
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.students.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.students.push(req.user.userId);
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add lecture to course (teachers only)
router.post('/:id/lectures', [auth, isTeacher], async (req, res) => {
  try {
    const { lectureId } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    course.lectures.push(lectureId);
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;