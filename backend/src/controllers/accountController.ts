import { FastifyRequest, FastifyReply} from "fastify";
import { getAccount } from "../services/accountService";
import { getAccountBalance} from "../services/transactionService";

interface AccountRequest {
    accountId: string;
}

export async function getAccountHandler(request: FastifyRequest, reply: FastifyReply) {
    const { accountId } = request.params as AccountRequest;
    console.log('getAccountHandler accountId:', accountId); // Add this line
    const account = await getAccount(accountId);
    const balance = await getAccountBalance(accountId);
    reply.send({ ...account, balance });
}