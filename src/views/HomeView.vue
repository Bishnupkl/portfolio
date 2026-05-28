<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import AboutSection from '../components/AboutSection.vue';
import BrandStrip from '../components/BrandStrip.vue';
import ContactSection from '../components/ContactSection.vue';
import ExperienceSection from '../components/ExperienceSection.vue';
import HeroSection from '../components/HeroSection.vue';
import Navbar from '../components/Navbar.vue';
import ProcessSection from '../components/ProcessSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
import ServicesSection from '../components/ServicesSection.vue';
import SiteFooter from '../components/SiteFooter.vue';
import SkillsSection from '../components/SkillsSection.vue';
import StatsStrip from '../components/StatsStrip.vue';
import TestimonialSection from '../components/TestimonialSection.vue';
import TimelineSection from '../components/TimelineSection.vue';
import { usePortfolioStore } from '../stores/portfolio';

const store = usePortfolioStore();
const { profile, skills, services, projects, testimonials, settings, loading, loadError } = storeToRefs(store);
const isDark = ref(false);
const hasContent = computed(() => Boolean(profile.value?.full_name));

function toggleTheme() {
  isDark.value = !isDark.value;
}

onMounted(() => {
  store.load();
  isDark.value = localStorage.getItem('portfolio-theme') === 'dark';
});

watch(isDark, (value) => {
  localStorage.setItem('portfolio-theme', value ? 'dark' : 'light');
});
</script>

<template>
  <div :class="{ dark: isDark }">
    <Navbar :is-dark="isDark" :logo="settings.site_logo" @toggle-theme="toggleTheme" />
    <main v-if="loading" class="grid min-h-screen place-items-center bg-mist px-5 pt-28 text-center">
      <div>
        <p class="section-kicker mb-3">Loading</p>
        <h1 class="text-4xl font-black text-ink">Loading portfolio from API...</h1>
      </div>
    </main>
    <main v-else-if="loadError || !hasContent" class="grid min-h-screen place-items-center bg-mist px-5 pt-28 text-center">
      <div class="max-w-2xl rounded-card bg-white p-8 shadow-sm">
        <p class="section-kicker mb-3">API Required</p>
        <h1 class="mb-4 text-4xl font-black text-ink">Portfolio API is not returning content</h1>
        <p class="mb-6 leading-8 text-[#3f4c49]">
          Start the Laravel backend, run migrations and seeders, then refresh this page.
        </p>
        <pre class="overflow-auto rounded-card bg-ink p-5 text-left text-sm text-white">cd /var/www/html/projects/portfolio/portfolio-backend
php artisan migrate --seed
php artisan serve --host=127.0.0.1 --port=8010</pre>
      </div>
    </main>
    <template v-else>
      <HeroSection :highlights="settings.hero_highlights" :profile="profile" :typing-titles="settings.typing_titles" />
      <BrandStrip v-reveal :companies="settings.brand_companies" />
      <StatsStrip :stats="settings.portfolio_stats" />
      <ExperienceSection
        v-reveal
        :companies="settings.experience_companies"
        :experience-heading="settings.experience_heading"
        :experience-highlights="settings.experience_highlights"
        :experience-years="settings.experience_years"
      />
      <TimelineSection :education="settings.education_items" :experiences="settings.professional_experiences" />
      <AboutSection v-reveal :profile="profile" />
      <SkillsSection v-reveal :skills="skills" />
      <ServicesSection v-reveal :services="services" />
      <ProcessSection :steps="settings.work_process" />
      <ProjectsSection v-reveal :projects="projects" />
      <TestimonialSection v-reveal :testimonials="testimonials" />
      <ContactSection v-reveal :profile="profile" />
    </template>
    <SiteFooter :settings="settings" />
  </div>
</template>
