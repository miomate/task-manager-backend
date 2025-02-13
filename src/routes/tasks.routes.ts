import { NextFunction, Request, Response } from "express";
const prisma = require("../db");
const router = require("express").Router();

// POST /api/categories/:id/tasks
// Create a new task under a specific category
router.post(
  "/:id/tasks",
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = parseInt(req.params.id);
    const { description } = req.body;
    try {
      const task = await prisma.task.create({
        data: {
          description,
          category: { connect: { id: categoryId } },
        },
      });
      res.json(task);
    } catch (error: any) {
      next(error);
    }
  }
);

// PUT /api/categories/tasks/:taskId
// Update a task's description
router.put(
  "/tasks/:taskId",
  async (req: Request, res: Response, next: NextFunction) => {
    const taskId = parseInt(req.params.taskId);
    const { description } = req.body;
    try {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { description },
      });
      res.json(updatedTask);
    } catch (error: any) {
      next(error);
    }
  }
);

// DELETE /api/categories/tasks/:taskId
// Delete a task
router.delete(
  "/tasks/:taskId",
  async (req: Request, res: Response, next: NextFunction) => {
    const taskId = parseInt(req.params.taskId);
    try {
      const deletedTask = await prisma.task.delete({
        where: { id: taskId },
      });
      res.json(deletedTask);
    } catch (error: any) {
      next(error);
    }
  }
);

module.exports = router;

// import { NextFunction, Request, Response } from "express";

// const prisma = require("../db");

// const router = require("express").Router();

// // POST /api/categories/:id/tasks
// // Create a new task under a specific category
// router.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
//   const categoryId = parseInt(req.params.id);
//   const { description } = req.body;
//   try {
//     const task = await prisma.task.create({
//       data: {
//         description,
//         category: { connect: { id: categoryId } },
//       },
//     });
//     res.json(task);
//   } catch (error: any) {
//     next(error);
//   }
// });

// // PUT /api/categories/tasks/:taskId
// // Update a task's description
// router.put(
//   "/:taskId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const taskId = parseInt(req.params.taskId);
//     const { description } = req.body;
//     try {
//       const updatedTask = await prisma.task.update({
//         where: { id: taskId },
//         data: { description },
//       });
//       res.json(updatedTask);
//     } catch (error: any) {
//       next(error);
//       // console.error("Error updating task:", error);
//       // res
//       //   .status(500)
//       //   .json({ error: "Failed to update task", details: error.message });
//     }
//   }
// );

// // DELETE /api/categories/tasks/:taskId
// // Delete a task
// router.delete(
//   "/tasks/:taskId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const taskId = parseInt(req.params.taskId);
//     try {
//       const deletedTask = await prisma.task.delete({
//         where: { id: taskId },
//       });
//       res.json(deletedTask);
//     } catch (error: any) {
//       next(error);
//       // console.error("Error deleting task:", error);
//       // res
//       //   .status(500)
//       //   .json({ error: "Failed to delete task", details: error.message });
//     }
//   }
// );

// module.exports = router;
