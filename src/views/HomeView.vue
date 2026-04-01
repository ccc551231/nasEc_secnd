<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowRight, Bike, Car, ChevronLeft, ChevronRight, ClipboardList, FileText, PhoneCall, Plane, Sparkles } from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';
import cardIllustration1 from '../assets/card-illustration-1.svg';
import cardIllustration2 from '../assets/card-illustration-2.svg';
import cardIllustration3 from '../assets/card-illustration-3.svg';
import footerBgcCustom from '../assets/footer-bgc-custom.svg';
import homeCar from '../assets/home-car.png';
import headerWave from '../assets/header-wave.svg';
import servicePerson from '../assets/service-person.png';
import serviceIcon1 from '../assets/service-icon-1.png';
import serviceIcon2 from '../assets/service-icon-2.png';
import serviceIcon3 from '../assets/service-icon-3.png';
import serviceIcon4 from '../assets/service-icon-4.png';

const featureTabs = [
  {
    key: 'travel',
    label: '旅遊保險',
    icon: Plane,
    title: '旅遊保險',
    subtitle: '查看更多方案 >',
    stats: [
      { label: '投保天數最長', value: '180', unit: '天' },
      { label: '旅程更改最高理賠', value: '3', unit: '萬' },
      { label: '旅程取消最高理賠', value: '6', unit: '萬' },
    ],
    ctaLabel: '我要投保',
    renewLabel: '我要續保',
    routeName: 'quote-flow-renewal',
  },
  {
    key: 'car',
    label: '汽車保險',
    icon: Car,
    title: '汽車保險',
    subtitle: '查看更多方案 >',
    stats: [
      { label: '任意險最低保費', value: '330', unit: '元' },
      { label: '線上投保最快', value: '3', unit: '步' },
      { label: '熱門方案', value: '8', unit: '款' },
    ],
    ctaLabel: '我要投保',
    renewLabel: '我要續保',
    routeName: 'quote-flow-renewal',
  },
  {
    key: 'scooter',
    label: '機車保險',
    icon: Bike,
    title: '機車保險',
    subtitle: '查看更多方案 >',
    stats: [
      { label: '強制險最低保費', value: '215', unit: '元' },
      { label: '線上投保最快', value: '3', unit: '步' },
      { label: '熱門方案', value: '5', unit: '款' },
    ],
    ctaLabel: '我要投保',
    renewLabel: '我要續保',
    routeName: 'quote-flow-renewal',
  },
  {
    key: 'electric',
    label: '電動機車險',
    icon: null,
    title: '電動機車險',
    subtitle: '查看更多方案 >',
    stats: [
      { label: '任意險最低保費', value: '215', unit: '元' },
      { label: '線上投保最快', value: '3', unit: '步' },
      { label: '熱門方案', value: '6', unit: '款' },
    ],
    ctaLabel: '我要投保',
    renewLabel: '我要續保',
    routeName: 'quote-flow-renewal',
  },
];

const activeFeatureTab = ref('electric');
const activeServiceTab = ref('product');
const pageRoot = ref(null);
const router = useRouter();
let revealObserver;

const policyCards = [
  {
    title: '汽車保險',
    price: 'NT$330',
    highlight: '最高折扣',
    benefits: ['上述為強制險最高折扣優惠', '投保任意險享85折優惠'],
    illustration: cardIllustration2,
    illustrationClass: 'h-32',
  },
  {
    title: '旅遊保險',
    price: 'NT$216',
    highlight: '輕鬆出發',
    benefits: ['海外旅平、不便與突發疾病一次補足', '最晚出發前 1 小時也能完成投保'],
    illustration: cardIllustration1,
    illustrationClass: 'h-32',
  },
  {
    title: '電動機車保險',
    price: 'NT$215',
    highlight: '熱門方案',
    benefits: ['強制加任意險線上快速試算', '多種方案自由搭配，通勤更安心'],
    illustration: cardIllustration3,
    illustrationClass: 'h-45',
  },
];

const serviceCards = [
  { title: '汽車險', desc: '提供甲乙丙式、強制險與車主常用方案。', icon: serviceIcon1 },
  { title: '機車險', desc: '含強制險、第三責任與駕駛人傷害。', icon: serviceIcon2 },
  { title: '旅遊險專區', desc: '旅平、不便、突發疾病一次整理。', icon: serviceIcon3 },
  { title: '居家綜合險', desc: '居家財損、責任與事故支援服務。', icon: serviceIcon4 },
];

onMounted(() => {
  if (!pageRoot.value) return;

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          return;
        }

        entry.target.classList.remove('is-visible');
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  pageRoot.value.querySelectorAll('[data-reveal]').forEach((element) => {
    revealObserver.observe(element);
  });
});

onBeforeUnmount(() => {
  revealObserver?.disconnect();
});

</script>

<template>
  <main ref="pageRoot" class="overflow-hidden bg-white">
    <section class="relative isolate overflow-hidden px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-[40px]">
      <img
        :src="headerWave"
        alt=""
        class="pointer-events-none absolute bottom-0 left-1/2 w-[120vw] min-w-[1680px] max-w-none -translate-x-1/2"
      />

      <div class="relative mx-auto max-w-7xl">
        <div class="grid items-end gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
          <div class="max-w-md pt-2 sm:pt-6 lg:pb-24" data-reveal style="--reveal-delay: 80ms">
            <h1 class="text-[38px] leading-[1.02] font-black tracking-tight text-[#0054A6] sm:text-5xl md:text-6xl">
              e騎守護
              <br />
              點動機車專區
            </h1>
            <p class="mt-4 max-w-sm text-[15px] leading-7 font-medium text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              強制＋任意險，再享最高省215元。
              <br />
              加保超簡單在幾步直接下單。
            </p>
          </div>

          <div class="relative mx-auto -mt-1 flex w-full max-w-[900px] justify-center lg:mt-0 lg:justify-end" data-reveal style="--reveal-delay: 160ms">
            <img
              :src="homeCar"
              alt="首頁汽車插圖"
              class="relative z-10 w-full max-w-[760px] object-contain sm:max-w-[860px] lg:max-w-[900px] lg:translate-y-[8px]"
            />
          </div>
        </div>

        <div class="relative z-20 -mt-2 w-full rounded-[20px] border border-[#d9e7f5] bg-white px-4 py-4 shadow-[0_16px_32px_rgba(15,23,42,0.12)] sm:px-8 sm:py-5 md:px-14 md:py-6 lg:-mt-6 lg:px-16" data-reveal style="--reveal-delay: 220ms">
          <div class="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 text-sm font-bold sm:flex-wrap sm:overflow-visible sm:gap-5 sm:px-0">
            <button
              v-for="tab in featureTabs"
              :key="tab.key"
              type="button"
              @click="activeFeatureTab = tab.key"
              :class="[
                'flex shrink-0 items-center gap-2 rounded-full px-4 py-2 transition-colors',
                activeFeatureTab === tab.key
                  ? 'bg-[#0054A6] text-white'
                  : 'border border-[#0054A6] text-[#0054A6]',
              ]"
            >
              <component
                v-if="tab.icon"
                :is="tab.icon"
                :size="14"
              />
              <span v-else class="text-base leading-none">+</span>
              {{ tab.label }}
            </button>
          </div>

          <div class="mt-4 h-px w-full bg-[#d8e3f0]"></div>

          <div class="mt-5 grid gap-4 md:mt-6 md:grid-cols-[1.3fr_repeat(3,0.82fr)_1fr] md:items-center md:gap-6">
            <RouterLink :to="{ name: 'travel-insurance' }" class="block rounded-[18px] bg-[#f6fbff] px-4 py-5 sm:bg-transparent sm:px-0 sm:py-0">
              <p class="text-[34px] leading-none font-black tracking-tight text-[#0054A6] sm:text-[46px]">
                {{ featureTabs.find((tab) => tab.key === activeFeatureTab)?.title }}
              </p>
              <p class="mt-2 text-[15px] font-medium text-slate-400 transition-colors hover:text-[#0054A6] sm:mt-3 sm:text-base">
                {{ featureTabs.find((tab) => tab.key === activeFeatureTab)?.subtitle }}
              </p>
            </RouterLink>
            <div
              v-for="stat in featureTabs.find((tab) => tab.key === activeFeatureTab)?.stats"
              :key="stat.label"
              class="rounded-[18px] border border-[#e7eff8] bg-white px-4 py-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
            >
              <p class="text-[13px] font-bold text-slate-400 sm:text-sm">{{ stat.label }}</p>
              <p class="mt-2 text-[42px] leading-none font-black text-[#0054A6] sm:text-[62px]">
                {{ stat.value }}<span class="ml-1 text-[22px] sm:text-[28px]">{{ stat.unit }}</span>
              </p>
            </div>
            <div class="md:flex md:justify-end">
              <div class="grid w-full grid-cols-2 gap-3 md:flex md:w-auto md:min-w-[180px] md:flex-col">
                <RouterLink
                  :to="{ name: featureTabs.find((tab) => tab.key === activeFeatureTab)?.routeName || 'home' }"
                  class="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-[#8cc63f] px-4 text-[15px] font-black !text-white transition-all hover:-translate-y-0.5 sm:h-13 sm:px-8 sm:text-[16px]"
                >
                  {{ featureTabs.find((tab) => tab.key === activeFeatureTab)?.renewLabel }}
                  <ArrowRight :size="16" />
                </RouterLink>
                <RouterLink
                  :to="{ name: 'quote-flow' }"
                  class="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-[#0054A6] px-4 text-[15px] font-black !text-white transition-all hover:-translate-y-0.5 sm:h-13 sm:px-8 sm:text-[16px]"
                >
                  {{ featureTabs.find((tab) => tab.key === activeFeatureTab)?.ctaLabel }}
                  <ArrowRight :size="16" />
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-14 sm:px-6 sm:py-22">
      <div class="mx-auto max-w-[1320px]">
        <div class="grid items-center gap-4 md:grid-cols-[56px_minmax(0,1fr)_56px] md:gap-6">
          <button class="hidden h-10 w-10 items-center justify-center justify-self-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-[#0054A6] hover:text-white active:bg-[#0054A6] active:text-white md:flex">
            <ChevronLeft :size="18" />
          </button>

          <div class="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          <article
            v-for="card in policyCards"
            :key="card.title"
            class="group relative min-w-[294px] snap-center overflow-hidden rounded-[24px] border border-[#e6eef7] bg-white px-6 pt-6 pb-34 shadow-[0_16px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(179,198,216,0.9)] md:min-w-0 md:px-8 md:pt-7 md:pb-40"
            data-reveal
            :style="{ '--reveal-delay': `${120 + policyCards.indexOf(card) * 90}ms` }"
          >
            <div
              class="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(180deg,#D0E9F5_0%,#FFFFFF_100%)]"
              style="clip-path: polygon(0 48%, 100% 8%, 100% 100%, 0 100%);"
            ></div>
            <img
              :src="card.illustration"
              :alt="`${card.title}插圖`"
              :class="['pointer-events-none absolute right-3 bottom-3 z-0 w-auto object-contain', card.illustrationClass]"
            />
            <div class="relative z-10">
              <p class="text-center text-[22px] font-black text-slate-900 md:text-[24px]">{{ card.title }}</p>
              <div class="mt-6 flex items-end justify-center gap-2 md:mt-8 md:gap-3">
                <p class="text-[36px] leading-none font-black tracking-tight text-[#0054A6] md:text-[40px]">{{ card.price }}</p>
                <p class="mb-1 text-[16px] font-bold text-slate-400 md:mb-2 md:text-[18px]">{{ card.highlight }}</p>
              </div>

              <div class="mt-6 space-y-4 md:mt-8 md:space-y-5">
                <div
                  v-for="benefit in card.benefits"
                  :key="benefit"
                  class="flex items-start gap-3 text-[15px] leading-7 font-normal text-slate-500 md:items-center md:gap-4 md:text-[16px]"
                >
                  <span class="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#8cd220] text-[#8cd220]">
                    <span class="text-xs leading-none">✓</span>
                  </span>
                  <span>{{ benefit }}</span>
                </div>
              </div>

              <RouterLink
                :to="{ name: 'quote-flow' }"
                class="group mt-6 inline-flex items-center pl-1 text-[18px] font-black !text-[#0054A6] transition-all hover:translate-x-1 md:mt-8 md:pl-3"
              >
                我要投保
                <span class="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </RouterLink>
            </div>
          </article>
          </div>

          <button class="hidden h-10 w-10 items-center justify-center justify-self-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-[#0054A6] hover:text-white active:bg-[#0054A6] active:text-white md:flex">
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f9ff_100%)] px-4 pt-12 pb-16 sm:px-6 sm:pb-20">
      <img
        :src="footerBgcCustom"
        alt=""
        class="pointer-events-none absolute bottom-0 left-1/2 w-[120vw] min-w-[1680px] max-w-none -translate-x-1/2"
      />
      <div class="relative mx-auto max-w-6xl">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-[32px] font-black text-slate-900 sm:text-4xl">我想了解 ...</h2>
            <p class="mt-3 max-w-md text-[15px] leading-7 font-medium text-slate-500 sm:text-sm sm:leading-normal">選擇您感興趣的保障方案，讓我們為您提供最專業的服務</p>
          </div>
          <div class="grid grid-cols-2 overflow-hidden rounded-[18px] border border-[#d8e2ee] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:inline-flex sm:rounded-full">
            <button
              type="button"
              @click="activeServiceTab = 'product'"
              :class="[
                'flex items-center justify-center gap-2 px-4 py-4 text-[15px] font-black transition-colors sm:gap-3 sm:px-8 sm:text-[18px]',
                activeServiceTab === 'product' ? 'bg-[#0052A6] text-white' : 'text-slate-500',
              ]"
            >
              <FileText :class="['h-5 w-5 sm:h-6 sm:w-6', activeServiceTab === 'product' ? 'text-white' : 'text-slate-400']" />
              投保進度
            </button>
            <button
              type="button"
              @click="activeServiceTab = 'service'"
              :class="[
                'flex items-center justify-center gap-2 px-4 py-4 text-[15px] font-black transition-colors sm:gap-3 sm:px-8 sm:text-[18px]',
                activeServiceTab === 'service' ? 'bg-[#0052A6] text-white' : 'text-slate-500',
              ]"
            >
              <PhoneCall :class="['h-5 w-5 sm:h-6 sm:w-6', activeServiceTab === 'service' ? 'text-white' : 'text-slate-400']" />
              投保服務
            </button>
          </div>
        </div>

        <div class="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[380px_1fr]">
          <div class="relative hidden min-h-[360px] items-end justify-center lg:flex" data-reveal style="--reveal-delay: 90ms">
            <img
              :src="servicePerson"
              alt="服務區人物插圖"
              class="w-full max-w-[400px] object-contain"
            />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="card in serviceCards"
              :key="card.title"
              class="group cursor-pointer rounded-[20px] border border-[#e3edf8] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 sm:p-6"
              @click="router.push({ name: 'travel-insurance' })"
              data-reveal
              :style="{ '--reveal-delay': `${140 + serviceCards.indexOf(card) * 90}ms` }"
            >
              <div class="flex items-start justify-between">
                <img :src="card.icon" :alt="`${card.title}圖示`" class="h-16 w-16 object-contain sm:h-18 sm:w-18" />
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-[#0054A6] group-hover:text-white">
                  <ChevronRight :size="16" />
                </div>
              </div>
              <h3 class="mt-4 text-[28px] font-black text-slate-900 sm:mt-5 sm:text-2xl">{{ card.title }}</h3>
              <p class="mt-2 text-[15px] leading-7 text-slate-500 sm:text-sm">{{ card.desc }}</p>
            </article>
          </div>
        </div>

      </div>

    </section>
  </main>
</template>
