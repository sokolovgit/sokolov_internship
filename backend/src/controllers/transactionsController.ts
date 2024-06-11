import { FastifyRequest, FastifyReply} from "fastify";
import { createTransaction} from "../services/transactionService";

interface TransactionRequest {
    accountId: string;
    amount: number;
}

export async function submitTransactionHandler(request: FastifyRequest, reply: FastifyReply) {
    const { accountId, amount } = request.body as TransactionRequest;
    const { transaction, account } = await createTransaction(accountId, amount);
    reply.send(transaction);
}