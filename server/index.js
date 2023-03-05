import express from 'express';
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import configuration from "./config.js";
import mongoose from "mongoose";
import registerRoutes from "./routes/v1/routes";
import path from "path";

const app = express();
const { DEBUG, PORT, DB_URL } = configuration;
console.log({ DEBUG, PORT, DB_URL });

app.use(logger(DEBUG));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('views', path.join(__dirname, 'views'));
console.log({path: path.join(__dirname, 'views')});
app.get('/check-health', (req, res) => {
    res.send('Successful response.');
});

registerRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on(`error`, (err) => {
    console.error(`Failed to Connect DB: ${err}`);
    process.exit(-1);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});