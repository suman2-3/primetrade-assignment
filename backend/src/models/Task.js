const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, //removes extra spaces
    },

    description: {
      type: String,
      default: "", //safe default
    },

    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },


    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //required for populate
      required: true, //important (every task must belong to a user)
    },
  },
  {
    timestamps: true, //createdAt & updatedAt
  }
);

module.exports = mongoose.model("Task", taskSchema);