const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const AppError = require("./utils/appError.js");
const errorHandler = require("./utils/errorHandler.js");
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;