import mongoose from 'mongoose'
import {prioritySchema, statusSchema} from './shared'

const TimelineItemSchema = new mongoose.Schema({
  activityType: {
    type: String,
    enum: ['comment', 'event'],
    required: true,
  },

  eventType: {
    type: String,
    enum: ['titleChange', 'priorityChange', 'statusChange', 'pinnedChange', 'descriptionChange'],
    required: function () {
      activityType === 'event'
    },
  },

  commentType: {
    type: String,
    required: function () {
      activityType === 'comment'
    },
  },
})
