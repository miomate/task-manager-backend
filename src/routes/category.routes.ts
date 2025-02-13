// src/routes/category.routes.ts
import { NextFunction, Request, Response } from "express";
const router = require("express").Router();
const prisma = require("../db");

/* ---------- Category Endpoints ---------- */

// GET /api/categories
// List all categories with their taskshttps://prod.liveshare.vsengsaas.visualstudio.com/join?557933DC3359AAC3D84F9F376DE216D23380
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      include: { tasks: true },
    });
    res.json(categories);
  } catch (error: any) {
    next(error)
  }
});

// POST /api/categories
// Create a new category
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.json(category);
  } catch (error: any) {
    next(error)
    // console.error("Error creating category:", error);
    // res
    //   .status(500)
    //   .json({ error: "Failed to create category", details: error.message });
  }
});

// DELETE /api/categories/:id
// Delete a category (and optionally its tasks)
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const categoryId = parseInt(id);
  try {
    // Optionally, delete associated tasks first:
    await prisma.task.deleteMany({
      where: { categoryId },
    });
    const category = await prisma.category.delete({
      where: { id: categoryId },
    });
    res.json(category);
  } catch (error: any) {
    next(error)
    // console.error("Error deleting category:", error);
    // res
    //   .status(500)
    //   .json({ error: "Failed to delete category", details: error.message });
  }
});

module.exports = router;
