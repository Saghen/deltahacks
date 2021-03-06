// 0=no priority, 1=low, 2=medium, 3=high, 4=higher, 5=highest
export const prioritySchema = {
  type: Number,
  enum: [0,1,2,3,4,5],
  min: 0,
  max: 5,
  default: 0,
}


// done=4, in progress=3, to-do=2, backlogged=1, cancelled=0
export const statusSchema = {
  type: Number,
  enum: [0,1,2,3,4],
  min: 0,
  max: 4,
  default: 2,
}
