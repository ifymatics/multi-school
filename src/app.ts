import "module-alias/register"
import express, { json } from "express";
import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors"
import { appRoutes } from "./routes";
// import { appRoutes } from "@routes";


config()
const app = express();
app.use(json());

app.use(helmet());
app.use(cors());
app.use(appRoutes);

export default app;