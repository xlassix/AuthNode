import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import AppError from "./util/error";
import errorHandler from "./util/errorController";
import { messageRouter } from "./api/message/message.route";

export const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(morgan("dev"));

app.use("/api/message", messageRouter);

app.use((req, res, next) => {
  let err = new AppError(
    `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`,
    404
  );
  next(err);
});

app.use(errorHandler);
app.use("/", (req, res) => {
  res.status(404).end();
});

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/`);
    });
  } catch (e) {
    console.error("here is the error: ", e);
  }
};
