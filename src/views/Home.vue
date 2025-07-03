<script setup>
  import { reactive, onMounted } from 'vue';
  import httpService from '@/services/HttpService';
  import MemoCard from '@/components/MemoCard.vue';

  const state = reactive({
    memos: []
  });

  onMounted(() => {
    getItems({});
  });

  const getItems = async params => {
    const data = await httpService.get(params);
    state.memos = data.resultData;
  };

  const model = {
    searchOption: '',
    searchText: ''
  };

  const search = async () => {
    const params = {
      search_option: model.searchOption,
      search_text: model.searchText
    };
    getItems(params);
  }

  const deleteItem = async memoId => {
    if (!confirm('삭제할까요?')) {
      return;
    }

    const params = { memo_id: memoId };
    const data = await httpService.delete(params);

    if (data.resultData === 1) {
      const deleteIdx = state.memos.findIndex(item => item.memoId === memoId);
      if (deleteIdx >= 0) {
        state.memos.splice(deleteIdx, 1);
      }
    }
  }
</script>

<template>
  <div class="memo-list">
    <router-link to="/add" class="add btn btn-light">
      + 등록하기
    </router-link>

    <div class="d-flex mb-3 mt-3">
      <select class="form-control me-3 w-25" v-model="model.searchOption">
        <option value="">제목+내용</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
      </select>
      <input type="text" class="form-control me-3 w-50" v-model="model.searchText">
      <button class="btn btn-primary w-25" @click="search">검색</button>
    </div>

    <MemoCard v-for="m in state.memos" :item="m" :key="m.id" @delete-item="deleteItem" />

    <button type="button" class="more btn btn-light w-100">더 보기</button>
  </div>
</template>

<style lang="scss" scoped>
  .memo-list {
    .add, .more {
      display: block;
      padding: 25px;
      border: 1px solid #eee;
    }
  }
</style>