//express function is called to ceate express app
import express from "express";
//path = node.js buit in module, helps u work with file and folder paths
import path from "path";
import { ENV } from "./config/env.js";

const app = express();

const __dirname = path.resolve();

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "success ok" });
// });

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "success", dirname: __dirname });
});

//configure deployment / make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  //Unlike the array .join(), path.join() accepts multiple arguments.
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    //For requests that reach this route, send the frontend's index.html file so the React app can load and handle the route.
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

app.listen(3000, () => console.log("Server is up and running"));
