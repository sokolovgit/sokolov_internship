<!-- App.vue -->
<template>
  <div id="app" class="flex justify-center items-end ">
    <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 flex-grow">
      <TransactionForm @transactionAdded="refreshTransactionHistory" class="flex-grow" />
      <TransactionHistory ref="transactionHistory" class="flex-grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TransactionForm from "./components/TransactionForm.vue";
import TransactionHistory from "./components/TransactionHistory.vue";

// Define the type for the ref
interface TransactionHistoryRef {
  fetchTransactions: () => void;
}

// Create a ref with the defined type
const transactionHistory = ref<TransactionHistoryRef | null>(null);

function refreshTransactionHistory() {
  // Ensure the method exists before calling
  if (transactionHistory.value) {
    transactionHistory.value.fetchTransactions();
  }
}
</script>

