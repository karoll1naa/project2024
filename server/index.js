const AppError = require("../utils/appError.js");
const conn = require("../services/db.js");

exports.getAllFiles = (req, res, next) => {
    conn.query("SELECT * FROM file", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createFile = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.idFILE,
        req.body.file_name,
        req.body.file_description,
        req.body.file_upload,
        req.body.file_format,


    ];
    conn.query(
        "INSERT INTO file (idFILE, file_name, file_description, file_upload, file_format) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "file added!",
            });
        }
    );
};

exports.getFileById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No file id found", 404));
    }
    conn.query(
        "SELECT * FROM file WHERE idFILE = ?",
        [req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateFile = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No file id found", 404));
    }
    conn.query(
        "UPDATE file SET file_name=?, file_description=?, file_upload=?, file_format=? WHERE idFILE=?",
        [
            req.body.file_name,
            req.body.file_description,
            req.body.file_upload,
            req.body.file_format,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "file info updated!",
            });
        }
    );
};

exports.deleteFile = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    conn.query(
        "DELETE FROM file WHERE idFILE=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "file deleted!",
            });
        }
    );
};