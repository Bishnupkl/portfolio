<script setup>
import { Download } from 'lucide-vue-next';

defineProps({
  profile: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section id="about" class="bg-white py-24">
    <div class="mx-auto grid max-w-page items-center gap-16 px-5 lg:grid-cols-[420px_1fr] lg:px-0">
      <img class="float-slow aspect-[4/5] w-full rounded-card object-cover" :src="profile.profile_image_url || profile.hero_image_url" :alt="profile.full_name">
      <div>
        <p class="section-kicker mb-3">My Intro</p>
        <h2 class="mb-7 text-4xl font-black lg:text-5xl">About Me</h2>
        <p class="mb-9 max-w-3xl text-lg leading-8 text-[#3f4c49]">{{ profile.bio }}</p>
        <dl class="grid max-w-lg gap-3 text-lg">
          <div class="grid grid-cols-[90px_1fr]"><dt class="font-black">Name</dt><dd>{{ profile.full_name }}</dd></div>
          <div class="grid grid-cols-[90px_1fr]"><dt class="font-black">From</dt><dd>{{ profile.location }}</dd></div>
          <div class="grid grid-cols-[90px_1fr]"><dt class="font-black">Email</dt><dd>{{ profile.email }}</dd></div>
        </dl>
        <a class="accent-btn mt-10" :href="profile.cv_url || '#'" target="_blank">Download CV <Download :size="18" /></a>
      </div>
    </div>
  </section>
</template>
