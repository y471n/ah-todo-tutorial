import { Process, specHelper } from "actionhero";
const actionhero = new Process();
let api;

describe("Action", () => {
  describe("Task List", () => {
    beforeAll(async () => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("should return a list", async () => {
      const { tasks } = await specHelper.runAction("task:list");
      console.log(tasks);
      expect(tasks).toBeDefined();
    });
  });
});
