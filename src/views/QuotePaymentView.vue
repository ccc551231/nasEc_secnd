<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Calculator,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CreditCard,
  Edit3,
  Landmark,
  Lock,
  Shield,
  ShieldCheck,
  Wallet,
} from 'lucide-vue-next';

const router = useRouter();
const activeStep = ref(5);
const isMobile = ref(false);
const paymentMethod = ref('credit_card');

const steps = [
  { id: 1, title: '保費試算', icon: Calculator, completed: true },
  { id: 2, title: '選擇保險內容', icon: Shield, completed: true },
  { id: 3, title: '資料輸入', icon: Edit3, completed: true },
  { id: 4, title: '資料確認', icon: ClipboardCheck, completed: true },
  { id: 5, title: '繳費', icon: CreditCard },
  { id: 6, title: '完成投保', icon: CheckCircle },
];

const progressWidth = computed(() => `${((activeStep.value - 1) / (steps.length - 1)) * 100}%`);

const paymentOptions = [
  {
    id: 'credit_card',
    icon: CreditCard,
    title: '信用卡線上刷卡',
    subtext: '支援各行各業發卡行',
    features: ['免手續費、讀卡機', '輸入卡號及安全碼即可', '支援 VISA/MasterCard/JCB'],
    recommended: false,
  },
  {
    id: 'bank',
    icon: Landmark,
    title: '輸入銀行帳號轉帳',
    subtext: '不需具備 VISA 功能之金融卡',
    features: ['免手續費、讀卡機', '直接輸入帳號完成扣款'],
    recommended: true,
  },
];

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="relative min-h-screen pt-10 md:pt-16">
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#145EAD] via-[#145EAD] to-[#0D427A]"></div>
      <div class="absolute top-[-20%] left-[-10%] h-[160%] w-[160%] -rotate-12 bg-white/[0.035] transform-gpu"></div>
      <div class="absolute right-[-20%] bottom-[-10%] h-[70%] w-[130%] rotate-6 bg-[#145EAD]/[0.1] blur-[120px] transform-gpu"></div>
      <div class="absolute top-1/3 left-[-25%] h-[550px] w-[220%] -rotate-[12deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-[100px]"></div>
      <div class="quote-dots absolute inset-0 opacity-60"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14)_0%,transparent_70%)]"></div>
    </div>

    <main class="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-40 md:px-6 lg:pb-20">
      <section class="w-full px-2 pt-2 pb-2 text-white md:px-0 md:pt-8 md:pb-4">
        <h1 class="mb-6 text-4xl font-black tracking-tight md:text-5xl">汽車保險</h1>
        <div class="max-w-4xl space-y-3 leading-relaxed opacity-90">
          <p class="text-sm font-medium md:text-base">
            本專案<span class="font-bold text-[#7FBF27]">暫不承接新車(無牌照號碼)/電動汽車</span>，若客戶有投保意願，請洽詢0800-020-060#2或親洽本公司全省服務櫃台辦理。
          </p>
          <p class="text-sm font-medium md:text-base">
            投保流程中需輸入車主及車籍相關資料，可以先備妥
            <span class="underline decoration-2 decoration-[#7FBF27] underline-offset-4">『車主行車執照』</span>
            ，以利快速輸入完成投保。
          </p>
        </div>
      </section>

      <div class="flex w-full flex-col gap-8 lg:flex-row">
        <div class="hidden w-48 shrink-0 self-start lg:block">
          <div class="sticky top-32 flex h-fit flex-col space-y-6 pt-5">
            <div
              v-for="step in steps"
              :key="step.id"
              :class="[
                'flex flex-col items-start space-y-1 transition-all duration-500',
                activeStep === step.id ? 'origin-left scale-105 opacity-100' : 'opacity-40',
              ]"
            >
              <div
                :class="[
                  'flex h-9 w-9 items-center justify-center rounded-xl transition-all',
                  activeStep >= step.id ? 'bg-[#7FBF27] text-white shadow-lg shadow-[#7FBF27]/20' : 'bg-white/10 text-white/50',
                ]"
              >
                <component :is="step.completed ? CheckCircle2 : step.icon" :size="18" />
              </div>
              <div class="space-y-0">
                <p class="text-[12px] font-bold tracking-[0.18em] text-white/55 uppercase">STEP {{ step.id }}</p>
                <h3 class="text-[16px] font-bold tracking-tight text-white">{{ step.title }}</h3>
                <div v-if="activeStep === step.id" class="mt-1 h-1 w-6 rounded-full bg-[#7FBF27]"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isMobile" class="mb-4 w-full lg:hidden">
          <div class="mb-3 flex items-center justify-between px-1">
            <div
              v-for="step in steps"
              :key="step.id"
              :class="['flex flex-col items-center', activeStep === step.id ? 'scale-110' : 'opacity-40']"
            >
              <div
                :class="[
                  'flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold',
                  activeStep >= step.id ? 'bg-[#7FBF27] text-white' : 'bg-white/10 text-white/40',
                ]"
              >
                {{ activeStep > step.id ? '✓' : step.id }}
              </div>
            </div>
          </div>
          <div class="h-1 overflow-hidden rounded-full bg-white/10">
            <div class="h-full bg-[#7FBF27] transition-all duration-700" :style="{ width: progressWidth }"></div>
          </div>
        </div>

        <div class="relative flex-1 overflow-hidden rounded-[24px] bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
          <div class="space-y-6 px-8 pt-12 pb-10 lg:px-12">
            <div class="flex flex-col justify-between gap-6 border-b border-slate-50 pb-8 md:flex-row md:items-start">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                  <Wallet :size="22" :stroke-width="2.5" />
                </div>
                <h2 class="text-xl font-black tracking-tight text-[#1b263b]">選擇繳費方式</h2>
              </div>

              <div class="flex items-center space-x-3 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <Clock class="shrink-0 text-[#F37021]" :size="20" />
                <p class="whitespace-nowrap text-xs font-bold leading-relaxed text-orange-800">
                  請於 <span class="font-black text-[#F37021]">30分鐘內</span> 完成繳費。
                </p>
              </div>
            </div>

            <div class="mb-4 flex items-center space-x-2 text-[#1469B6]/80">
              <Lock :size="14" />
              <p class="text-[16px] font-bold">本網站使用 SSL 安全金鑰加密機制。</p>
            </div>

            <div class="space-y-7">
              <article
                v-for="option in paymentOptions"
                :key="option.id"
                @click="paymentMethod = option.id"
                :class="[
                  'relative flex cursor-pointer flex-col justify-between gap-6 rounded-[24px] border-2 p-6 transition-all duration-300 md:flex-row md:items-center md:p-8',
                  paymentMethod === option.id
                    ? 'border-[#1469B6] bg-white shadow-[0_15px_40px_-10px_rgba(20,105,182,0.15)] ring-4 ring-[#1469B6]/5'
                    : 'border-slate-100 bg-slate-50/50 hover:border-slate-200',
                ]"
              >
                <div
                  v-if="option.recommended"
                  class="absolute -top-3 left-8 rounded-full bg-[#1469B6] px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase"
                >
                  推薦使用
                </div>

                <div class="flex items-center space-x-6">
                  <div
                    :class="[
                      'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors',
                      paymentMethod === option.id
                        ? 'bg-blue-50 text-[#1469B6]'
                        : 'border border-slate-100 bg-white text-slate-300',
                    ]"
                  >
                    <component :is="option.icon" :size="28" />
                  </div>
                  <div class="space-y-1">
                    <h4 :class="['text-lg font-black tracking-tight', paymentMethod === option.id ? 'text-slate-800' : 'text-slate-500']">
                      {{ option.title }}
                    </h4>
                    <p class="text-xs font-bold text-slate-400">{{ option.subtext }}</p>
                  </div>
                </div>

                <div class="hidden max-w-md flex-1 md:block">
                  <ul class="flex flex-wrap gap-x-6 gap-y-2">
                    <li v-for="feature in option.features" :key="feature" class="flex items-center space-x-2 text-[12px] font-bold text-slate-500">
                      <div :class="['h-1.5 w-1.5 rounded-full', paymentMethod === option.id ? 'bg-[#7FBF27]' : 'bg-slate-300']"></div>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>

                <div class="flex items-center justify-end">
                  <div
                    :class="[
                      'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                      paymentMethod === option.id
                        ? 'border-[#7FBF27] bg-[#7FBF27] shadow-lg shadow-[#7FBF27]/30'
                        : 'border-slate-200 bg-white',
                    ]"
                  >
                    <CheckCircle2 v-if="paymentMethod === option.id" :size="18" class="text-white" />
                  </div>
                </div>
              </article>
            </div>

          </div>

          <div class="mt-4 hidden items-center justify-center rounded-b-[24px] border-t border-slate-100 bg-slate-50/80 px-8 py-8 lg:flex lg:px-12">
            <div class="flex items-center gap-6">
              <button
                type="button"
                @click="router.push({ name: 'quote-flow-confirm' })"
                class="min-w-[168px] rounded-2xl border border-slate-200 bg-white px-10 py-5 text-sm font-black text-slate-400 transition-all hover:bg-slate-50 active:scale-95"
              >
                上一步
              </button>
              <button
                type="button"
                @click="router.push({ name: 'quote-flow-success' })"
                class="group inline-flex min-w-[232px] items-center justify-center rounded-2xl bg-[#7FBF27] px-12 py-5 text-lg font-black text-white transition-all hover:bg-[#7FBF27]/90 active:scale-95"
              >
                確認繳費
                <ChevronRight :size="22" class="ml-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>

    <div class="fixed right-0 bottom-0 left-0 z-[80] flex flex-col space-y-3 border-t border-slate-100 bg-white/95 p-4 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl lg:hidden">
      <div class="flex space-x-3">
        <button
          type="button"
          @click="router.push({ name: 'quote-flow-confirm' })"
          class="flex-1 rounded-xl border border-slate-200 py-4 text-sm font-bold text-slate-400"
        >
          上一步
        </button>
        <button type="button" @click="router.push({ name: 'quote-flow-success' })" class="flex flex-[2] items-center justify-center rounded-xl bg-[#7FBF27] py-4 text-base font-black text-white">
          確認繳費
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quote-dots {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1.8px, transparent 1.8px);
  background-size: 30px 30px;
}
</style>
