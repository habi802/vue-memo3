<script setup>
  import httpService from "@/services/HttpService";
  import { onMounted, reactive } from "vue";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();

  const state = reactive({
    memo: {
      id: 0,
      title: '',
      content: '',
      createdAt: ''
    }
  });

  onMounted(async () => {
    const id = route.params.memoId;
    const data = await httpService.getById(id);
    state.memo = data.resultData; 
  });
</script>

<template>
  <div class="mb-3 pb-3 border-bottom">
    <p class="fs-5 fw-bold">{{ state.memo.title }}</p>
    {{ state.memo.createdAt }}
  </div>
  <div class="mb-3 pb-3 border-bottom">
    {{ state.memo.content }}
  </div>
  <button class="btn btn-primary w-100 py-3">수정</button>
</template>

<style scoped>

</style>