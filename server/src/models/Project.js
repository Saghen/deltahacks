import mongoose from 'mongoose'

function validateLocalStrategyProperty(property) {
  return property.length
}

const ProjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
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
  properties: {
    tags: [
      {
        yo: {
          type: String,
        },
      },
    ],
    userIds: {
      type: [mongoose.Types.ObjectId],
    },
  },
})

const Project = mongoose.model('Project', ProjectSchema)

export default Project
