import { errorConflict, errorNotFound } from "../errors/errors.js";
import { cpfCustomerRepository, existsIdCustomerRepository, getCustomersRepository, insertCustomerRepository } from "../repositories/customersRepository.js";

export async function getCustomersService () {
    const customers = await getCustomersRepository();
    return customers.rows
};

export async function createCustomerService ({ name, phone, cpf }) {
    const SameCpf = await cpfCustomerRepository(cpf)
    if(SameCpf.rowCount !== 0 ) throw errorConflict("cliente");
    
    return insertCustomerRepository(name, phone, cpf);
};

export async function searchCustomerByIdService (id) {
    const customersId = await existsIdCustomerRepository(id)
    if(customersId.rowCount === 0 ) throw errorNotFound("Cliente")
    
    return customersId.rows;
};
    