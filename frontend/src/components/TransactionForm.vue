<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <form @submit.prevent="submitTransaction">
      <div class="mb-4">
        <label for="accountId" class="block text-sm font-medium text-gray-700">Account ID:</label>
        <input v-model="accountId" type="text" id="accountId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount:</label>
        <input v-model="amount" type="number" id="amount" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      accountId: "",
      amount: 0,
    };
  },
  methods: {
    async submitTransaction() {
      try {
        await axios.post('http://localhost:3000/transactions', {
        accountId: this.accountId,
        amount: this.amount,
      });
      this.$emit('transactionAdded');
      this.accountId = '';
      this.amount = 0;
      console.log('Transaction submitted!')
      } catch (error) {
        console.error('Error submitting transaction:', error)
      }
    },
  },
});
</script>

<style scoped>
/* Custom component styles */
</style>
