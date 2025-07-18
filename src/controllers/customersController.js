import { createCustomerService, getCustomersService, searchCustomerByIdService } from "../services/customersServices.js";

export async function getCustomers (req, res) {
    const result = await getCustomersService()
    res.status(200).send(result)
};

export async function createCustomer (req, res) { 
    await createCustomerService(req.body);
    res.sendStatus(201);
};

export async function searchCustomerById (req, res) {
    const { id } = req.params
    
    const result = await searchCustomerByIdService(id);
    return res.status(200).send(result)
};