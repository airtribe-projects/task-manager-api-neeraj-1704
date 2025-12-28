import crypto from "crypto";
import { tasks } from "../models/TaskModel.js";

/**
 * POST /tasks
 * Create a new task
 */
// export const createTask = (req, res) => {
//   try {
//     const { title, description, completed = false, priority = "low" } = req.body;

//     const task = {
//       id: crypto.randomUUID(),
//       title,
//       description,
//       completed,
//       priority, 
//       createdAt: new Date(),
//     };

//     tasks.push(task);

//     return res.status(201).json({
//       message: "User task created successfully",
//       task,
//     });
//   } catch (error) {
//     console.error("Create Task Error:", error);

//     return res.status(500).json({
//       message: "Internal server error while creating task",
//     });
//   }
// };

// /**
//  * GET /tasks
//  * Retrieve all tasks
//  */
// export const getAllTasks = (req, res) => {
//     try {
//       return res.status(200).json({
//         message: "Tasks retrieved successfully",
//         tasks,
//       });
//     } catch (error) {
//       console.error("Get All Tasks Error:", error);
  
//       return res.status(500).json({
//         message: "Internal server error while fetching tasks",
//       });
//     }
//   };
  

// /**
//  * GET /tasks/:id
//  * Get task by ID
//  */
// export const getTaskById = (req, res) => {
//   try {
//     const { id } = req.params;

//     const task = tasks.find((t) => t.id === id);

//     if (!task) {
//       return res.status(404).json({
//         message: "Task not found",
//       });
//     }

//     return res.status(200).json({
//       task,
//     });
//   } catch (error) {
//     console.error("Get Task Error:", error);

//     return res.status(500).json({
//       message: "Internal server error while fetching task",
//     });
//   }
// };

// /**
//  * PUT /tasks/:id
//  * Update task by ID
//  */
// export const updateTaskById = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, completed } = req.body;

//     const taskIndex = tasks.findIndex((t) => t.id === id);

//     if (taskIndex === -1) {
//       return res.status(404).json({
//         message: "Task not found",
//       });
//     }

//     tasks[taskIndex] = {
//       ...tasks[taskIndex],
//       title: title ?? tasks[taskIndex].title,
//       description: description ?? tasks[taskIndex].description,
//       completed: completed ?? tasks[taskIndex].completed,
//       updatedAt: new Date(),
//     };

//     return res.status(200).json({
//       message: "Task updated successfully",
//       task: tasks[taskIndex],
//     });
//   } catch (error) {
//     console.error("Update Task Error:", error);

//     return res.status(500).json({
//       message: "Internal server error while updating task",
//     });
//   }
// };

// /**
//  * DELETE /tasks/:id
//  * Delete task by ID
//  */
export const deleteTaskById = (req, res) => {
  try {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    return res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask[0],
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

    return res.status(500).json({
      message: "Internal server error while deleting task",
    });
  }
};



// controllers/tasks.controller.js
//import { tasks } from "../data/tasks.store.js";

export const getTasks = (req, res) => {
  try {
    const { completed, sort } = req.query;
    let filteredTasks = [...tasks];

    // Filter by completion status
    if (completed !== undefined) {
      const isCompleted = completed === "true";
      filteredTasks = filteredTasks.filter(
        (task) => task.completed === isCompleted
      );
    }

    // Sort by creation date
    if (sort === "asc") {
      filteredTasks.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    if (sort === "desc") {
      filteredTasks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    res.status(200).json({ tasks: filteredTasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getTasksByPriority = (req, res) => {
    try {
      const { level } = req.params;
  
      const allowedPriorities = ["low", "medium", "high"];
      if (!allowedPriorities.includes(level)) {
        return res.status(400).json({ message: "Invalid priority level" });
      }
  
      const filteredTasks = tasks.filter(
        (task) => task.priority === level
      );
  
      res.status(200).json({ tasks: filteredTasks });
    } catch (error) {
      console.error("Error fetching tasks by priority:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  

  export const createTask = (req, res) => {
    try {
      const { title, priority = "low" } = req.body;
  
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
  
      const allowedPriorities = ["low", "medium", "high"];
      if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority" });
      }
  
      const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
        priority,
        createdAt: new Date(),
      };
  
      tasks.push(newTask);
  
      res.status(201).json({ task: newTask });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  export const updateTask = (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed, priority } = req.body;
  
      const task = tasks.find((t) => t.id === Number(id));
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      if (title !== undefined) task.title = title;
      if (completed !== undefined) task.completed = completed;
  
      if (priority !== undefined) {
        const allowedPriorities = ["low", "medium", "high"];
        if (!allowedPriorities.includes(priority)) {
          return res.status(400).json({ message: "Invalid priority" });
        }
        task.priority = priority;
      }
  
      res.status(200).json({ task });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  