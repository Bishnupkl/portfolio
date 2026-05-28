<script setup>
import { computed } from 'vue';
import { Building2, Code2, Layers, Monitor } from 'lucide-vue-next';

const props = defineProps({
  companies: {
    type: Array,
    default: () => [],
  },
  experienceHeading: {
    type: String,
    default: '',
  },
  experienceHighlights: {
    type: Array,
    default: () => [],
  },
  experienceYears: {
    type: [String, Number],
    default: '',
  },
});

const iconMap = {
  Code: Code2,
  Code2,
  Layers,
  Monitor,
};

const companyGroups = computed(() => {
  return props.companies.reduce((groups, company) => {
    const item = typeof company === 'string' ? { name: company, relationship: 'Main Experience' } : company;
    const relationship = item.relationship || item.type || 'Main Experience';
    groups[relationship] = groups[relationship] || [];
    groups[relationship].push(item);
    return groups;
  }, {});
});
</script>

<template>
  <section class="bg-white py-24">
    <div class="mx-auto grid max-w-page gap-14 px-5 lg:grid-cols-[250px_1fr] lg:px-0">
      <div>
        <div class="text-[108px] font-black leading-none text-ink">{{ experienceYears }}</div>
        <p class="mt-8 max-w-36 text-2xl font-extrabold leading-tight">Years Of Experience Working</p>
      </div>
      <div>
        <h2 class="max-w-3xl text-4xl font-black leading-tight lg:text-5xl">{{ experienceHeading }}</h2>
        <div class="mt-8 rounded-card bg-mist p-7 text-ink">
          <div class="mb-5 flex items-center gap-3 text-xl font-black">
            <span class="grid h-11 w-11 place-items-center rounded-full bg-accent text-white">
              <Building2 :size="22" />
            </span>
            Companies worked with
          </div>
          <div class="grid gap-5">
            <div v-for="(items, relationship) in companyGroups" :key="relationship">
              <p class="mb-3 text-sm font-black uppercase text-[#687572]">{{ relationship }}</p>
              <div class="flex flex-wrap gap-3">
                <span v-for="company in items" :key="company.name" class="rounded-full bg-white px-5 py-3 text-sm font-extrabold shadow-sm">
                  {{ company.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <article v-for="service in experienceHighlights" :key="service.title" class="motion-card rounded-card p-10" :class="service.dark ? 'bg-ink text-white' : 'bg-mist text-ink'">
            <div class="mb-9 grid h-16 w-16 place-items-center rounded-full bg-accent text-white">
              <component :is="iconMap[service.icon] || Code2" :size="28" />
            </div>
            <h3 class="text-xl font-black">{{ service.title }}</h3>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
