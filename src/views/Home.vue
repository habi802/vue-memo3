<script setup>
  import { reactive, onMounted } from 'vue';
  import httpService from '@/services/HttpService';
  import MemoCard from '@/components/MemoCard.vue';

  const state = reactive({
    memos: []
  });

  onMounted(() => {
    getMemos();
  });

  const getMemos = async () => {
    const data = await httpService.get();
    state.memos = data.resultData;
  };
</script>

<template>
  <div class="memo-list">
    <router-link to="/add" class="add btn btn-light">
      등록하기
    </router-link>

    <MemoCard v-for="m in state.memos" :item="m" :key="m.id" />
  </div>
</template>

<style lang="scss" scoped>
  .memo-list {
    .add {
      display: block;
      padding: 25px;
      border: 1px solid #eee;
    }
  }
</style>