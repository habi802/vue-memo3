<script setup>
  import { reactive } from 'vue';

  const state = reactive({
    memo: {
      memoId: 0,
      title: '',
      content: '',
      createdAt: '',
    }
  });

  const submit = () => {
    if (state.memo.title.trim().length === 0) {
      alert('제목을 작성해 주십시다.');
      return;
    }
    if (state.memo.title.trim().length > 30) {
      alert('제목은 30자 내로 작성해 주십시다.');
      return;
    }
    if (state.memo.content.trim().length === 0) {
      alert('내용을 작성해 주십시다.');
      return;
    }
    if (state.memo.content.trim().length > 200) {
      alert('내용은 200자 이내로 작성해 주십시다.');
      return;
    }
  };
</script>

<template>
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" id="title" class="form-control p-3" v-model="state.memo.title">
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea type="text" id="content" class="form-control p-3" v-model="state.memo.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">저장</button>
  </form>
</template>

<style lang="scss" scoped>

</style>