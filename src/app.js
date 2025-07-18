import express, {json} from "express";
import cors from "cors";
import gameRouter from "./routers/gamesRouter.js";
import customerRouter from "./routers/customersRouter.js";
import rentalsRouter from "./routers/rentalsRouter.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(gameRouter);
app.use(customerRouter);
app.use(rentalsRouter);
app.use(errorHandler)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Rodando liso na porta: ${port}`);
})