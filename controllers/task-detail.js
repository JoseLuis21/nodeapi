const TaskDetail = require("../models/task-detail");
const { errorHandler } = require("../helpers/dbErrorHandler");
// middlewares rest

exports.taskDetailById = (req, res, next, id) => {
    TaskDetail.findById(id).exec((err, taskDetail) => {
        if (err || !taskDetail) {
            return res.status(404).json({
                error: "taskDetail does not exist"
            });
        }
        req.taskDetail = taskDetail;
        next();
    });
};

exports.create = (req, res) => {
    const taskDetail = new TaskDetail(req.body);
    taskDetail.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.taskDetail);
};

exports.update = (req, res) => {
    const taskDetail = req.taskDetail;
    taskDetail.name = (req.body.name==undefined)?taskDetail.name:req.body.name;
    taskDetail.detail = (req.body.detail==undefined)?taskDetail.name:req.body.detail;
    taskDetail.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const taskDetail = req.taskDetail;
    taskDetail.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "taskDetail deleted"
        });
    });
};

exports.list = (req, res) => {
    TaskDetail.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};