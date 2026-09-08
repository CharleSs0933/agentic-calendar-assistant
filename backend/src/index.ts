import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT) || 4000;
const appOrigin = process.env.APP_URL ?? "http://localhost:3000";

app.use(
  cors({
    origin: appOrigin,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    res.json({
      status: "ok",
      service: "agentic-calendar-app",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Agentic Calendar App is running on port ${port}`);
});
