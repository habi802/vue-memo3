<script setup>
  import MemoCard from '@/components/MemoCard.vue';
</script>

<template>
  <div class="memo-list">
    <router-link class="add btn btn-light">
      등록하기
    </router-link>

    <MemoCard />
    <MemoCard />
    <MemoCard />
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