import {prisma} from "../utils/prisma";

export async function saveTransaction(accountId: string, amount: number) {
    // Check if the account exists, if not, create it
    let account = await prisma.account.findUnique({
        where: { id: accountId },
    });

    if (!account) {
        await createAccount(accountId);
    }

    return await createTransaction(accountId, amount);
}

export function getTransactions() {
    return prisma.transaction.findMany(
        {orderBy: {
            createdAt: "desc",
            }
        }
    );
}

async function createAccount(accountId: string) {
    return prisma.account.create({
        data: {id: accountId},
    });
}

async function createTransaction(accountId: string, amount: number) {
    return prisma.transaction.create({
        data: {
            accountId: accountId,
            amount: amount,
        },
    });
}

export async function getAccountBalance(accountId: string) {
    const transactions = await prisma.transaction.findMany({
        where: { accountId: accountId },
    });

    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
}
