import { Action } from "actionhero";

export class ListTasks extends Action {
  constructor() {
    super();
    this.name = "task:list";
    this.description = "List the tasks";
    this.outputExample = {};
  }

  async run(data) {
    // your logic here
    data.response.ok = true;
  }
}
