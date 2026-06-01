<script setup>
import { computed, ref } from 'vue';
import { Download, Trash2 } from 'lucide-vue-next';
import { messageStorageKey, savedMessages } from '../stores/portfolio';

const messages = ref(savedMessages());
const jsonOutput = computed(() => JSON.stringify(messages.value, null, 2));

function refreshMessages() {
  messages.value = savedMessages();
}

function clearMessages() {
  if (!window.confirm('Clear locally saved messages?')) {
    return;
  }

  window.localStorage.removeItem(messageStorageKey);
  refreshMessages();
}

function downloadJson() {
  const blob = new Blob([jsonOutput.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'portfolio-contact-messages.json';
  link.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <main class="min-h-screen bg-mist px-5 py-12 text-ink">
    <section class="mx-auto max-w-5xl">
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="section-kicker mb-2">Private Local View</p>
          <h1 class="text-4xl font-black">Messages For Me</h1>
          <p class="mt-3 max-w-2xl leading-7 text-[#52605c]">
            Messages shown here are saved in this browser only when the backend API is unavailable.
          </p>
        </div>
        <div class="flex gap-3">
          <button class="accent-btn border-0" type="button" @click="downloadJson">
            <Download :size="18" /> Export JSON
          </button>
          <button class="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#dfeaea] bg-white px-6 font-extrabold text-ink" type="button" @click="clearMessages">
            <Trash2 :size="18" /> Clear
          </button>
        </div>
      </div>

      <div v-if="messages.length" class="grid gap-4">
        <article v-for="message in messages" :key="message.id" class="rounded-card bg-white p-6 shadow-sm">
          <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 class="text-2xl font-black">{{ message.name }}</h2>
              <a class="font-bold text-accent" :href="`mailto:${message.email}`">{{ message.email }}</a>
            </div>
            <time class="text-sm font-bold text-[#687572]">{{ new Date(message.created_at).toLocaleString() }}</time>
          </div>
          <p v-if="message.subject" class="mb-3 font-black">{{ message.subject }}</p>
          <p class="whitespace-pre-wrap leading-8 text-[#3f4c49]">{{ message.message }}</p>
        </article>
      </div>

      <div v-else class="rounded-card bg-white p-8 text-center shadow-sm">
        <p class="text-lg font-black">No local messages yet.</p>
      </div>

      <details class="mt-8 rounded-card bg-ink p-5 text-white">
        <summary class="cursor-pointer font-black">Raw JSON</summary>
        <pre class="mt-4 overflow-auto text-sm leading-6">{{ jsonOutput }}</pre>
      </details>
    </section>
  </main>
</template>
