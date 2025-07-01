<script setup>

</script>

<template>
  <router-link class="item">
    <div class="d-flex pt-3">
      <div class="pb-3 mb-0 w-100">
        <div class="d-flex justify-content-between">
          <b>제목</b>
          <div>
            <span role="button">삭제</span>
          </div>
        </div>
        <div class="mt-2">날짜</div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
  .item {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0;

    &:hover {
      border-color: #aaa;
    }
  }
</style>