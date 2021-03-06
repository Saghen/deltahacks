import mongoose from 'mongoose'
import {prioritySchema, statusSchema} from './shared'

const ToDoSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
    index: true,
    required: true,
  },
  name: {
    title: String,
    trim: true,
    required: true,
    index: true,
    minLength: 1,
  },
  description: {
    type: String,
    trim: true,
  },
  timeline: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'TimelineItem',
      },
    ],
    default: [],
  },
  referenceId: {
    type: Number,
    required: true,
    index: true,
  },
  properties: {
    // 0=no priority, 1=low, 2=medium, 3=high, 4=higher, 5=highest
    priority: prioritySchema,
    // done=4, in progress=3, to-do=2, backlogged=1, cancelled=0
    status: statusSchema,
    pinned: {
      type: Boolean,
      default: false,
    },
  },
})
