<template>
  <div>
    <headerVue/>
    <heroVue id="home"/>
    <skilles id="skills"/>
    <experience id="experience"/>
    <aboutMe id="about"/>
    <projects id="projects"/>
    <contactMe id="contact"/>
    <footervue/>
  </div>
</template>

<script setup>
import headerVue from "./components/Helper/header.vue";
import heroVue from "./components/pages/hero.vue";
import skilles from "./components/pages/skilles.vue";
import experience from "./components/pages/experience.vue";
import aboutMe from "./components/pages/aboutMe.vue";
import projects from "./components/pages/projects.vue";
import contactMe from "./components/pages/contactMe.vue";
import footervue from "./components/Helper/footer.vue";
</script>
