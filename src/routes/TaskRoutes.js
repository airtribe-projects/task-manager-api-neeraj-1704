import express from "express";
// import {
//     createTask,
//     getAllTasks,
//     getTaskById,
//     updateTaskById,
//     deleteTaskById,
// } from "../controller/TaskController.js";
import { validate } from "../middleware/validate.js";
import { createTaskSchema } from "../validations/taskValidation.js";

import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,


    deleteTaskById,
    getTasks,
    getTasksByPriority,
    createTask,
    
} from "../controller/TaskController.js";

/**
 * @swagger
 * /api/v1/tasks:
 *   post
**/
// const routes = express.Router();

// routes.route("/tasks")
//     .post(validate(createTaskSchema), createTask)
//     .get(getAllTasks);

// routes.get("/tasks/:id", getTaskById)
//     .put("/tasks/:id", updateTaskById)
//     .delete("/tasks/:id", deleteTaskById);


// export default routes;


const routes = express.Router();

routes.route("/tasks")
    .post(validate(createTaskSchema), createTask)
    .get(getTasks);

routes.get("/tasks/:id", getTaskById)
    .put("/tasks/:id", updateTaskById)
    .delete("/tasks/:id", deleteTaskById);


export default routes;