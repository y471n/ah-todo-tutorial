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
