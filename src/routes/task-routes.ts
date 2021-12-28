import { router } from "typera-express";
import { TaskController } from "../controllers/task-controller";

export const taskRoutes = router(
    TaskController.createSubTask,
    TaskController.createTask,
    TaskController.getTask,
).handler();
