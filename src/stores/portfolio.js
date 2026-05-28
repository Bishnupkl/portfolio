import { defineStore } from 'pinia';
import api from '../services/api';
import { fallbackData } from '../data';

const jsonSettingKeys = [
  'brand_companies',
  'experience_companies',
  'experience_highlights',
  'education_items',
  'hero_highlights',
  'portfolio_stats',
  'professional_experiences',
  'typing_titles',
  'work_process',
];

function parseSettings(settings = {}) {
  const parsed = { ...settings };

  jsonSettingKeys.forEach((key) => {
    if (!(key in parsed)) {
      return;
    }

    if (Array.isArray(parsed[key])) {
      return;
    }

    if (typeof parsed[key] !== 'string' || parsed[key].trim() === '') {
      delete parsed[key];
      return;
    }

    try {
      parsed[key] = JSON.parse(parsed[key]);
    } catch {
      delete parsed[key];
    }
  });

  return parsed;
}

function isGenericProjectImage(imageUrl = '') {
  return imageUrl.includes('images.unsplash.com/photo-1461749280684-dccba630e2f6')
    || imageUrl.includes('s.wordpress.com/mshots');
}

function mergeListWithFallback(apiItems = [], fallbackItems = [], fallbackKey, options = {}) {
  if (!apiItems.length) {
    return fallbackItems;
  }

  const mergedItems = apiItems.map((item, index) => {
    const fallback = fallbackItems.find((fallbackItem) => fallbackKey && fallbackItem[fallbackKey] === item[fallbackKey]) || fallbackItems[index] || {};
    const imageUrl = options.preferProjectFallbackImage && fallback.image_url && isGenericProjectImage(item.image_url || '')
      ? fallback.image_url
      : item.image_url || fallback.image_url;

    return {
      ...fallback,
      ...item,
      image_url: imageUrl,
      client_image_url: item.client_image_url || fallback.client_image_url,
    };
  });

  if (!fallbackKey) {
    return mergedItems;
  }

  const apiKeys = new Set(apiItems.map((item) => item[fallbackKey]));
  const missingFallbackItems = fallbackItems.filter((item) => !apiKeys.has(item[fallbackKey]));

  return [...mergedItems, ...missingFallbackItems];
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    profile: fallbackData.profile,
    skills: fallbackData.skills,
    services: fallbackData.services,
    projects: fallbackData.projects,
    testimonials: fallbackData.testimonials,
    settings: fallbackData.settings,
    loading: false,
    loadError: '',
    contactStatus: '',
  }),
  actions: {
    async load() {
      this.loading = true;
      this.loadError = '';

      try {
        const [profile, skills, services, projects, testimonials, settings] = await Promise.all([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/services'),
          api.get('/projects'),
          api.get('/testimonials'),
          api.get('/settings'),
        ]);

        this.profile = profile.data || fallbackData.profile;
        this.skills = skills.data?.length ? skills.data : fallbackData.skills;
        this.services = services.data?.length ? services.data : fallbackData.services;
        this.projects = mergeListWithFallback(projects.data || [], fallbackData.projects, 'slug', { preferProjectFallbackImage: true });
        this.testimonials = mergeListWithFallback(testimonials.data || [], fallbackData.testimonials, 'client_name');
        this.settings = { ...fallbackData.settings, ...parseSettings(settings.data || {}) };
      } catch {
        this.loadError = 'Portfolio API is not available.';
        this.profile = fallbackData.profile;
        this.skills = fallbackData.skills;
        this.services = fallbackData.services;
        this.projects = fallbackData.projects;
        this.testimonials = fallbackData.testimonials;
        this.settings = fallbackData.settings;
      } finally {
        this.loading = false;
      }
    },
    async sendMessage(payload) {
      this.contactStatus = '';
      await api.post('/contact', payload);
      this.contactStatus = 'Message sent successfully.';
    },
  },
});
