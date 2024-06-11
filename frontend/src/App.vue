<template>
  <TransactionForm />
  <TransactionHistory />
</template>


<script setup lang="ts">
//import { defineComponent } from "vue";

import TransactionForm from "./components/TransactionForm.vue";
import TransactionHistory from "./components/TransactionHistory.vue";

// export default defineComponent({
//   name: "App",
//   components: {
//     TransactionForm,
//     TransactionHistory,
//   },
//   methods: {
//     fetchTransactions() {
//       (this.$refs.transactionHistory as any).fetchTransactions();
//     }
//   }
// });

</script>


<style scoped>
</style>
