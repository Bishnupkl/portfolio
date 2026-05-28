<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { Menu, Moon, Search, Sun, X } from 'lucide-vue-next';
import { usePortfolioStore } from '../stores/portfolio';

defineProps({
  logo: {
    type: String,
    default: 'B.',
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle-theme']);
const router = useRouter();
const store = usePortfolioStore();
const { profile, projects, services, skills, settings } = storeToRefs(store);
const open = ref(false);
const searchQuery = ref('');
const searchOpen = ref(false);
const links = [
  { label: 'Home', href: '#home' },
  { label: 'My Intro', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const searchIndex = computed(() => {
  const sectionItems = links.map((link) => ({
    title: link.label,
    eyebrow: 'Section',
    description: `Jump to ${link.label}`,
    target: { name: 'home', hash: link.href },
    keywords: `${link.label} ${link.href}`,
  }));

  const profileItems = profile.value?.full_name
    ? [
        {
          title: profile.value.full_name,
          eyebrow: 'Profile',
          description: profile.value.designation || profile.value.short_intro,
          target: { name: 'home', hash: '#about' },
          keywords: `${profile.value.full_name} ${profile.value.designation} ${profile.value.short_intro} ${profile.value.bio}`,
        },
      ]
    : [];

  const projectItems = (projects.value || []).map((project) => ({
    title: project.title,
    eyebrow: project.category || 'Project',
    description: project.description,
    target: { name: 'projects.show', params: { slug: project.slug } },
    keywords: `${project.title} ${project.category} ${project.description} ${(project.technologies || []).join(' ')}`,
  }));

  const serviceItems = (services.value || []).map((service) => ({
    title: service.title,
    eyebrow: 'Service',
    description: service.description,
    target: { name: 'home', hash: '#services' },
    keywords: `${service.title} ${service.description}`,
  }));

  const skillItems = (skills.value || []).map((skill) => ({
    title: skill.name,
    eyebrow: skill.category || 'Skill',
    description: `${skill.percentage}% proficiency`,
    target: { name: 'home', hash: '#skills' },
    keywords: `${skill.name} ${skill.category} ${skill.percentage}`,
  }));

  const companyItems = (settings.value?.brand_companies || []).map((company) => ({
    title: company.name,
    eyebrow: 'Company',
    description: company.url,
    target: { name: 'home', hash: '#journey' },
    keywords: `${company.name} ${company.domain} ${company.url}`,
  }));

  return [...sectionItems, ...profileItems, ...projectItems, ...serviceItems, ...skillItems, ...companyItems];
});

const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return [];
  }

  return searchIndex.value
    .filter((item) => `${item.title} ${item.eyebrow} ${item.description} ${item.keywords}`.toLowerCase().includes(query))
    .slice(0, 7);
});

function selectResult(result) {
  if (!result) {
    return;
  }

  searchOpen.value = false;
  searchQuery.value = '';
  open.value = false;
  router.push(result.target);
}

function submitSearch() {
  if (searchResults.value.length) {
    selectResult(searchResults.value[0]);
  }
}
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-30">
    <div class="mx-auto flex max-w-page items-center justify-between gap-6 px-5 py-5 lg:px-0">
      <RouterLink to="/" class="brand-box" aria-label="Home">{{ logo }}</RouterLink>

      <nav class="hidden items-center gap-8 text-[15px] font-semibold text-ink lg:flex">
        <a v-for="link in links" :key="link.href" :href="link.href" class="transition hover:text-accent">{{ link.label }}</a>
      </nav>

      <div class="hidden items-center gap-4 lg:flex">
        <form class="search-shell relative flex h-11 rounded-full bg-white shadow-sm" @submit.prevent="submitSearch">
          <label class="sr-only" for="search">Search</label>
          <input
            id="search"
            v-model="searchQuery"
            class="search-input w-64 rounded-l-full border-0 px-5 text-sm outline-none"
            placeholder="Search projects, skills..."
            type="search"
            @focus="searchOpen = true"
            @input="searchOpen = true"
            @keydown.esc="searchOpen = false"
          >
          <button class="rounded-r-full bg-accent px-5 font-bold text-white" title="Search" type="submit">
            <Search :size="18" />
          </button>
          <div
            v-if="searchOpen && searchQuery"
            class="search-panel absolute right-0 top-[52px] z-50 w-[380px] overflow-hidden rounded-card border border-[#e5eeee] bg-white text-ink shadow-xl"
          >
            <button
              v-for="result in searchResults"
              :key="`${result.eyebrow}-${result.title}`"
              class="search-result-row block w-full border-b border-[#eef3f3] px-5 py-4 text-left transition last:border-b-0 hover:bg-mist"
              type="button"
              @mousedown.prevent="selectResult(result)"
            >
              <span class="section-kicker">{{ result.eyebrow }}</span>
              <span class="mt-1 block font-black">{{ result.title }}</span>
              <span v-if="result.description" class="mt-1 line-clamp-1 block text-sm font-semibold text-[#687572]">{{ result.description }}</span>
            </button>
            <div v-if="!searchResults.length" class="px-5 py-4 text-sm font-bold text-[#687572]">No results found.</div>
          </div>
        </form>
        <button class="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm" title="Toggle theme" type="button" @click="emit('toggle-theme')">
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>
      </div>

      <div class="flex items-center gap-3 lg:hidden">
        <button class="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm" title="Toggle theme" type="button" @click="emit('toggle-theme')">
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>
        <button class="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm" type="button" title="Menu" @click="open = !open">
        <X v-if="open" :size="22" />
        <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <div v-if="open" class="mx-5 rounded-card bg-white p-4 shadow-xl lg:hidden">
      <form class="search-shell mb-3 flex h-11 overflow-hidden rounded-full bg-mist" @submit.prevent="submitSearch">
        <label class="sr-only" for="mobile-search">Search</label>
        <input
          id="mobile-search"
          v-model="searchQuery"
          class="search-input min-w-0 flex-1 border-0 bg-transparent px-4 text-sm outline-none"
          placeholder="Search..."
          type="search"
          @input="searchOpen = true"
        >
        <button class="bg-accent px-4 text-white" title="Search" type="submit">
          <Search :size="18" />
        </button>
      </form>
      <div v-if="searchQuery" class="search-panel mb-3 overflow-hidden rounded-card border border-[#e5eeee]">
        <button
          v-for="result in searchResults"
          :key="`mobile-${result.eyebrow}-${result.title}`"
          class="search-result-row block w-full border-b border-[#eef3f3] px-4 py-3 text-left last:border-b-0"
          type="button"
          @click="selectResult(result)"
        >
          <span class="section-kicker">{{ result.eyebrow }}</span>
          <span class="block font-black text-ink">{{ result.title }}</span>
        </button>
        <div v-if="!searchResults.length" class="px-4 py-3 text-sm font-bold text-[#687572]">No results found.</div>
      </div>
      <a v-for="link in links" :key="link.href" :href="link.href" class="block rounded-md px-3 py-3 font-semibold" @click="open = false">{{ link.label }}</a>
    </div>
  </header>
</template>
