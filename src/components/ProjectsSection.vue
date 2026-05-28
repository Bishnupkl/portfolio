<script setup>
import { computed, reactive, ref } from 'vue';
import { ExternalLink, Github } from 'lucide-vue-next';

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});

const failedImages = reactive({});
const activeCategory = ref('All');

const categories = computed(() => ['All', ...new Set(props.projects.map((project) => project.category).filter(Boolean))]);
const visibleProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return props.projects;
  }

  return props.projects.filter((project) => project.category === activeCategory.value);
});

function projectImage(project) {
  if (project.image_url) {
    return project.image_url;
  }

  if (project.live_url) {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.live_url)}?w=900`;
  }

  return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80';
}

function markImageFailed(project) {
  failedImages[project.slug || project.title] = true;
}

function initials(title) {
  return title
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}
</script>

<template>
  <section id="projects" class="bg-white py-24">
    <div class="mx-auto max-w-page px-5 lg:px-0">
      <div class="mb-14 text-center">
        <p class="section-kicker mb-3">Portfolio</p>
        <h2 class="text-4xl font-black lg:text-5xl">Some of my most recent projects</h2>
      </div>
      <div class="mb-10 flex flex-wrap justify-center gap-3">
        <button
          v-for="category in categories"
          :key="category"
          class="rounded-full border px-5 py-2 text-sm font-extrabold transition"
          :class="activeCategory === category ? 'border-accent bg-accent text-white' : 'border-[#dfeaea] bg-white text-ink hover:border-accent hover:text-accent'"
          type="button"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
      <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink v-for="project in visibleProjects" :key="project.slug" :to="{ name: 'projects.show', params: { slug: project.slug } }" class="motion-card group block overflow-hidden rounded-card bg-white shadow-sm">
          <div class="relative aspect-[4/3] overflow-hidden">
            <div v-if="failedImages[project.slug || project.title]" class="grid h-full w-full place-items-center bg-mist text-center">
              <span class="text-5xl font-black text-accent">{{ initials(project.title) }}</span>
            </div>
            <img v-else class="h-full w-full object-cover transition duration-300 group-hover:scale-105" :src="projectImage(project)" :alt="project.title" @error="markImageFailed(project)">
            <div class="absolute inset-0 grid place-items-center bg-ink/0 transition group-hover:bg-ink/50">
              <span class="grid h-12 w-12 scale-75 place-items-center rounded-full bg-accent text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                <ExternalLink :size="20" />
              </span>
            </div>
          </div>
          <div class="py-5">
            <p class="section-kicker">{{ project.category }}</p>
            <h3 class="mt-1 text-xl font-black">{{ project.title }}</h3>
            <p class="mt-3 line-clamp-2 leading-7 text-[#52605c]">{{ project.description }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="technology in project.technologies || []" :key="technology" class="rounded-full bg-mist px-3 py-1 text-xs font-extrabold text-[#52605c]">{{ technology }}</span>
            </div>
            <div class="mt-5 flex gap-3 text-sm font-extrabold text-accent">
              <span v-if="project.live_url" class="inline-flex items-center gap-2"><ExternalLink :size="16" />Live</span>
              <span v-if="project.github_url" class="inline-flex items-center gap-2"><Github :size="16" />Code</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
