import { FastifyRequest, FastifyReply} from "fastify";
import { getAccount } from "../services/accountService";

interface AccountRequest {
    accountId: string;
}

export async function getAccountHandler(request: FastifyRequest, reply: FastifyReply) {
    const { accountId } = request.params as AccountRequest;
    const account = await getAccount(accountId);
    reply.send(account);
}