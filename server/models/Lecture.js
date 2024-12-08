import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  liveLink: {
    type: String,
    required: true
  },
  recordedLink: {
    type: String
  },
  startTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  isLive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Lecture', lectureSchema);