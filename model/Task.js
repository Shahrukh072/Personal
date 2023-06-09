const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },  
    descriptiontype: {
      type: String,
      required: true
    },  
    date: {
        type: String,
        required: true
      }, 
    isActive: {
        type: Boolean,
        default: true
      },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;