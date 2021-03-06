import {
    assertObjectIdGenerator,
    assertRequiredGenerator,
    assertMustBeOfType,
    assertTooLongGenerator,
    assertTooShortGenerator,
  } from '@helpers/asserts'
  import { isObjectId } from '@helpers/validators'
  import Todo from '@models/Todo'


  export default{
      async get({name, projectId}) {
          return Todo.findOne({name, projectId}).exec()
      },
      async getById(todoId) {
          return Todo.findById(todoId).exec()
      },
      async list(projectId, {priority, status}){
          return Todo.find({projectId, properties:{priority, status}}).exec()
      },
      async update(todoId, {name, description, priority, status}){
          const selection = await this.getById(todoId)
          if (name){
            assertMustBeOfType('name', 'string')(typeof name === 'string')
            assertTooShortGenerator('name', '1')(name.length > 1)
            selection.name = name
          }
          if (description){
            assertMustBeOfType('description', 'string')(typeof description === 'string')
            selection.description = description
          }
          if (priority){
            assertMustBeOfType('priority', 'string')(typeof priority === 'string')
            selection.priority = priority
          }
          if (status){
            assertMustBeOfType('status', 'string')(typeof status === 'string')
            selection.status = status
          }
          return selection.save()
      },
      async delete(todoId){
          const selection = await this.getById(todoId)
          return selection.remove()
      }

  }