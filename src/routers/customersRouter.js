import { Router } from "express";
import { createCustomer, getCustomers, searchCustomerById } from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { customerSchema } from "../schemas/cuustomersSchema.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.post("/customers", validateSchema(customerSchema), createCustomer);
customerRouter.get("/customers/:id", searchCustomerById);

export default customerRouter;