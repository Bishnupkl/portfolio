<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowUp } from 'lucide-vue-next';

const visible = ref(false);

function updateVisibility() {
  visible.value = window.scrollY > 520;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility);
});
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-if="visible"
      class="fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#eb3440] focus:outline-none focus:ring-4 focus:ring-accent/25"
      title="Go to top"
      type="button"
      @click="scrollToTop"
    >
      <ArrowUp :size="22" />
    </button>
  </Transition>
</template>
