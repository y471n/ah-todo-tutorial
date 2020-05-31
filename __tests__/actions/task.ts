import { Process, specHelper } from "actionhero";
const actionhero = new Process();
let api;

describe("Action", () => {
  describe("Get Task", () => {
    beforeAll(async () => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("Should throw an error if taskId is not passed to get task", async () => {
      const response = await specHelper.runAction("task:get");
      expect(response.error).toBeTruthy();
      expect(response.error).toBe(
        "Error: taskId is a required parameter for this action"
      );
    });

    test("Should throw an error when task with taskId does not exist", async () => {
      const taskId = "5ab0c467-eb53-4288-9390-51f4d5f1f211";
      const response = await specHelper.runAction("task:get", {
        taskId: taskId,
      });
      expect(response.error).toBeTruthy();
      expect(response.error).toBe(
        `Error: Task does not exist with taskId: ${taskId}`
      );
    });

    test.only("Should response with task object when task with passed GUID exists", async () => {
      const newTaskTitle = "Cure Cancer";
      const { guid } = await specHelper.runAction("task:create", {
        title: newTaskTitle,
      });
      expect(guid).toBeTruthy();
      const response = await specHelper.runAction("task:get", { taskId: guid });
      expect(response.task).toBeTruthy();
      expect(response.error).toBeFalsy();
      expect(response.task.guid).toBe(guid);
      expect(response.task.title).toBe(newTaskTitle);
      expect(response.task.done).toBe(false);
    });
  });

  describe("Create Task", () => {
    beforeAll(async () => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("should not create a task without title param", async () => {
      const response = await specHelper.runAction("task:create");
      expect(response.guid).toBeFalsy();
      expect(response.error).toBeTruthy();
      expect(response.error).toBe(
        "Error: title is a required parameter for this action"
      );
    });

    test("should not create a task when the title is not of type string", async () => {
      const response = await specHelper.runAction("task:create", { title: 1 });
      expect(response.guid).toBeFalsy();
      expect(response.error).toBeTruthy();
      expect(response.error).toBe(
        "Error: Expected type of title to be string got number"
      );
    });

    test("should add a new task to tasks", async () => {
      const taskResponse1 = await specHelper.runAction("task:list");
      const oldTaskCount = taskResponse1.tasks.length;
      await specHelper.runAction("task:create", {
        title: "Visit Jurassic Park.",
      });
      const taskResponse2 = await specHelper.runAction("task:list");
      const totalTasksCount = taskResponse2.tasks.length;
      expect(totalTasksCount).toBe(oldTaskCount + 1);
    });

    test("should return a guid for new task created", async () => {
      const { guid } = await specHelper.runAction("task:create", {
        title: "Time Travel",
      });
      const isGUID = guid.match(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
      );
      expect(isGUID).toBeTruthy();
    });

    test("should have 'done' set to false by default for the new task", async () => {
      const { guid } = await specHelper.runAction("task:create", {
        title: "Visit North Pole",
      });
      const { tasks } = await specHelper.runAction("task:list");
    });

    test("should create new task with 'done' set to false even if 'done' is sent as true in the params", () => {});
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
