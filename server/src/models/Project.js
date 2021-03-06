import mongoose from 'mongoose'
import {prioritySchema, statusSchema} from './shared'

function validateLocalStrategyProperty(property) {
  return property.length;
}

const ProjectSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
  name: {
    type: String,
    trim: true,
    required: true,
    validate: [validateLocalStrategyProperty, 'A name must be provided'],
  },
  description: {
    type: String,
    default: "",
  },
  notes: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Note'
    }],
    default: []
  },
  todos: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Todo'
    }],
    default: []
  },
  properties: {
    projectId: {
      type: mongoose.Types.ObjectId,
      index: true,
      required: true,
    },
    // 0=no priority, 1=low, 2=medium, 3=high, 4=higher, 5=highest
    priority: prioritySchema,
    // done=4, in progress=3, to-do=2, backlogged=1, cancelled=0
    status: statusSchema,
    pinned:{
      type: Boolean,
      default: false,
    },
  }
})


const Project = mongoose.model('Project', ProjectSchema)

export default Project
