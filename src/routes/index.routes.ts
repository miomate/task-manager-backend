const router = require("express").Router();

const categoriesRoutes = require("./category.routes");
router.use("/categories", categoriesRoutes);

const tasksRoutes = require("./tasks.routes");
router.use("/categories", tasksRoutes);

module.exports = router;

// const router = require("express").Router();

// const categoriesRoutes = require("./category.routes");
// router.use("/categories", categoriesRoutes);

// const tasksRoutes = require("./tasks.routes");
// router.use("/tasks", tasksRoutes);

// module.exports = router;
