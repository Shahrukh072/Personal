const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  } = require("../controller/taskController");
const { validateJwt } = require("../middleware/jwt");
const router = express.Router();

router.post("/createTask", validateJwt, createTask);
router.get("/getTasks",  getTasks);
router.get("/getTaskById/:id", validateJwt, getTaskById);
router.put("/updateTask/:id", validateJwt,  updateTask);
router.delete("/deleteTask/:id", validateJwt, deleteTask);

module.exports = router;
