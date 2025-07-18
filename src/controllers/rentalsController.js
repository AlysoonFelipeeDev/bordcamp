import { deleteRentalService, finalizeRentalService, getRentalsService, insertRentalService } from "../services/rentalsServices.js";

export async function getRentals (req, res) {
    const result = await getRentalsService();

    const rentals = result.rows.map( rental => ({
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: rental.rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
            id: rental.customerId,
            name: rental.customerName
        },
        game: {
            id: rental.gameId,
            name: rental.gameName
        }
    }));

    res.status(200).send(rentals)
};

export async function insertRentals(req, res) {
    const result = await insertRentalService(req.body);
    res.status(201).send(result);
};

export async function finalizeRental (req, res) {
    const { id } = req.params

    await finalizeRentalService(id);
    res.sendStatus(200);
};

export async function deleteRental (req, res) {
    const { id } = req.params

    await deleteRentalService(id);
    res.sendStatus(200);
};