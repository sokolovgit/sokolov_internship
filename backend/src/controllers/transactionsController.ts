import { FastifyRequest, FastifyReply} from "fastify";
import { saveTransaction, getTransactions} from "../services/transactionService";

interface TransactionRequest {
    accountId: string;
    amount: number;
}

export async function submitTransactionHandler(request: FastifyRequest, reply: FastifyReply) {
    const { accountId, amount } = request.body as TransactionRequest;
    const transaction = await saveTransaction(accountId, amount);
    reply.send(transaction);
}

export async function getTransactionsHandler(request: FastifyRequest, reply: FastifyReply) {
    const transactions = await getTransactions();
    reply.send(transactions);
}