import { BadRequest, Forbidden, NotFound } from 'fejl'

import Project from '@models/Project'
import { isObjectId } from '@helpers/validators'
import { assertInvalidToken } from './asserts'

import {assertObjectIdGenerator,
  assertRequiredGenerator,
  assertMustBeOfType,
  assertTooLongGenerator,
  assertTooShortGenerator,
} from '@helpers/asserts'
import { get } from 'mongoose'



export default {
  async get(userId, {name}) {
    return (await Project.findOne({userId, name}).exec());
  },

  async getById({ projectId }) {
    assertObjectIdGenerator('projectId')(isObjectId(projectId));
    return (await Project.findById(projectId).then(assertInvalidToken));
  },

  async list(userId, {priority, status}){
    return (await Project.find({
      userId: userId,
      priority: priority,
      status: status,
    }).exec());
  },

  async getByName({ name }) {
    assertMustBeOfType('name', String);
    return (await Project.findOne({name}).exec());
  },

  async update(projectId, {name, description, priority, status}){
    const updateProject = await(this.getById({projectId}));
    if(name) updateProject.name = name;
    if(description) updateProject.description = description;
    if(priority) updateProject.priority = priority;
    if(status) updateProject.status = status;
    return (await updateProject.save().exec());
  },

  async delete(projectId){
    const deleteProject = await(this.getById({projectId}));
    await(deleteProject.delete().exec());
  }
}