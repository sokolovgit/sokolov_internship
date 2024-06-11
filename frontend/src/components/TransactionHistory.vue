<!-- TransactionHistory.vue -->
<template>
   <div class="bg-white p-8 rounded-lg shadow-md h-full overflow-y-auto">
    <h2 class="text-lg font-bold mb-4  top-0 bg-white z-10">Transaction History</h2>
    <ul>
      <li v-for="(transaction, index) in transactions" :key="transaction.id" class="my-2 p-2 border rounded">
        <p>
          Transferred
          <span :class="{'text-red-500': transaction.amount < 0, 'text-green-500': transaction.amount > 0}">
            {{ Math.abs(transaction.amount) }}$
          </span>
          {{ transaction.amount < 0 ? "from" : "to" }} account {{ transaction.accountId }}
        </p>
        <p v-if="index === 0">
          The current account balance is
          <span :class="{'text-red-500': lastTransactionBalance < 0, 'text-green-500': lastTransactionBalance > 0}">
            {{ lastTransactionBalance }}$
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import axios from 'axios';

// Component state
const transactions = ref<any[]>([]);
const lastTransactionBalance = ref<number>(0);

async function fetchTransactions() {
  try {
    const response = await axios.get('http://localhost:3000/transactions');
    transactions.value = response.data;

    if (transactions.value.length > 0) {
      const lastTransactionAccount = transactions.value[0].accountId;
      const balanceResponse = await axios.get(`http://localhost:3000/accounts/${lastTransactionAccount}`);
      lastTransactionBalance.value = balanceResponse.data.balance;
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

onMounted(() => {
  fetchTransactions();
});

defineExpose({
  fetchTransactions
});
</script>

<style scoped>
.overflow-y-auto {
  height: calc(100vh - 1rem);
  overflow-y: auto;
}

</style>