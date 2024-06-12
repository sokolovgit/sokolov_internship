<template>
  <div class="bg-white p-8 rounded-lg shadow-md h-full flex flex-col justify-between">
    <div class="overflow-auto">
      <h2 class="text-lg font-bold mb-4">Transaction History</h2>
      <ul>
        <li v-for="(transaction, index) in transactions" :key="transaction.transaction_id"
            class="my-2 p-2 border rounded">
          <p>
            Transferred
            <span :class="{'text-red-500': transaction.amount < 0, 'text-green-500': transaction.amount > 0}">
            {{ Math.abs(transaction.amount) }}$
          </span>
            {{ transaction.amount < 0 ? "from" : "to" }} account {{ transaction.account_id }}
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
    <PaginationComponent :currentPage="pagination.current_page" :totalPages="pagination.total_pages"
                         @updatePage="fetchTransactions"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import axios from 'axios';
import PaginationComponent from "./PaginationComponent.vue";

// Component state
const transactions = ref<any[]>([]);
const lastTransactionBalance = ref<number>(0);
const pagination = ref({
  current_page: 1,
  page_size: 10,
  total_pages: 1,
  total_items: 0
});

async function fetchTransactions(page = 1) {
  try {
    const response = await axios.get('http://localhost:3000/transactions', {
      params: {
        page,
        page_size: pagination.value.page_size
      }
    });
    transactions.value = response.data.data;
    pagination.value = response.data.pagination;

    if (transactions.value.length > 0) {
      const lastTransactionAccount = transactions.value[0].account_id;
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
/* Add any additional styling here */
</style>
