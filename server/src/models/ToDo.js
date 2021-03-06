import mongoose from 'mongoose'

function validateLocalStrategyProperty(property) {
  return property.length
}

const ToDoSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId, 
      ref:User,
      index: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
      validate: [validateLocalStrategyProperty, 'A name must be provided'],
    },
    creationDate: {
      type: Date,
      required: true,
    },
    timeline: {
        type: [{
          type: mongoose.Types.ObjectId,
          ref: 'TimelineItem'
        }],
        default: []
    },
  })