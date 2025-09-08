import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { generateItinerary } from "./agent";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/itinerary", async (req: Request, res: Response) => {
  try {
    const { prompt, prevItinerary } = req.body;
    const itinerary = await generateItinerary(prompt, prevItinerary);
    res.json({ itinerary });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
