<script setup lang="ts">
</script>

<template>
  <div
    class="popup-component"
  >
    <div class="popup-content">
      <h2><slot name="name" /></h2>
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.popup-component {
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
    border: 1px solid #eee;
    margin: auto;
    vertical-align: middle;
    padding: 2rem;
    background: #b5c5f567;
}
</style>
