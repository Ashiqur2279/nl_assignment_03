import cors from "cors";
import express, { Application, Request, Response } from "express";
import routes from "./app/routes/index";

const app: Application = express();

app.use(cors());
app.use(express.json());

// application route
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Server is running!");
});

export default app;
