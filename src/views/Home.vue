<script setup>
  import { reactive, onMounted } from 'vue';
  import httpService from '@/services/HttpService';
  import MemoCard from '@/components/MemoCard.vue';

  const state = reactive({
    memos: []
  });

  onMounted(() => {
    getItems();
  });

  const getItems = async () => {
    const data = await httpService.get();
    state.memos = data.resultData;
  };

  const deleteItem = async memoId => {
    if (confirm('삭제할까요?')) {
      const params = { memo_id: memoId };
      const data = await httpService.delete(params);

      if (data.resultData === 1) {
        const deleteIdx = state.memos.findIndex(item => item.memoId === memoId);
        if (deleteIdx >= 0) {
          state.memos.splice(deleteIdx, 1);
        }
      }
    }
  }
</script>

<template>
  <div class="memo-list">
    <router-link to="/add" class="add btn btn-light">
      등록하기
    </router-link>

    <MemoCard v-for="m in state.memos" :item="m" :key="m.id" @delete-item="deleteItem" />
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