import Project from '@models/Project'


export default {
  /* async get({ userId }) {
    assertObjectIdGenerator('userId')(isObjectId(userId))
    return await User.findById(userId).then(assertUserNotFound)
  }, */

  async getByName({ name }) {
    return (await Project.findOne({name})).exec();
  },
    
  async getByDescription({ description }) {
    return (await Project.findOne({description})).exec();
  },
    
  async getByPriority({ priority }){
    return (await Project.findOne({priority})).exec();
  },
  async getByStatus({ status }){
    return (await Project.findOne({status})).exec();
  },

  async list() {
    return Project.find().exec()
  },


}