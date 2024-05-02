import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import mongoconnect from "./db.js";
import user from "./Routes/contactDownload.js"
import { createServer } from "http";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app); 
app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]);
app.use(express.json());

mongoconnect();
app.use("/api", user);
app.get("/", (req, res) => {
  res.send("hello");
});
server.listen(port, () => console.log(`Server started on port ${port}`));