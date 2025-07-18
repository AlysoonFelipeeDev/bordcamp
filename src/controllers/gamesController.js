import { createGameService, getGamesService } from "../services/gamesServices.js";

export async function getGames(req, res) {
    const result = await getGamesService();
    res.status(200).send(result);
};

export async function createGame(req,res) {
    await createGameService(req.body);
    res.sendStatus(201)
};