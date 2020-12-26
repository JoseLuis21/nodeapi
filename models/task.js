const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema(
    {
        name: {
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
        },
        date_emit: {
            type: Date,
            required: true,
            default: new Date()
        },        
        category_id: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        task_detail_id: {
            type: ObjectId,
            ref: "TaskDetail",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);