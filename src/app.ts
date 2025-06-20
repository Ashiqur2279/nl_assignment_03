import cors from "cors";
import express, { Application, Request, Response } from "express";
import routes from "./app/routes/index";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

// application route
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Server is running!");
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Not Found!",
  });
});

export default app;
