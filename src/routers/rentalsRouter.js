import { Router } from "express";
import { deleteRental, finalizeRental, getRentals, insertRentals } from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { rentalsSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalsSchema), insertRentals);
rentalsRouter.post("/rentals/:id/return", finalizeRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;