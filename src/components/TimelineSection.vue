<script setup>
import { BriefcaseBusiness, CalendarDays, GraduationCap, MapPin } from 'lucide-vue-next';

defineProps({
  experiences: {
    type: Array,
    default: () => [],
  },
  education: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section id="journey" class="bg-white py-24">
    <div class="mx-auto max-w-page px-5 lg:px-0">
      <div class="mb-14 max-w-3xl">
        <p class="section-kicker mb-3">Career Details</p>
        <h2 class="text-4xl font-black leading-tight lg:text-5xl">Experience and education behind the work</h2>
      </div>

      <div class="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <div class="mb-7 flex items-center gap-3 text-2xl font-black text-ink">
            <span class="grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
              <BriefcaseBusiness :size="22" />
            </span>
            Professional Experience
          </div>

          <div class="relative space-y-5 before:absolute before:bottom-0 before:left-5 before:top-2 before:w-px before:bg-[#dfeaea]">
            <article
              v-for="(item, index) in experiences"
              :key="`${item.company}-${item.role}`"
              v-reveal="`${index * 90}ms`"
              class="motion-card relative ml-11 rounded-card border border-[#e5eeee] bg-white p-6 shadow-sm"
            >
              <span class="absolute -left-[35px] top-7 h-4 w-4 rounded-full border-4 border-white bg-accent shadow-[0_0_0_1px_rgba(255,69,79,.35)]"></span>
              <div class="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-extrabold text-[#687572]">
                <span class="inline-flex items-center gap-2"><CalendarDays :size="16" />{{ item.period }}</span>
                <span v-if="item.mode" class="inline-flex items-center gap-2"><MapPin :size="16" />{{ item.mode }}</span>
              </div>
              <h3 class="text-2xl font-black leading-tight text-ink">{{ item.role }}</h3>
              <p class="mt-1 font-extrabold text-accent">{{ item.company }}</p>
              <p class="mt-4 leading-7 text-[#52605c]">{{ item.summary }}</p>
            </article>
          </div>
        </div>

        <div>
          <div class="mb-7 flex items-center gap-3 text-2xl font-black text-ink">
            <span class="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
              <GraduationCap :size="22" />
            </span>
            Education
          </div>

          <div class="grid gap-5">
            <article
              v-for="(item, index) in education"
              :key="`${item.school}-${item.degree}`"
              v-reveal="`${index * 90}ms`"
              class="motion-card rounded-card bg-mist p-7"
            >
              <div class="mb-3 inline-flex items-center gap-2 text-sm font-extrabold text-[#687572]">
                <CalendarDays :size="16" />{{ item.period }}
              </div>
              <h3 class="text-2xl font-black leading-tight text-ink">{{ item.degree }}</h3>
              <p class="mt-2 font-extrabold text-accent">{{ item.school }}</p>
              <p class="mt-4 leading-7 text-[#52605c]">{{ item.summary }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
