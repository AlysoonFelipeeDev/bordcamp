import { db } from "../database/db.connection.js";

export async function getGamesRepository (){
    const result = await db.query("SELECT * FROM games");
    return result;
};

export async function nameGameRepository (name) {
    const result = await db.query(`SELECT * FROM games WHERE name= $1;`, [name]);
    return result;
};

export async function insertGameRepository (name, image, stockTotal, pricePerDay){
    const resultGame = await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4) RETURNING id;
            `, [name, image, stockTotal, pricePerDay]);
    
    return {
        id: resultGame.id,
        name, 
        image,
        stockTotal,
        pricePerDay
    };
}