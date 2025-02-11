// src/routes/category.routes.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

/* ---------- Category Endpoints ---------- */

// GET /api/categories
// List all categories with their taskshttps://prod.liveshare.vsengsaas.visualstudio.com/join?557933DC3359AAC3D84F9F376DE216D23380
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { tasks: true },
    });
    res.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
});

// POST /api/categories
// Create a new category
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.json(category);
  } catch (error: any) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
});

// DELETE /api/categories/:id
// Delete a category (and optionally its tasks)
router.delete('/:id', async (req, res) => {
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
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
});

/* ---------- Task Endpoints ---------- */

// POST /api/categories/:id/tasks
// Create a new task under a specific category
router.post('/:id/tasks', async (req, res) => {
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
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task', details: error.message });
  }
});

// PUT /api/categories/tasks/:taskId
// Update a task's description
router.put('/tasks/:taskId', async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { description } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { description },
    });
    res.json(updatedTask);
  } catch (error: any) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
});

// DELETE /api/categories/tasks/:taskId
// Delete a task
router.delete('/tasks/:taskId', async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });
    res.json(deletedTask);
  } catch (error: any) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

export default router;
