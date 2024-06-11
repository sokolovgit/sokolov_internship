import { prisma} from "../utils/prisma";

export async function createTransaction(accountId: string, amount: number) {
    const transaction = await prisma.transaction.create({
        data: {
            accountId,
            amount,
        },
    });

    const account = await prisma.account.update({
        where: { id: accountId },
        data: {
            balance: {
                increment: amount,
            },
        },
    });

    return { transaction, account };
}