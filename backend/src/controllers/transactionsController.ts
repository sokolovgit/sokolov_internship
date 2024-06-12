//traNsactionsController.ts
import { FastifyRequest, FastifyReply} from "fastify";
import { saveTransaction, getPaginatedTransactions} from "../services/transactionService";

interface TransactionRequest {
    accountId: string;
    amount: number;
}

interface PaginationRequest {
    page?: number;
    page_size?: number;
}

export async function submitTransactionHandler(request: FastifyRequest, reply: FastifyReply) {
    const { accountId, amount } = request.body as TransactionRequest;
    const transaction = await saveTransaction(accountId, amount);
    reply.send(transaction);
}

export async function getTransactionsHandler(request: FastifyRequest, reply: FastifyReply) {
    const { page = 1, page_size = 10 } = request.query as PaginationRequest;
    const paginatedTransactions = await getPaginatedTransactions(Number(page), Number(page_size));
    reply.send(paginatedTransactions);
}