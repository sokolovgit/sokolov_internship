<template>
  <div class="flex justify-center items-center mt-4 space-x-4">
    <button
      @click="prevPage"
      :disabled="currentPage <= 1"
      class="w-10 bg-indigo-200 text-indigo-800 p-2 rounded-md shadow-sm hover:bg-indigo-500 disabled:bg-gray-300">
      &lt;
    </button>

    <div class="flex items-center space-x-1 mx-2">
      <button
        v-if="currentPage > 2"
        @click="updatePage(1)"
        class="w-10 bg-indigo-200 text-indigo-800 p-2 rounded-md shadow-sm hover:bg-indigo-500">
        1
      </button>
      <div v-if="currentPage > 3" class="w-10 flex justify-center">
        ...
      </div>

      <button
        v-for="page in pages"
        :key="page"
        @click="updatePage(page)"
        :class="{
          'bg-indigo-600 text-white hover:bg-indigo-700': page === currentPage,
          'bg-indigo-200 text-indigo-800 hover:bg-indigo-500': page !== currentPage
        }"
        class="w-10 p-2 rounded-md shadow-sm">
        {{ page }}
      </button>

      <div v-if="currentPage <= totalPages - 3" class="w-10 flex justify-center">
        ...
      </div>
      <button
        v-if="currentPage < totalPages - 1"
        @click="updatePage(totalPages)"
        class="w-10 bg-indigo-200 text-indigo-800 p-2 rounded-md shadow-sm hover:bg-indigo-500">
        {{ totalPages }}
      </button>
    </div>

    <button
      @click="nextPage"
      :disabled="currentPage >= totalPages"
      class="w-10 bg-indigo-200 text-indigo-800 p-2 rounded-md shadow-sm hover:bg-indigo-500 disabled:bg-gray-300">
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['updatePage']);

function prevPage() {
  if (props.currentPage > 1) {
    emit('updatePage', props.currentPage - 1);
  }
}

function nextPage() {
  if (props.currentPage < props.totalPages) {
    emit('updatePage', props.currentPage + 1);
  }
}

function updatePage(page: number) {
  emit('updatePage', page);
}

const pages = computed(() => {
  let min = Math.max(1, props.currentPage - 1);
  let max = Math.min(props.totalPages, props.currentPage + 1);

  if (props.currentPage === 1) {
    max = Math.min(3, props.totalPages);
  } else if (props.currentPage === props.totalPages) {
    min = Math.max(1, props.totalPages - 2);
  }

  if (props.currentPage > 2 && props.currentPage < props.totalPages - 1) {
    min = props.currentPage - 1;
    max = props.currentPage + 1;
  } else if (props.currentPage <= 2) {
    max = 3;
  } else if (props.currentPage >= props.totalPages - 1) {
    min = props.totalPages - 2;
  }

  const result = [];
  for (let i = min; i <= max; i++) {
    result.push(i);
  }
  return result;
});
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>