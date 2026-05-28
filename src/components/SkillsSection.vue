<script setup>
import { computed } from 'vue';

const props = defineProps({
  skills: {
    type: Array,
    required: true,
  },
});

const groupedSkills = computed(() => {
  return props.skills.reduce((groups, skill) => {
    const category = skill.category || 'General';
    groups[category] = groups[category] || [];
    groups[category].push(skill);
    return groups;
  }, {});
});
</script>

<template>
  <section id="skills" class="bg-white py-24">
    <div class="mx-auto max-w-page px-5 lg:px-0">
      <div class="mb-16 text-center">
        <p class="section-kicker mb-3">My Skills</p>
        <h2 class="text-4xl font-black lg:text-5xl">My Expertise Area</h2>
      </div>
      <div class="grid gap-7 lg:grid-cols-3">
        <article v-for="(items, category) in groupedSkills" :key="category" class="motion-card rounded-card border border-[#e5eeee] bg-white p-7">
          <h3 class="mb-6 text-2xl font-black text-ink">{{ category }}</h3>
          <div class="grid gap-6">
            <div v-for="skill in items" :key="skill.name">
              <div class="mb-2 flex justify-between text-base font-bold">
                <span>{{ skill.name }}</span>
                <span>{{ skill.percentage }}%</span>
              </div>
              <div class="h-2 overflow-hidden rounded-full bg-[#edf1f1]">
                <div class="skill-bar h-2 rounded-full bg-gradient-to-r from-[#0ca4d9] via-[#41e6da] to-accent" :style="{ '--skill-width': `${skill.percentage}%` }"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-bar {
  width: 0;
  animation: fillSkill 1.2s ease forwards;
}

@keyframes fillSkill {
  to {
    width: var(--skill-width);
  }
}
</style>
