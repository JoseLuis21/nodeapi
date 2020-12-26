const formidable = require("formidable");
const _ = require("lodash");
const Task = require("../models/task");
const { errorHandler } = require("../helpers/dbErrorHandler");


// middlewares rest 

exports.taskById = (req, res, next, id) => {
    Task.findById(id)
        .populate("category_id")
        .populate("task_detail_id")
        .exec((err, task) => {
            if (err || !task) {
                return res.status(400).json({
                    error: "task not found"
                });
            }
            req.task = task;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.task);
};


exports.create = (req, res) => {
    const task = new Task(req.body);
    task.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.remove = (req, res) => {
    let task = req.task;
    task.remove((err, deletedTask) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "task deleted successfully"
        });
    });
};

exports.update = (req, res) => {
    const task = req.task;
    task.name = (req.body.name==undefined)?task.name:req.body.name;
    task.summary = (req.body.summary==undefined)?task.summary:req.body.summary;
    task.date_emit = (req.body.date_emit==undefined)?task.date_emit:req.body.date_emit;
    task.category_id = (req.body.category_id==undefined)?task.category_id:req.body.category_id;
    task.task_detail_id = (req.body.task_detail_id==undefined)?task.name:req.body.task_detail_id;
    task.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};



/**
 * name / date emit 
 * by name = /tasks?sortBy=name&order=desc&limit=4
 * by date emit = /tasks?sortBy=date_emit&order=desc&limit=4
 * if no params are sent, then all tasks are returned
 */
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Task.find()
        // .select("-photo")
        .populate("category")
        .populate("director")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, tasks) => {
            if (err) {
                return res.status(400).json({
                    error: "Task not found"
                });
            }
            res.json(tasks);
        });
};



exports.listCategories = (req, res) => {
    Task.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    });
};



exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };
        // assign category value to query.category
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category;
        }
        // find the task based on query object with 2 properties
        // search and category
        Task.find(query, (err, tasks) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(tasks);
        }).select("-photo");
    }
};