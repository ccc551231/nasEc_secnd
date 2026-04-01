<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  ArrowLeft,
  Calculator,
  CheckCircle,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  CreditCard,
  Download,
  Edit3,
  ExternalLink,
  FileCheck2,
  Mail,
  MessageCircle,
  Shield,
} from 'lucide-vue-next';

const router = useRouter();
const activeStep = ref(6);
const isMobile = ref(false);

const steps = [
  { id: 1, title: '保費試算', icon: Calculator, completed: true },
  { id: 2, title: '選擇保險內容', icon: Shield, completed: true },
  { id: 3, title: '資料輸入', icon: Edit3, completed: true },
  { id: 4, title: '資料確認', icon: ClipboardCheck, completed: true },
  { id: 5, title: '繳費', icon: CreditCard, completed: true },
  { id: 6, title: '完成投保', icon: CheckCircle },
];

const progressWidth = computed(() => `${((activeStep.value - 1) / (steps.length - 1)) * 100}%`);

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
  <div class="success-page relative min-h-screen pt-10 md:pt-16">
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#145EAD] via-[#145EAD] to-[#0D427A]"></div>
      <div class="absolute top-[-20%] left-[-10%] h-[160%] w-[160%] -rotate-12 bg-white/[0.05] transform-gpu"></div>
      <div class="absolute right-[-20%] bottom-[-10%] h-[70%] w-[130%] rotate-6 bg-[#1b7ed6]/[0.12] blur-[120px] transform-gpu"></div>
      <div class="absolute top-1/3 left-[-25%] h-[550px] w-[220%] -rotate-[12deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-[100px]"></div>
      <div class="success-dots absolute inset-0 opacity-80"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18)_0%,transparent_70%)]"></div>
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

        <div class="flex flex-1 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
          <div class="flex flex-col items-center px-8 pt-8 pb-6 md:px-12 md:pt-12 md:pb-6 lg:px-16 lg:pt-16 lg:pb-6">
          <div class="relative mb-6 flex h-32 w-32 items-center justify-center">
            <div class="pulse-ring pulse-ring-outer absolute h-full w-full rounded-full bg-[#7FBF27]/20"></div>
            <div class="pulse-ring pulse-ring-middle absolute h-full w-full rounded-full bg-[#7FBF27]/30"></div>
            <div class="pulse-ring pulse-ring-inner absolute h-full w-full rounded-full bg-[#7FBF27]/40"></div>
            <div class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#7FBF27] text-white shadow-2xl shadow-[#7FBF27]/40 md:h-20 md:w-20">
              <CheckCircle2 :size="40" :stroke-width="3" class="md:h-12 md:w-12" />
            </div>
          </div>

          <div class="mb-6 max-w-2xl space-y-4 text-center">
            <h2 class="text-3xl font-black tracking-tighter text-[#1b263b] md:text-4xl">投保申請已送出</h2>
            <div class="space-y-2">
              <p class="text-base font-bold text-slate-500">感謝您選擇本公司所提供之網路投保服務</p>
              <p class="text-sm font-medium text-slate-400">
                您於 <span class="font-black text-[#1469B6]">民國 115 年 04 月 01 日 11 時 30 分</span> 申請投保之保險契約
              </p>
            </div>
          </div>

          <div class="mb-6 w-full max-w-2xl overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="border-b border-slate-200/60 p-8 md:border-r md:border-b-0">
                <div class="mb-2 flex items-center space-x-2">
                  <div class="h-2 w-2 rounded-full bg-[#1469B6]"></div>
                  <span class="text-[11px] font-black tracking-widest text-slate-400 uppercase">強制證號</span>
                </div>
                <p class="text-xl font-black tracking-tight text-slate-800">TEST-CAR-CTPL-0001</p>
              </div>
              <div class="p-8">
                <div class="mb-2 flex items-center space-x-2">
                  <div class="h-2 w-2 rounded-full bg-[#7FBF27]"></div>
                  <span class="text-[11px] font-black tracking-widest text-slate-400 uppercase">任意險保單號</span>
                </div>
                <p class="text-xl font-black tracking-tight text-slate-800">TEST-CAR-VOL-0001</p>
              </div>
            </div>
            <div class="flex items-center justify-between border-t border-slate-100 bg-white px-8 py-4">
              <span class="text-xs font-bold text-slate-400">核保完成後，電子保單將寄發至您的信箱</span>
              <div class="flex items-baseline space-x-1">
                <span class="text-[10px] font-black text-slate-300">Total</span>
                <span class="text-lg font-black text-[#F37021]">NT$ 5,280</span>
              </div>
            </div>
          </div>

          <div class="mb-6 grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex items-start space-x-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
              <Mail class="mt-1 shrink-0 text-[#1469B6]" :size="20" />
              <div class="space-y-1">
                <p class="text-sm font-black text-slate-700">後續寄送通知</p>
                <p class="text-[12px] leading-relaxed font-medium text-slate-500">
                  核保並取得扣款完成後將以簡訊通知您，電子保單將於交易日起
                  <span class="font-bold text-[#1469B6]">四個工作天內</span>
                  透過 email 提供給您。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4 rounded-2xl border border-[#7FBF27]/20 bg-[#7FBF27]/5 p-6">
              <MessageCircle class="mt-1 shrink-0 text-[#7FBF27]" :size="20" />
              <div class="space-y-1">
                <p class="text-sm font-black text-slate-700">【南山60，感謝有你】</p>
                <p class="text-[12px] leading-relaxed font-medium text-slate-500">
                  加入南山產物 LINE 官方帳號並綁定，讓保單查詢及理賠進度查詢等服務與您隨行。
                </p>
                <button type="button" class="mt-2 flex items-center text-[11px] font-black text-[#7FBF27] hover:underline">
                  立即加入綁定 <ExternalLink :size="12" class="ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div class="mb-6 space-y-6 text-center">
            <div class="space-y-1">
              <h3 class="text-xl font-black text-[#1469B6]">祝 闔家平安 順心如意！</h3>
              <p class="text-sm font-bold text-slate-500">南山產物保險股份有限公司 敬上</p>
            </div>

            <div class="inline-flex flex-wrap items-center justify-center gap-4 rounded-full bg-slate-50 px-8 py-3 text-[12px] font-bold text-slate-400">
              <div class="flex items-center space-x-2">
                <Clock :size="14" />
                <span>營業時間：早上 9:00 ~ 下午 5:30</span>
              </div>
              <div class="hidden h-4 w-px bg-slate-200 md:block"></div>
              <span>諮詢電話：0800 020 060 按 2</span>
            </div>
          </div>
          </div>

          <div class="mt-4 hidden items-center justify-center rounded-b-[24px] border-t border-slate-100 bg-slate-50/80 px-8 py-8 lg:flex lg:px-12">
            <div class="flex items-center gap-4">
              <button
                type="button"
                class="group inline-flex min-w-[286px] items-center justify-center rounded-2xl bg-[#F37021] px-12 py-5 text-lg font-black text-white transition-all hover:bg-[#E65F10] active:scale-95"
              >
                <Download :size="20" class="mr-2 transition-transform group-hover:translate-y-0.5" />
                下載投保證明
              </button>
              <button
                type="button"
                @click="router.push({ name: 'home' })"
                class="inline-flex min-w-[148px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-10 py-5 text-sm font-black text-slate-400 transition-all hover:bg-slate-50 active:scale-95"
              >
                <ArrowLeft :size="18" class="mr-2" />
                回到首頁
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
          class="flex flex-[2] items-center justify-center rounded-xl bg-[#F37021] py-4 text-base font-black text-white"
        >
          <Download :size="18" class="mr-2" />
          下載投保證明
        </button>
        <button
          type="button"
          @click="router.push({ name: 'home' })"
          class="flex-1 rounded-xl border border-slate-200 bg-white py-4 text-sm font-bold text-slate-400"
        >
          <span class="inline-flex items-center justify-center">
            <ArrowLeft :size="16" class="mr-1.5" />
            回到首頁
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success-dots {
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px);
  background-size: 32px 32px;
}

@keyframes success-pulse-outer {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
}

@keyframes success-pulse-middle {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}

@keyframes success-pulse-inner {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.pulse-ring-outer {
  animation: success-pulse-outer 3s infinite ease-out;
}

.pulse-ring-middle {
  animation: success-pulse-middle 2.5s infinite ease-out;
}

.pulse-ring-inner {
  animation: success-pulse-inner 2s infinite ease-out;
}
</style>
