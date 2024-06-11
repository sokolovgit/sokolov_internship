<template>
  <div>
    <h2 class="text-lg font-bold">Transaction History</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id" class="my-2 p-2 border rounded">
        <p>
          Transferred
          <span :class="{'text-red-500': transaction.amount < 0, 'text-green-500': transaction.amount > 0}">
            {{ transaction.amount }}
          </span>
          {{ transaction.type === 'deposit' ? 'to' : 'from' }} account {{ transaction.accountId }}
        </p>
        <p v-if="index === transactions.length - 1">
          The current account balance is {{ getAccountBalance(transaction.accountId) }}$
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
      transactions: [],
    };
  },
  methods: {
    async getAccountBalance(accountId: string) {
      const response = await axios.get(`http://localhost:3000/accounts/${accountId}`);
      return response.data.balance;
    },
    async fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:3000/transactions');
        this.transactions = response.data;
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