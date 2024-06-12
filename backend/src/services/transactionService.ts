// transactionService.ts
import {prisma} from "../utils/prisma";

export async function saveTransaction(accountId: string, amount: number) {
    accountId = accountId.trim();
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

export async function getPaginatedTransactions(page: number, pageSize: number) {
    const totalRecords = await prisma.transaction.count();
    const totalPages = Math.ceil(totalRecords / pageSize);

    const transactions = await prisma.transaction.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            createdAt: "desc",
        },
    });

    return {
        data: transactions,
        pagination: {
            total_records: totalRecords,
            current_page: page,
            total_pages: totalPages,
            next_page: page < totalPages ? page + 1 : null,
            prev_page: page > 1 ? page - 1 : null,
        }
    };
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
