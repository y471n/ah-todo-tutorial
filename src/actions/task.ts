import { Action } from "actionhero";
import { Task } from '../models/Task';

export class ListTasks extends Action {
  constructor() {
    super();
    this.name = "task:list";
    this.description = "List the tasks";
    this.outputExample = {};
  }

  async run({ params, response }) {
    const tasks = await Task.findAll();
    response.tasks = tasks;
  }
}

export class CreateTask extends Action {
  constructor() {
    super();
    this.name = "task:create";
    this.description = "Create a task";
    this.inputs = {
      title: {
        required: true,
        validator: (param, connection, actionTemplate) => {
          if(typeof param !== "string") {
            throw new Error(`Expected type of title to be string got ${typeof param}`);
          }
        }
      }
    }
  }

  async run({ params, response }) {
    console.log(params);
    const task = await Task.create(params);
    response.guid = task.guid;
  }
}