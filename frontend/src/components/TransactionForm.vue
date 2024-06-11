<!-- TransactionForm.vue -->
<template>
  <div class="max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-lg font-bold mb-4">Submit Transaction</h2>
    <form @submit.prevent="submitTransaction">
      <div class="mb-4">
        <label for="accountId" class="block text-sm font-medium text-gray-700">Account ID:</label>
        <input v-model="accountId" type="text" id="accountId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <p class="text-red-500" v-if="accountIdError">{{ accountIdError }}</p>
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount:</label>
        <input v-model="amount" type="number" id="amount" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <p class="text-red-500" v-if="amountError">{{ amountError }}</p>
      </div>
      <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

// Define reactive state using ref
const accountId = ref('');
const amount = ref(0);
const accountIdError = ref('');
const amountError = ref('');

// Define emit event function
const emit = defineEmits(['transactionAdded']);

// Define the submitTransaction method
async function submitTransaction() {
  accountIdError.value = '';
  amountError.value = '';

  if (!accountId.value) {
    accountIdError.value = 'Account ID is required';
  }

  if (!amount.value) {
    amountError.value = 'Amount is required';
  }

  if (accountIdError.value || amountError.value) {
    return;
  }

  try {
    await axios.post('http://localhost:3000/transactions', {
      accountId: accountId.value,
      amount: amount.value,
    });
    emit('transactionAdded'); // Emit the event
    accountId.value = '';
    amount.value = 0;
    console.log('Transaction submitted!');
  } catch (error) {
    console.error('Error submitting transaction:', error);
  }
}
</script>