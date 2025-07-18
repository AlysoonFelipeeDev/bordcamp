import { errorConflict } from "../errors/errors.js";
import { getGamesRepository, insertGameRepository, nameGameRepository } from "../repositories/gamesRepository.js";

export async function getGamesService() {
    const games = await getGamesRepository();
    return games.rows;
};

export async function createGameService({name, image, stockTotal, pricePerDay}) {
    const SameName = await nameGameRepository(name);
    if(SameName.rowCount !== 0 ) throw errorConflict("jogo");

    return await insertGameRepository(name, image, stockTotal, pricePerDay);
};