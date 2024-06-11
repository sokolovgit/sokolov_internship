import { FastifyInstance } from "fastify";
import { submitTransactionHandler } from "../controllers/transactionsController";

export async function transactionsRoutes(fastify: FastifyInstance) {
    fastify.post("/transactions", submitTransactionHandler);
}