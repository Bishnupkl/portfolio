<script setup>
import { Code2, PenTool, Rocket, Search } from 'lucide-vue-next';

defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
});

const iconMap = {
  Code2,
  PenTool,
  Rocket,
  Search,
};
</script>

<template>
  <section class="bg-mist py-24">
    <div class="mx-auto max-w-page px-5 lg:px-0">
      <div class="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <p class="section-kicker mb-3">Workflow</p>
          <h2 class="text-4xl font-black leading-tight lg:text-5xl">How I move an idea into production</h2>
        </div>
        <p class="max-w-md text-lg leading-8 text-[#52605c]">
          Clear planning, clean implementation, and practical deployment steps for Laravel, Vue, API, and CMS projects.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(step, index) in steps"
          :key="step.title"
          v-reveal="`${index * 90}ms`"
          class="motion-card relative overflow-hidden rounded-card bg-white p-7"
        >
          <span class="absolute right-5 top-4 text-7xl font-black leading-none text-[#edf1f1]">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="relative z-10 mb-8 grid h-14 w-14 place-items-center rounded-full bg-accent text-white">
            <component :is="iconMap[step.icon] || Search" :size="24" />
          </span>
          <h3 class="relative z-10 text-2xl font-black leading-tight text-ink">{{ step.title }}</h3>
          <p class="relative z-10 mt-4 leading-7 text-[#52605c]">{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
