import { FastifyInstance} from "fastify";
import { getAccountHandler } from "../controllers/accountController";

export async function accountsRoutes(fastify: FastifyInstance) {
    fastify.get("/accounts/:account_id ", getAccountHandler);
}