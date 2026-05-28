<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { ArrowLeft, ExternalLink, Github } from 'lucide-vue-next';
import Navbar from '../components/Navbar.vue';
import SiteFooter from '../components/SiteFooter.vue';
import { usePortfolioStore } from '../stores/portfolio';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const store = usePortfolioStore();
const { projects, settings } = storeToRefs(store);
const project = computed(() => projects.value.find((item) => item.slug === props.slug) || projects.value[0]);
const isDark = ref(false);
const imageFailed = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
}

onMounted(() => {
  store.load();
  isDark.value = localStorage.getItem('portfolio-theme') === 'dark';
});

watch(isDark, (value) => {
  localStorage.setItem('portfolio-theme', value ? 'dark' : 'light');
});

const projectImage = computed(() => {
  if (project.value?.image_url) {
    return project.value.image_url;
  }

  if (project.value?.live_url) {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.value.live_url)}?w=1200`;
  }

  return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80';
});

const projectInitials = computed(() => (project.value?.title || '')
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 3)
  .toUpperCase());
</script>

<template>
  <div class="bg-white" :class="{ dark: isDark }">
    <div class="relative bg-mist pb-16 pt-28">
      <Navbar :is-dark="isDark" :logo="settings.site_logo" @toggle-theme="toggleTheme" />
      <div class="mx-auto max-w-page px-5 lg:px-0">
        <RouterLink class="mb-10 inline-flex items-center gap-2 font-bold text-accent" to="/"><ArrowLeft :size="18" /> Back to portfolio</RouterLink>
        <div class="grid items-end gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p class="section-kicker mb-3">{{ project?.category }}</p>
            <h1 class="text-5xl font-black leading-tight lg:text-6xl">{{ project?.title }}</h1>
            <p class="mt-6 max-w-3xl text-lg leading-8 text-[#3f4c49]">{{ project?.description }}</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a v-if="project?.github_url" class="accent-btn" :href="project.github_url" target="_blank"><Github :size="18" /> Code</a>
            <a v-if="project?.live_url" class="accent-btn bg-ink" :href="project.live_url" target="_blank"><ExternalLink :size="18" /> Live</a>
          </div>
        </div>
      </div>
    </div>

    <main class="mx-auto max-w-page px-5 py-20 lg:px-0">
      <div class="mb-12 aspect-[16/9] w-full overflow-hidden rounded-card bg-mist">
        <div v-if="imageFailed" class="grid h-full w-full place-items-center">
          <span class="text-7xl font-black text-accent">{{ projectInitials }}</span>
        </div>
        <img v-else class="h-full w-full object-cover" :src="projectImage" :alt="project?.title" @error="imageFailed = true">
      </div>
      <div class="grid gap-12 lg:grid-cols-[1fr_320px]">
        <article>
          <h2 class="mb-5 text-3xl font-black">Project Overview</h2>
          <p class="text-lg leading-8 text-[#3f4c49]">{{ project?.description }}</p>
        </article>
        <aside class="rounded-card bg-mist p-8">
          <h2 class="mb-5 text-2xl font-black">Technologies</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in project?.technologies || []" :key="tech" class="rounded-full bg-white px-4 py-2 text-sm font-bold">{{ tech }}</span>
          </div>
        </aside>
      </div>
    </main>

    <SiteFooter :settings="settings" />
  </div>
</template>
