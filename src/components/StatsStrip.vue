<script setup>
import { Award, BriefcaseBusiness, Code2, Rocket } from 'lucide-vue-next';

defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
});

const iconMap = {
  Award,
  BriefcaseBusiness,
  Code2,
  Rocket,
};
</script>

<template>
  <section class="bg-mist py-16">
    <div class="mx-auto grid max-w-page gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
      <article
        v-for="(stat, index) in stats"
        :key="stat.label"
        v-reveal="`${index * 80}ms`"
        class="motion-card rounded-card border border-[#e5eeee] bg-white p-7"
      >
        <div class="mb-5 flex items-center justify-between gap-4">
          <span class="grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
            <component :is="iconMap[stat.icon] || Award" :size="22" />
          </span>
          <span class="text-5xl font-black leading-none text-ink">{{ stat.value }}</span>
        </div>
        <h3 class="text-lg font-black text-ink">{{ stat.label }}</h3>
        <p v-if="stat.description" class="mt-2 text-sm font-semibold leading-6 text-[#687572]">{{ stat.description }}</p>
      </article>
    </div>
  </section>
</template>
