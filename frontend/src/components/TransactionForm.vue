<!-- TransactionForm.vue -->
<template>
  <div class="bg-white p-8 rounded-lg shadow-md h-full">
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

const accountId = ref('');
const amount = ref('');
const accountIdError = ref('');
const amountError = ref('');

const emit = defineEmits(['transactionAdded']);

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
    emit('transactionAdded');
    accountId.value = '';
    amount.value = '';
    console.log('Transaction submitted!');
  } catch (error) {
    console.error('Error submitting transaction:', error);
  }
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>