import { db } from "../database/db.connection.js";

export async function getCustomersRepository() {
    const result =  await db.query("SELECT * FROM customers");
    return result;
};

export async function cpfCustomerRepository (cpf) {
    const result = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
    return result;
};

export async function insertCustomerRepository (name, phone, cpf) {
    const resultCustomer = await db.query(`
        INSERT INTO customers (name, phone, cpf)
            VALUES ($1, $2, $3) RETURNING id;
            `, [name, phone, cpf]);

    return {
        id: resultCustomer.id,
        name,
        phone,
        cpf
    };
};

export async function existsIdCustomerRepository (id) {
    const result = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
    return result;
}