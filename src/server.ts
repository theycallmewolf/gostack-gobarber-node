import "reflect-metadata";
import express from "express";
import routes from "./routes";
import "./database";
import UploadConfig from './config/upload';

const app = express();
app.use(express.json());
app.use('/files', express.static(UploadConfig.directory));

app.use(routes);

app.listen(3333, () => {
  console.log("");
  console.log("🐺🤟");
  console.log("server started on port 3333");
});
