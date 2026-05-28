<script setup>
import { Github, Instagram, Linkedin, Twitter } from 'lucide-vue-next';

defineProps({
  settings: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <footer class="bg-ink py-20 text-center text-white">
    <div class="mx-auto max-w-page px-5 lg:px-0">
      <RouterLink to="/" class="brand-box mx-auto mb-8">{{ settings.site_logo || 'B.' }}</RouterLink>
      <p class="mx-auto mb-8 max-w-2xl leading-8 text-[#d9e4e1]">{{ settings.footer_text }}</p>
      <div class="mb-12 flex justify-center gap-3">
        <a class="grid h-11 w-11 place-items-center rounded-full bg-white/10" :href="settings.github_url" title="GitHub"><Github :size="18" /></a>
        <a class="grid h-11 w-11 place-items-center rounded-full bg-white/10" :href="settings.linkedin_url" title="LinkedIn"><Linkedin :size="18" /></a>
        <a class="grid h-11 w-11 place-items-center rounded-full bg-white/10" :href="settings.twitter_url" title="Twitter"><Twitter :size="18" /></a>
        <a class="grid h-11 w-11 place-items-center rounded-full bg-white/10" href="https://instagram.com" title="Instagram"><Instagram :size="18" /></a>
      </div>
      <div class="border-t border-white/15 pt-8 text-sm text-[#d9e4e1]">Copyright © 2026 Biodata. All Rights Reserved.</div>
    </div>
  </footer>
</template>
