<template>
  <div id="app" class="min-h-screen flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 p-2">
      <TransactionForm @transactionAdded="refreshTransactionHistory" />
    </div>
    <div class="w-full md:w-2/3 p-2">
      <TransactionHistory ref="transactionHistory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TransactionForm from "./components/TransactionForm.vue";
import TransactionHistory from "./components/TransactionHistory.vue";

interface TransactionHistoryRef {
  fetchTransactions: () => void;
}

const transactionHistory = ref<TransactionHistoryRef | null>(null);

function refreshTransactionHistory() {
  if (transactionHistory.value) {
    transactionHistory.value.fetchTransactions();
  }
}
</script>

