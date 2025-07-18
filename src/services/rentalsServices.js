import { errorNotFound, errorRentalCompleted, errorStockUnavailable, errorunfinishedRent } from "../errors/errors.js";
import { 
    deleteRentalRepository, 
    existingCustomerRepository, 
    existingGameRepository, 
    existsIdRentalRepository, 
    gameInStockRepository,
    getRentalsRepository, 
    insertRentRepository, 
    stockAvailableRepository, 
    updateRentalRepository 
} from "../repositories/rentalsRepository.js";

export async function getRentalsService() {
    const result = await getRentalsRepository();
    return result;
}

export async function insertRentalService ( {customerId, gameId, daysRented}) {
    const nameGame =  await existingGameRepository(gameId);
    if(nameGame.rowCount === 0 ) throw errorNotFound("Jogo");

    const nameCustomer = await existingCustomerRepository(customerId);
    if(nameCustomer.rowCount === 0) throw errorNotFound("Cliente");
    
    const gameAvailable = await gameInStockRepository(gameId);
    const totalStock = gameAvailable.rows[0].stockTotal;

    const openRentalsResult = await stockAvailableRepository(gameId);
    const openRentalsCount = parseInt(openRentalsResult.rows[0].count)

    if(openRentalsCount >= totalStock) throw errorStockUnavailable();

    const rentDate = new Date();
    const originalPrice = daysRented * gameAvailable.rows[0].pricePerDay;

    return await insertRentRepository(customerId, gameId, rentDate, daysRented, originalPrice)
};

export async function finalizeRentalService(id) {
    const rentalResult = await existsIdRentalRepository(id);
    if(rentalResult.rowCount === 0 ) throw errorNotFound("Aluguel");

    const rental = rentalResult.rows[0];

    if(rental.returnDate !== null) throw errorRentalCompleted();

    const returnDate = new Date();
    const rentDate = new Date(rental.rentDate);

    const dueDate = new Date(rentDate);
    dueDate.setDate(dueDate.getDate() + rental.daysRented);

    const returnDateOnly = new Date(returnDate.toDateString());
    const dueDateOnly = new Date(dueDate.toDateString());

    const rawDiffTime = returnDateOnly.getTime() - dueDateOnly.getTime();
    const diffDays = Math.floor(rawDiffTime / (1000 * 60 * 60 * 24));
    const daysLate = diffDays > 0 ? diffDays : 0;

    let delayFee = null;
    if (daysLate > 0) {
    const pricePerDay = rental.originalPrice / rental.daysRented;
    delayFee = daysLate * pricePerDay;
    }

    return await updateRentalRepository(returnDate, delayFee, id)
};

export async function deleteRentalService (id) {
    const rentalResult = await existsIdRentalRepository(id)
    if(rentalResult.rowCount === 0) throw errorNotFound("Aluguel");
    
    const rental = rentalResult.rows[0];
    if(rental.returnDate === null ) throw errorunfinishedRent();

    return await deleteRentalRepository(id);
};