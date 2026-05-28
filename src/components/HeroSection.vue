<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-vue-next';

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  typingTitles: {
    type: Array,
    default: () => [],
  },
  highlights: {
    type: Array,
    default: () => [],
  },
});

const typedText = ref('');
const wordIndex = ref(0);
const letterIndex = ref(0);
const deleting = ref(false);
let typingTimer;

const typingWords = computed(() => {
  const title = props.profile.designation;
  const titles = props.typingTitles.length ? props.typingTitles : [title].filter(Boolean);

  return title ? [title, ...titles.filter((word) => word !== title)] : titles;
});

function typeNextLetter() {
  if (!typingWords.value.length) {
    typingTimer = window.setTimeout(typeNextLetter, 300);
    return;
  }

  const currentWord = typingWords.value[wordIndex.value] || '';

  if (deleting.value) {
    typedText.value = currentWord.slice(0, Math.max(letterIndex.value - 1, 0));
    letterIndex.value -= 1;
  } else {
    typedText.value = currentWord.slice(0, letterIndex.value + 1);
    letterIndex.value += 1;
  }

  if (!deleting.value && letterIndex.value === currentWord.length) {
    deleting.value = true;
    typingTimer = window.setTimeout(typeNextLetter, 1400);
    return;
  }

  if (deleting.value && letterIndex.value === 0) {
    deleting.value = false;
    wordIndex.value = (wordIndex.value + 1) % typingWords.value.length;
  }

  typingTimer = window.setTimeout(typeNextLetter, deleting.value ? 45 : 85);
}

onMounted(() => {
  typingTimer = window.setTimeout(typeNextLetter, 300);
});

onBeforeUnmount(() => {
  window.clearTimeout(typingTimer);
});
</script>

<template>
  <section id="home" class="relative min-h-[760px] overflow-hidden bg-mist pt-28 lg:min-h-[720px]">
    <div class="mx-auto grid max-w-page items-center gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-0 lg:py-16">
      <div class="relative z-10 max-w-xl">
        <div class="hero-eyebrow mb-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-ink shadow-sm">
          <Sparkles class="text-accent" :size="16" />
          Available for Laravel, Vue, API, and admin panel work
        </div>
        <p class="mb-4 text-2xl font-semibold text-ink">Hi, I'm {{ profile.full_name }}</p>
        <h3 class="mb-8 mt-1 min-h-[44px] text-4xl font-black leading-tight text-ink">
          <span class="typed-text">{{ typedText }}</span><span class="cursor typing">&nbsp;</span>
        </h3>
        <h1 class="sr-only">{{ profile.designation }}</h1>
        <p class="mb-10 max-w-lg text-lg leading-8 text-[#24322f]">{{ profile.short_intro }}</p>
        <div class="mb-10 grid gap-3 sm:grid-cols-2">
          <div v-for="item in highlights" :key="item" class="hero-highlight flex items-center gap-3 rounded-card bg-white/80 px-4 py-3 text-sm font-extrabold text-[#24322f] shadow-sm backdrop-blur">
            <CheckCircle2 class="shrink-0 text-accent" :size="18" />
            {{ item }}
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <a class="accent-btn" href="#contact">Hire Me <ArrowRight :size="18" /></a>
          <a class="hero-secondary-btn inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#dfeaea] bg-white px-7 font-extrabold text-ink transition hover:border-accent hover:text-accent" href="#projects">View Work</a>
        </div>
      </div>
      <div class="relative hidden min-h-[460px] lg:block lg:min-h-[590px]">
        <div class="hero-stack-card absolute right-32 top-4 z-20 hidden rounded-card bg-white p-5 shadow-xl lg:block">
          <p class="text-sm font-extrabold text-[#687572]">Primary Stack</p>
          <p class="mt-1 text-xl font-black text-ink">Laravel + Vue.js</p>
        </div>
        <div class="absolute bottom-20 left-0 z-10 hidden rounded-card bg-ink p-5 text-white shadow-xl lg:block">
          <p class="text-sm font-extrabold text-white/70">Experience</p>
          <p class="mt-1 text-3xl font-black">8+ Years</p>
        </div>
        <img class="absolute bottom-[-80px] right-0 h-[620px] w-full max-w-[620px] object-contain object-bottom lg:h-[760px]" :src="profile.profile_image_url || profile.hero_image_url" :alt="profile.full_name">
      </div>
    </div>
  </section>
</template>

<style scoped>
.cursor {
  display: inline-block;
  width: 3px;
  margin-left: 4px;
  background: #ff454f;
  animation: blink 0.9s steps(2, start) infinite;
}

.cursor.typing {
  animation-duration: 0.65s;
}

@keyframes blink {
  0%,
  45% {
    opacity: 1;
  }

  46%,
  100% {
    opacity: 0;
  }
}
</style>
