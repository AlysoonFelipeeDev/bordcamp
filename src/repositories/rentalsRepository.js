import { db } from "../database/db.connection.js";

export async function getRentalsRepository () {
    const result = await db.query(`
        SELECT 
            rentals.id,
            rentals."customerId",
            rentals."gameId",
            TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
            rentals."daysRented",
            TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate",
            rentals."originalPrice",
            rentals."delayFee",
            customers.name AS "customerName",
            games.name AS "gameName"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            ORDER BY rentals.id;
        `);
    
    return result;
};

export async function existingGameRepository (gameId) {
    const result = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
    return result;
};

export async function existingCustomerRepository (customerId) {
    const result = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
    return result;
};

export async function gameInStockRepository (gameId) {
    const result = await db.query(`SELECT "stockTotal", "pricePerDay" FROM games WHERE id=$1;`, [gameId]);
    return result;
}

export async function stockAvailableRepository (gameId) {
    const result = await db.query(`SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId]);
    return result;
};

export async function insertRentRepository (customerId, gameId, rentDate, daysRented, originalPrice) {
    const result = await db.query(` 
        INSERT INTO rentals 
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
            `, [customerId, gameId, rentDate, daysRented, null, originalPrice, null]);
                
    const insertId = result.rows[0].id;

    return {
        id: insertId,
        customerId, 
        gameId, 
        daysRented,
        rentDate,
        originalPrice
    };
};

export async function existsIdRentalRepository (id) {
    const result = await db.query(`SELECT * FROM rentals WHERE id= $1;`, [id]);
    return result;
};

export async function updateRentalRepository (returnDate, delayFee, id) {
    await db.query(`
        UPDATE rentals
        SET "returnDate" = $1, "delayFee" =$2
        WHERE id = $3
        `, [returnDate, delayFee, id])

    return {
        id: id,
        returnDate,
        delayFee,
    }
};

export async function deleteRentalRepository (id) {
    await db.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
};