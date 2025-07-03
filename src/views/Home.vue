<script setup>
  import { ref, onMounted, watch } from 'vue';
  import httpService from '@/services/HttpService';
  import MemoCard from '@/components/MemoCard.vue';

  const memos = ref([]);

  onMounted(() => {
    getItems({ limit: limit + 1 });
  });

  // 더 보기를 위한 변수
  let lastIdx = 0;
  let isMemoEnd = ref(false);
  let limit = 5;

  // 목록 가져오기
  const getItems = async params => {
    const data = await httpService.get(params);
    const newMemos = data.resultData;

    if (newMemos.length <= limit) {
      isMemoEnd.value = true;
    }

    memos.value.push(...newMemos.slice(0, limit));

    if (newMemos.length > 0) {
      lastIdx = newMemos[newMemos.length - 2]?.memoId ?? 0;
    }
  };

  // 검색을 위한 변수
  const searchOption = ref('');
  const previousOption = ref('');
  const searchText = ref('');
  const previousText = ref('');

  let searchParams = null;

  // 검색
  const search = () => {
    // 이전의 검색 옵션이나 검색어와 다를 경우, 다시 글 목록을 처음 5개부터 화면에 보여줌
    if (searchOption.value !== previousOption.value || searchText.value !== previousText.value) {
      lastIdx = 0;
      memos.value = [];
      isMemoEnd.value = false;
    }

    searchParams = {
      search_option: searchOption.value,
      search_text: searchText.value,
      limit: limit + 1
    }
    getItems(searchParams);
  }

  // 더 보기
  const loadMore = () => {
    searchParams = {
      search_option: searchOption.value,
      search_text: searchText.value,
      last_idx: lastIdx,
      limit: limit + 1
    };
    getItems(searchParams);
  };

  // 삭제
  const deleteItem = async memoId => {
    if (!confirm('삭제할까요?')) {
      return;
    }

    const params = { memo_id: memoId };
    const data = await httpService.delete(params);

    if (data.resultData === 1) {
      const deleteIdx = memos.value.findIndex(item => item.memoId === memoId);
      if (deleteIdx >= 0) {
        memos.value.splice(deleteIdx, 1);
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
      <select class="form-control me-3 w-25" v-model="searchOption">
        <option value="">제목+내용</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
      </select>
      <input type="text" class="form-control me-3 w-50" v-model="searchText">
      <button class="btn btn-primary w-25" @click="search">검색</button>
    </div>

    <MemoCard v-for="m in memos" :item="m" :key="m.id" @delete-item="deleteItem" />

    <button v-if="!isMemoEnd" type="button" class="more btn btn-light w-100" @click="loadMore">
      더 보기
    </button>
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