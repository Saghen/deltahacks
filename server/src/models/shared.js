export const prioritySchema = {
  type: Number,
  min: 0,
  max: 5,
  default: 0,
  // done=4, in progress=3, to-do=2, backlogged=1, cancelled=0
}

export const statusSchema = {
  type: Number,
  min: 0,
  max: 4,
  default: 2,
}
