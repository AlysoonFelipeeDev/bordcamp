import { Router } from "express";
import { createGame, getGames } from "../controllers/gamesController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { gameSchema } from "../schemas/gamesSchema.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", validateSchema(gameSchema), createGame);

export default gameRouter;