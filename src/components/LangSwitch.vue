<template>
  <div class="lang" role="group" aria-label="Language / Langue">
    <span class="lang__pill" :class="{ fr: locale === 'fr' }" aria-hidden="true"></span>
    <button v-for="l in ['en', 'fr']" :key="l" type="button" class="lang__btn" :class="{ on: locale === l }"
      :aria-pressed="locale === l" :lang="l" @click="setLocale(l)">{{ l.toUpperCase() }}</button>
  </div>
</template>

<script setup>
import { locale, setLocale } from '@/lib/i18n';
</script>

<style scoped>
.lang { position: relative; display: inline-flex; border: 1px solid currentColor; border-radius: 999px; padding: 2px; font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.08em; }
.lang__pill { position: absolute; top: 2px; left: 2px; width: calc(50% - 2px); height: calc(100% - 4px); border-radius: 999px; background: currentColor; transition: transform .5s var(--ease-out); }
.lang__pill.fr { transform: translateX(100%); }
.lang__btn { position: relative; z-index: 1; background: none; border: 0; padding: 4px 9px; min-width: 34px; transition: color .4s; }
.lang__btn.on { color: var(--lang-on, var(--ink)); }
</style>
