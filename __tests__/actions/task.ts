import { Process, specHelper } from "actionhero";
const actionhero = new Process();
let api;

describe("Action", () => {
  describe("Create Task", () => {
    beforeAll(async() => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("should add a new task to tasks", async () => {

    });

    test("should return a guid for new task created", async () => {

    });

    test("should not create a task without title param", async () => {

    });

    test("should not create a task when the title is not of type string", async () => {

    });

    test("should have 'done' set to false by default for the new task", () => {

    });

    test("should create new task with 'done' set to false even if 'done' is sent as true in the params", () => {

    });

  });


  describe("Task List", () => {
    beforeAll(async () => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("should return a task response object", async () => {
      const { tasks } = await specHelper.runAction("task:list");
      expect(tasks).toBeDefined();
    });

    test("the task object is a list", async () => {
      const { tasks } = await specHelper.runAction("task:list");
      expect(Array.isArray(tasks)).toBe(true);
    });
  });
});
