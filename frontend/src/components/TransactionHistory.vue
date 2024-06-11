<template>
  <div>
    <h2 class="text-lg font-bold">Transaction History</h2>
    <ul>
      <li v-for="(transaction, index) in transactions" :key="transaction.id" class="my-2 p-2 border rounded">
        <p>
          Transferred
          <span :class="{'text-red-500': transaction.amount < 0, 'text-green-500': transaction.amount > 0}">
            {{ Math.abs(transaction.amount) }}$
          </span>
          {{ transaction.amount < 0 ? "from" : "to" }} account {{ transaction.accountId }}
        </p>
        <p v-if="index === transactions.length - 1">
          The current account balance is {{ lastTransactionBalance }}$
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";

export default defineComponent({
  name: "TransactionHistory",
  data() {
    return {
      transactions: [] as any[],
      lastTransactionBalance: 0,
    };
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:3000/transactions');
        this.transactions = response.data;

        if (this.transactions.length > 0) {
          const lastTransactionAccount = this.transactions[this.transactions.length - 1].accountId;
          const balanceResponse = await axios.get(`http://localhost:3000/accounts/${lastTransactionAccount}`);
          this.lastTransactionBalance = balanceResponse.data.balance;
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  },
  mounted() {
    this.fetchTransactions();
  }
});
</script>