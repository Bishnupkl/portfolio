<script setup>
import { reactive } from 'vue';

defineProps({
  companies: {
    type: Array,
    default: () => [],
  },
});

const failedLogos = reactive({});

function logoUrl(domain) {
  return `https://logo.clearbit.com/${domain}`;
}

function useFallbackLogo(event, domain) {
  if (event.target.dataset.fallback === 'true') {
    failedLogos[domain] = true;
    return;
  }

  event.target.dataset.fallback = 'true';
  event.target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}
</script>

<template>
  <section class="border-b border-[#eef3f3] bg-white">
    <div class="mx-auto max-w-page px-5 py-12 lg:px-0">
      <div class="grid grid-cols-2 items-center justify-center gap-5 sm:grid-cols-3 lg:grid-cols-6">
        <a
          v-for="company in companies"
          :key="company.name"
          :href="company.url"
          class="motion-card group flex min-h-[112px] flex-col items-center justify-center gap-3 rounded-card bg-white px-4 py-5 text-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          target="_blank"
          rel="noreferrer"
        >
          <span v-if="failedLogos[company.domain]" class="grid h-14 min-w-14 place-items-center rounded-card bg-mist px-3 text-lg font-black text-accent">
            {{ initials(company.name) }}
          </span>
          <img v-else class="h-14 max-w-[150px] object-contain" :src="company.logo_url || logoUrl(company.domain)" :alt="`${company.name} logo`" @error="useFallbackLogo($event, company.domain)">
          <span class="text-sm font-black leading-tight text-[#8f9897]">{{ company.name }}</span>
          <span v-if="company.relationship" class="rounded-full bg-mist px-3 py-1 text-[11px] font-black uppercase text-[#687572]">{{ company.relationship }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
