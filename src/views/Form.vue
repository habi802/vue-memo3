<script setup>
  import { reactive, onMounted, useTemplateRef } from 'vue';
  import httpService from '@/services/HttpService';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  const state = reactive({
    memo: {
      memoId: 0,
      title: '',
      content: '',
      createdAt: '',
    }
  });

  onMounted(() => {
    if (route.params.memoId) {
      getById();
    }
  });

  const getById = async () => {
    const data = await httpService.getById(route.params.memoId);
    state.memo = data.resultData;
  };

  const refTitle = useTemplateRef('ref_title');
  const refContent = useTemplateRef('ref_content');

  const submit = async () => {
    if (state.memo.title.trim().length === 0) {
      alert('제목을 작성해 주십시다.');
      refTitle.value.focus();
      return;
    }
    if (state.memo.title.trim().length > 30) {
      alert('제목은 30자 내로 작성해 주십시다.');
      refTitle.value.focus();
      return;
    }
    if (state.memo.content.trim().length === 0) {
      alert('내용을 작성해 주십시다.');
      refContent.value.focus();
      return;
    }
    if (state.memo.content.trim().length > 200) {
      alert('내용은 200자 이내로 작성해 주십시다.');
      refContent.value.focus();
      return;
    }

    let data = null;
    const bodyJson = {
      title: state.memo.title,
      content: state.memo.content
    };

    if (route.params.memoId) {
      // 수정
      bodyJson.memoId = state.memo.memoId;
      data = await httpService.put(bodyJson);
    } else {
      // 등록
      data = await httpService.post(bodyJson);
    }

    if (data.resultData === 1) {
      router.push({ path: '/' });
    } else {
      alert(data.resultMessage);
    }
  };
</script>

<template>
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" id="title" ref="ref_title" class="form-control p-3" v-model="state.memo.title">
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea type="text" id="content" ref="ref_content" class="form-control p-3" v-model="state.memo.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">
      {{ route.params.memoId ? '수정' : '등록' }}
    </button>
  </form>
</template>

<style lang="scss" scoped>

</style>