<template>
  <div class="container">
    <img :class="['foreground', { show: renderImg }]" :src="url" :alt="author" @load="handleImageLoad" />
    <div :class="['background', { 'not-loaded': !renderImg }]">
      <img :src="url" alt="Preview" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { author, url } = defineProps({ author: String, url: String });
const renderImg = ref(false);

const handleImageLoad = () => {
  renderImg.value = true;
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  // align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 100vh;
  padding-top: 2rem;
  overflow: hidden;

  .foreground {
    display: flex;
    max-height: calc(100vh - 4rem);
    max-width: calc(100vw - 4rem);
    border-radius: 1rem;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s;

    &.show {
      opacity: 1;
    }
  }

  .background {
    position: absolute;
    z-index: -1;
    inset: 0rem;
    filter: blur(4rem) saturate(2);
    opacity: 1;
    transition: opacity 0.5s;
    overflow: hidden;
    
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.not-loaded {
      opacity: 0;
    }
  }
}
</style>
