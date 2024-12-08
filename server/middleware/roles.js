import User from '../models/User.js';

export const isTeacher = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user || user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Teachers only.' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};