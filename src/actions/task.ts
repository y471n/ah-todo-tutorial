import { Action } from "actionhero";
import { Task } from '../models/Task';
import { type } from "os";

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
    const task = await Task.create(params);
    response.guid = task.guid;
  }
}

export class UpdateTask extends Action {
  constructor() {
    super();
    this.name = "task:update";
    this.description = "Update a task";
    this.inputs = {
      title: {
        required: false,
        validator: (param) => {
          if(typeof param !== "string") {
            throw new Error(`Expected type of title to be string, got ${typeof param}`);
          }
        }
      },
      done: {
        required: false,
        validator: (param) => {
          if(typeof param !== "boolean") {
            throw new Error(`Expected type of done to be string, got ${typeof param}`);
          }
        }
      }
    }
  }

  async run({ connection, params, response }) {
    // Why is connection required, then why not use connection.params everywhere?
    const [numberOfUpdatedRows, tasks] = await Task.update( {done: true}, {
      where: {
        guid: connection.params.taskId
      },
      returning: true
    });
    if(numberOfUpdatedRows < 1) {
      throw new Error(`No such task exists`);
    }
    response.task = tasks[0];
  }
}