// import "module-alias/register"
import express, { json } from "express";

import helmet from "helmet";
import cors from "cors"
import { appRoutes } from "./routes";
import { errorHandler } from "./middlewares/error-handler";
// import { appRoutes } from "@routes";



const app = express();
app.use(json());

app.use(helmet());
app.use(cors());
app.use(appRoutes);
app.use(errorHandler);
export default app;