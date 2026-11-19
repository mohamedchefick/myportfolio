<template>
  <section ref="root" class="ct" data-theme="light" data-rise>
    <div class="wrap">
      <div class="ct__head">
        <span class="label">{{ t('ct.label') }}</span>
        <span class="label">{{ t('ct.sub') }}</span>
      </div>

      <h2 class="ct__title f-display">
        <span class="line-mask"><span>{{ t('ct.t1') }}</span></span>
        <span class="line-mask"><span>{{ t('ct.t2') }}</span></span>
        <span class="line-mask"><span><em class="f-serif">{{ t('ct.t3') }}</em></span></span>
      </h2>

      <div class="ct__grid">
        <div class="ct__side">
          <p class="ct__pitch">{{ t('ct.pitch') }}</p>
          <a :href="`mailto:${EMAIL}`" class="ct__mail" data-cursor="✉">
            <span class="label">{{ t('ct.email') }}</span>
            <span class="ct__mail-addr">{{ EMAIL }}</span>
          </a>
          <button type="button" class="ct__copy label" @click="copy">{{ copied ? t('ct.copied') : t('ct.copy') }}</button>
          <ul class="ct__socials">
            <li v-for="s in socials" :key="s.name">
              <a :href="s.url" target="_blank" rel="noopener" class="u-link">{{ s.name }} ↗</a>
            </li>
          </ul>
        </div>

        <form class="form" novalidate @submit.prevent="submit">
          <div class="form__row">
            <label class="field">
              <span class="label">{{ t('ct.name') }}</span>
              <input v-model.trim="form.name" type="text" autocomplete="name" :placeholder="t('ct.namePh')" />
              <small v-if="errors.name">{{ errors.name }}</small>
            </label>
            <label class="field">
              <span class="label">{{ t('ct.email') }}</span>
              <input v-model.trim="form.email" type="email" autocomplete="email" :placeholder="t('ct.emailPh')" />
              <small v-if="errors.email">{{ errors.email }}</small>
            </label>
          </div>
          <label class="field">
            <span class="label">{{ t('ct.website') }} <i>{{ t('ct.optional') }}</i></span>
            <input v-model.trim="form.website" type="text" inputmode="url" placeholder="https://" />
            <small v-if="errors.website">{{ errors.website }}</small>
          </label>
          <label class="field">
            <span class="label">{{ t('ct.project') }}</span>
            <textarea v-model.trim="form.description" rows="4" :placeholder="t('ct.projectPh')"></textarea>
            <small v-if="errors.description">{{ errors.description }}</small>
          </label>

          <div class="form__foot">
            <p class="form__note">{{ t('ct.note') }}</p>
            <button ref="send" type="submit" class="send" :disabled="sending" :data-cursor="t('ct.send')">
              <span class="send__label">{{ sending ? t('ct.sending') : t('ct.send') }}</span>
              <span class="send__arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { toast } from 'vue3-toastify';
import { EMAIL, socials } from '@/data/content';
import { t } from '@/lib/i18n';
import { gsap, isTouch, prefersReducedMotion } from '@/lib/motion';

const root = ref(null);
const send = ref(null);
const sending = ref(false);
const copied = ref(false);
const form = reactive({ name: '', email: '', website: '', description: '' });
const errors = reactive({});
let ctx, cleanup;

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (!form.name) errors.name = t('ct.errName');
  if (!form.email) errors.email = t('ct.errEmail');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('ct.errEmailBad');
  if (form.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})([/\w .-]*)*\/?$/i.test(form.website)) errors.website = t('ct.errUrl');
  if (!form.description) errors.description = t('ct.errDesc');
  return Object.keys(errors).length === 0;
}

async function submit() {
  if (!validate() || sending.value) return;
  sending.value = true;
  try {
    // Firebase is only downloaded when someone actually sends a message
    const [{ db }, { collection, addDoc }] = await Promise.all([
      import('@/Config/firebaseConfig'),
      import('firebase/firestore'),
    ]);
    await addDoc(collection(db, 'Client'), { ...form, timestamp: new Date() });
    toast.success(t('ct.ok'));
    Object.assign(form, { name: '', email: '', website: '', description: '' });
  } catch (e) {
    toast.error(`${t('ct.fail')} ${e.message}`);
  } finally {
    sending.value = false;
  }
}

async function copy() {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
  } catch { /* clipboard blocked: the mailto link still works */ }
}

onMounted(() => {
  const q = gsap.utils.selector(root.value);
  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;
    gsap.from(q('.ct__title .line-mask > span'), { yPercent: 110, duration: 1.4, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: q('.ct__title')[0], start: 'top 82%' } });
    gsap.from(q('.ct__side > *, .field, .form__foot'), { y: 36, opacity: 0, duration: 1.1, stagger: 0.06, ease: 'expo.out', scrollTrigger: { trigger: q('.ct__grid')[0], start: 'top 82%' } });
  }, root.value);

  // Magnetic send button
  if (!isTouch && !prefersReducedMotion) {
    const el = send.value;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    cleanup = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }
});

onBeforeUnmount(() => { ctx?.revert(); cleanup?.(); });
</script>

<style scoped>
.ct { background: var(--cyan); color: var(--ink); padding: clamp(96px, 12vw, 180px) 0 clamp(80px, 10vw, 140px); }
.ct__head { display: flex; justify-content: space-between; border-top: 1px solid rgba(10,10,10,.25); padding-top: 14px; }
.ct__title { margin: clamp(28px, 4vw, 56px) 0 clamp(56px, 8vw, 110px); font-size: clamp(54px, 11vw, 196px); font-weight: 600; line-height: 0.88; letter-spacing: -0.05em; }
.ct__title em { font-weight: 400; font-size: 1.05em; }

.ct__grid { display: grid; gap: 56px; }
.ct__side { display: flex; flex-direction: column; gap: 22px; align-items: flex-start; }
.ct__pitch { font-size: clamp(18px, 1.5vw, 22px); line-height: 1.45; max-width: 36ch; font-weight: 500; }
.ct__mail { display: flex; flex-direction: column; gap: 6px; padding-top: 8px; max-width: 100%; }
.ct__mail-addr { font-family: var(--f-display); font-size: clamp(16px, 4.3vw, 32px); font-weight: 500; letter-spacing: -0.02em; overflow-wrap: anywhere; border-bottom: 2px solid var(--ink); padding-bottom: 4px; }
.ct__copy { background: none; border: 1px solid rgba(10,10,10,.35); padding: 8px 12px; transition: background .3s, color .3s; }
.ct__copy:hover { background: var(--ink); color: var(--cyan); }
.ct__socials { display: flex; flex-wrap: wrap; gap: 8px 22px; list-style: none; padding: 0; margin: 10px 0 0; font-weight: 500; }

.form { display: flex; flex-direction: column; gap: 26px; }
.form__row { display: grid; gap: 26px; }
.field { display: flex; flex-direction: column; gap: 8px; }
.field .label i { font-style: normal; opacity: 0.55; text-transform: none; letter-spacing: 0; }
.field input, .field textarea {
  background: transparent; border: 0; border-bottom: 1.5px solid rgba(10,10,10,.35); border-radius: 0;
  padding: 8px 0 12px; font-size: clamp(18px, 1.5vw, 22px); font-family: var(--f-body); color: var(--ink); font-weight: 500;
  outline: none; resize: none; transition: border-color .3s;
}
.field input::placeholder, .field textarea::placeholder { color: rgba(10,10,10,.38); }
.field input:focus, .field textarea:focus { border-bottom-color: var(--ink); }
.field small { font-family: var(--f-mono); font-size: 11px; color: #8a0012; }

.form__foot { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-top: 8px; }
.form__note { font-size: 14px; max-width: 24ch; opacity: 0.7; }
.send {
  width: clamp(120px, 11vw, 160px); aspect-ratio: 1; border-radius: 50%; flex-shrink: 0;
  background: var(--ink); color: var(--cyan); border: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  font-family: var(--f-display); font-size: 20px; font-weight: 500;
  transition: background .3s, color .3s;
}
.send:hover { background: var(--white); color: var(--ink); }
.send:disabled { opacity: 0.6; }
.send__arrow { transition: transform .5s var(--ease-out); }
.send:hover .send__arrow { transform: translateX(6px); }

@media (min-width: 768px) { .form__row { grid-template-columns: 1fr 1fr; gap: 24px; } }
@media (min-width: 1024px) {
  .ct__mail-addr { font-size: clamp(16px, 1.42vw, 26px); overflow-wrap: normal; white-space: nowrap; }
  .ct__grid { grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: 20px; }
  .ct__side { grid-column: 1 / span 4; }
  .form { grid-column: 6 / span 7; }
}
</style>
