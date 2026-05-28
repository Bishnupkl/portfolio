<script setup>
import { Code2, Gauge, Layers, Lightbulb, Monitor, Smartphone } from 'lucide-vue-next';

defineProps({
  services: {
    type: Array,
    required: true,
  },
});

const iconMap = {
  Code: Code2,
  Code2,
  Gauge,
  Layers,
  Lightbulb,
  Monitor,
  Smartphone,
};
</script>

<template>
  <section id="services" class="bg-mist py-24">
    <div class="mx-auto max-w-page px-5 lg:px-0">
      <div class="mb-16 text-center">
        <p class="section-kicker mb-3">What I Do?</p>
        <h2 class="text-4xl font-black lg:text-5xl">How I can help your next project</h2>
      </div>
      <div class="grid gap-x-16 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="service in services" :key="service.title" class="motion-card relative rounded-card bg-white p-8 pl-16 shadow-sm">
          <div class="absolute -left-7 top-7 grid h-16 w-16 place-items-center rounded-full bg-white text-accent shadow-md">
            <component :is="iconMap[service.icon] || Lightbulb" :size="28" />
          </div>
          <h3 class="mb-3 text-2xl font-black leading-tight">{{ service.title }}</h3>
          <p class="leading-7 text-[#52605c]">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
