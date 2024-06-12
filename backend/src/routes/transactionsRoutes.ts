//transactionsRoutes.ts

import { FastifyInstance } from "fastify";
import {getTransactionsHandler, submitTransactionHandler} from "../controllers/transactionsController";

export async function transactionsRoutes(fastify: FastifyInstance) {
    fastify.post("/transactions", submitTransactionHandler);
    fastify.get("/transactions", getTransactionsHandler);
}