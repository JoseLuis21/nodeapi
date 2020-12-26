const mongoose = require("mongoose");

const taskDetailSchema = new mongoose.Schema(
    {
        detail: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        summary: {
            type: String,
            required: true,
            maxlength: 200
        }       
    },
    { timestamps: true }
);

module.exports = mongoose.model("TaskDetail", taskDetailSchema);