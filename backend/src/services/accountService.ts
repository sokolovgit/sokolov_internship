import {prisma} from "../utils/prisma";

export async function getAccount(accountId: string) {
    return prisma.account.findUnique({
        where: { id: accountId },
    });
}