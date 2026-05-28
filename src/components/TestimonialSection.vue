<script setup>
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-vue-next';

defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="bg-white py-24">
    <div class="mx-auto grid max-w-page items-center gap-14 px-5 lg:grid-cols-2 lg:px-0">
      <div>
        <Quote class="mb-7 text-accent" :size="54" fill="currentColor" />
        <blockquote class="max-w-lg text-xl leading-9 text-[#374440]">"{{ testimonials[0]?.feedback }}"</blockquote>
        <div class="mt-8">
          <h3 class="text-2xl font-black text-accent">{{ testimonials[0]?.client_name }}</h3>
          <p class="text-[#687572]">{{ testimonials[0]?.client_role }}</p>
          <div class="mt-3 flex text-accent">
            <Star v-for="item in testimonials[0]?.rating || 5" :key="item" :size="18" fill="currentColor" />
          </div>
        </div>
        <div class="mt-14 flex gap-3">
          <button class="grid h-10 w-10 place-items-center rounded-full border border-[#e5eeee]" title="Previous testimonial" type="button"><ChevronLeft :size="18" /></button>
          <button class="grid h-10 w-10 place-items-center rounded-full border border-[#e5eeee]" title="Next testimonial" type="button"><ChevronRight :size="18" /></button>
        </div>
      </div>
      <img class="aspect-[4/3] w-full rounded-card object-cover" :src="testimonials[0]?.client_image_url" :alt="testimonials[0]?.client_name">
    </div>
  </section>
</template>
