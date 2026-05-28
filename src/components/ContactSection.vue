<script setup>
import { reactive, ref } from 'vue';
import { Mail, MapPin, Phone, Send } from 'lucide-vue-next';
import { usePortfolioStore } from '../stores/portfolio';

defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

const store = usePortfolioStore();
const sending = ref(false);
const error = ref('');
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

async function submit() {
  sending.value = true;
  error.value = '';
  try {
    await store.sendMessage(form);
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
  } catch {
    error.value = 'Message could not be sent right now.';
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <section id="contact" class="bg-white py-24">
    <div class="mx-auto grid max-w-page gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-0">
      <div>
        <p class="section-kicker mb-3">Contact</p>
        <h2 class="mb-7 text-4xl font-black lg:text-5xl">Let's build something useful</h2>
        <div class="grid gap-5 text-lg">
          <a class="flex items-center gap-4" :href="`mailto:${profile.email}`"><Mail class="text-accent" /> {{ profile.email }}</a>
          <a class="flex items-center gap-4" :href="`tel:${profile.phone}`"><Phone class="text-accent" /> {{ profile.phone }}</a>
          <p class="flex items-center gap-4"><MapPin class="text-accent" /> {{ profile.location }}</p>
        </div>
      </div>
      <form class="grid gap-4" @submit.prevent="submit">
        <div class="grid gap-4 md:grid-cols-2">
          <input v-model="form.name" class="rounded-card border border-[#dfeaea] px-5 py-4 outline-accent" placeholder="Name" required>
          <input v-model="form.email" class="rounded-card border border-[#dfeaea] px-5 py-4 outline-accent" placeholder="Email" type="email" required>
        </div>
        <input v-model="form.subject" class="rounded-card border border-[#dfeaea] px-5 py-4 outline-accent" placeholder="Subject">
        <textarea v-model="form.message" class="min-h-40 rounded-card border border-[#dfeaea] px-5 py-4 outline-accent" placeholder="Message" required></textarea>
        <div class="flex flex-wrap items-center gap-4">
          <button class="accent-btn border-0" type="submit" :disabled="sending">Send Message <Send :size="18" /></button>
          <span v-if="store.contactStatus" class="font-bold text-green-700">{{ store.contactStatus }}</span>
          <span v-if="error" class="font-bold text-red-700">{{ error }}</span>
        </div>
      </form>
    </div>
  </section>
</template>
