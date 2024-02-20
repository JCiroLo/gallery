<script setup>
import { ref, onBeforeMount } from "vue";
import { $Image } from "./services";
import Slide from "./components/Slide/index.vue";

const transitionDuration = 500;

const fullpage = ref(null);
const images = ref([]);
const activeSection = ref(0);
const prevImage = ref(null);

const handleAddImage = (image, index) => {
  images.value.push(image);

  setTimeout(() => {
    fullpage.value.api.moveTo(index, 1);
  }, 100);
};

const handleChangeSection = async (from, to) => {
  activeSection.value = to.index;

  setTimeout(() => {
    prevImage.value = null;
  }, transitionDuration / 2);

  if (to.isLast) {
    const data = await $Image.get();

    if (data) {
      handleAddImage(data, to.index + 1);
    }
  } else {
    setTimeout(() => {
      prevImage.value = images.value[to.index].download_url;
    }, transitionDuration / 2);
  }
};

onBeforeMount(async () => {
  const data = await $Image.get();

  if (data) {
    handleAddImage(data, 1);

    prevImage.value = data.download_url;
  }
});

const options = {
  licenseKey: "gplv3-license",
  beforeLeave: handleChangeSection,
  scrollingSpeed: transitionDuration,
};
</script>

<template>
  <div :class="['content', { loading: loading }]">
    <full-page ref="fullpage" :options="options">
      <div v-for="(data, index) in images" :key="data.download_url" class="section">
        <Slide :index="index" :author="data.author" :url="data.download_url" />
      </div>
      <div class="section"></div>
    </full-page>
    <div class="thumbnails">
      <img
        v-for="(data, index) in images"
        :key="data.download_url"
        :class="{ active: index === activeSection }"
        :src="data.download_url"
        :alt="data.author"
        @click="fullpage.api.moveTo(index + 1, 1)"
      />
    </div>
  </div>
</template>

<style scoped>
.section {
  min-height: 100vh;
  width: 100vw;
}

.thumbnails {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 128px;
  max-height: calc(100vh - 4rem);
  padding: 1rem;
  opacity: 0.5;
  overflow-y: auto;
  transform: translateY(-50%);
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  img {
    height: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 0.5rem;
    filter: grayscale(100%);
    cursor: pointer;
    background-color: #a4a4a450;
    transition: filter 0.2s, transform 0.2s;
    animation: pulse 2s infinite;
    transform: translateX(0);

    &:hover {
      filter: grayscale(0%);
    }

    &.active {
      filter: grayscale(0%);
      transform: translateX(-1rem);
    }
  }
}

@keyframes pulse {
  0% {
    background-color: #a4a4a450;
  }
  50% {
    background-color: #a4a4a41c;
  }
  100% {
    background-color: #a4a4a450;
  }
}
</style>
