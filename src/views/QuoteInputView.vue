<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Calculator,
  Calendar,
  Car,
  Check,
  CheckCircle,
  CheckCircle2,
  ClipboardCheck,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Edit3,
  FileText,
  Hash,
  HelpCircle,
  Info,
  Phone,
  Search,
  Shield,
  User,
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const isConfirmPage = computed(() => route.name === 'quote-flow-confirm');
const activeStep = computed(() => (isConfirmPage.value ? 4 : 3));
const isMobile = ref(false);
const termsTab = ref(1);
const otherTab = ref('paper');
const purposeOther = ref('');
const insurancePurposes = ref(['為財產及利益作風險規劃', '依法應負之賠償責任作風險規劃']);
const contactSlots = ref([]);
const accessibilityNeeds = ref([]);
const selections = reactive({
  compulsory: true,
  thirdParty: true,
  passengerLiability: true,
  driverInjuryAttached: true,
  driverInjury: true,
  consolation: true,
  additionsPassenger: false,
  additionsExcess: false,
  extraRoadside: false,
  extraLegal: false,
});

const steps = [
  { id: 1, title: '保費試算', icon: Calculator, completed: true },
  { id: 2, title: '選擇保險內容', icon: Shield, completed: true },
  { id: 3, title: '資料輸入', icon: Edit3 },
  { id: 4, title: '資料確認', icon: ClipboardCheck },
  { id: 5, title: '繳費', icon: CreditCard },
  { id: 6, title: '完成投保', icon: CheckCircle },
];

const years = Array.from({ length: 25 }, (_, index) => 2026 - index);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const progressWidth = computed(() => `${((activeStep.value - 1) / (steps.length - 1)) * 100}%`);

const inputBaseStyle =
  'w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#7FBF27] focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300 placeholder:font-normal text-sm disabled:cursor-not-allowed disabled:opacity-60';

const selectBaseStyle =
  'w-full appearance-none px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#7FBF27] focus:bg-white outline-none transition-all font-medium text-slate-700 text-sm disabled:cursor-not-allowed disabled:opacity-60';

const purposeOptions = ['為財產及利益作風險規劃', '依法應負之賠償責任作風險規劃', '可能承受之傷害作風險規劃'];
const contactOptions = ['AM 9:00 ~ PM 12:30', 'PM 1:30 ~ PM 5:00'];
const accessibilityOptions = ['同意以簡訊方式進行投保意願確認'];
const additionsSelected = computed(() => selections.additionsPassenger && selections.additionsExcess);
const extraSelected = computed(() => selections.extraRoadside && selections.extraLegal);

const toggleSelection = (key) => {
  selections[key] = !selections[key];
};

const toggleAdditionsGroup = () => {
  const nextValue = !additionsSelected.value;
  selections.additionsPassenger = nextValue;
  selections.additionsExcess = nextValue;
};

const toggleExtraGroup = () => {
  const nextValue = !extraSelected.value;
  selections.extraRoadside = nextValue;
  selections.extraLegal = nextValue;
};

const handleNextStep = () => {
  if (!isConfirmPage.value) {
    router.push({ name: 'quote-flow-confirm' });
    return;
  }
  router.push({ name: 'quote-flow-payment' });
};

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
        <div class="hidden w-48 shrink-0 lg:block">
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

        <div class="flex-1 space-y-8">
          <div class="space-y-8">
            <section class="space-y-8 rounded-[20px] bg-white p-8 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)]">
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center space-x-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                    <User :size="22" :stroke-width="2.5" />
                  </div>
                  <h3 class="text-xl font-black tracking-tight text-[#1b263b]">1. 要保人 / 被保險人資訊</h3>
                </div>
              </div>

              <fieldset :disabled="isConfirmPage" class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">姓名 <span class="ml-0.5 text-rose-500">*</span></label>
                  <input type="text" placeholder="請輸入姓名" :class="inputBaseStyle" />
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">身分證字號 <span class="ml-0.5 text-rose-500">*</span></label>
                  <input type="text" placeholder="請輸入身分證字號" :class="inputBaseStyle" />
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">出生日期 (民國) <span class="ml-0.5 text-rose-500">*</span></label>
                  <div class="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="年" :class="`${inputBaseStyle} px-2 text-center`" />
                    <input type="text" placeholder="月" :class="`${inputBaseStyle} px-2 text-center`" />
                    <input type="text" placeholder="日" :class="`${inputBaseStyle} px-2 text-center`" />
                  </div>
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">手機號碼 <span class="ml-0.5 text-rose-500">*</span></label>
                  <div class="relative">
                    <Phone :size="18" class="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="09XX-XXX-XXX" :class="`${inputBaseStyle} pl-12`" />
                  </div>
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">電子信箱 <span class="ml-0.5 text-rose-500">*</span></label>
                  <input type="email" placeholder="example@email.com" :class="inputBaseStyle" />
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">聯絡地址 <span class="ml-0.5 text-rose-500">*</span></label>
                  <input type="text" placeholder="請輸入完整地址" :class="inputBaseStyle" />
                </div>
              </fieldset>
            </section>

            <section :class="['space-y-8 rounded-[20px] bg-white p-8 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)]', isConfirmPage ? 'is-confirm' : '']">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                  <Car :size="22" :stroke-width="2.5" />
                </div>
                <h3 class="text-xl font-black tracking-tight text-[#1b263b]">2. 車輛資料</h3>
              </div>

              <fieldset :disabled="isConfirmPage" class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">牌照號碼 <span class="ml-0.5 text-rose-500">*</span></label>
                  <div class="flex items-center space-x-3">
                    <input type="text" placeholder="ABC" :class="`${inputBaseStyle} px-3 text-center uppercase`" />
                    <div class="h-1 w-3 shrink-0 rounded-full bg-slate-200"></div>
                    <input type="text" placeholder="1234" :class="`${inputBaseStyle} px-3 text-center uppercase`" />
                  </div>
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">車輛種類 <span class="ml-0.5 text-rose-500">*</span></label>
                  <select :class="selectBaseStyle">
                    <option>自用小客車</option>
                    <option>營業用小客車</option>
                  </select>
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">出廠年月 (西元) <span class="ml-0.5 text-rose-500">*</span></label>
                  <div class="grid grid-cols-2 gap-2">
                    <select :class="selectBaseStyle">
                      <option>年份</option>
                      <option v-for="year in years" :key="year">{{ year }}</option>
                    </select>
                    <select :class="selectBaseStyle">
                      <option>月份</option>
                      <option v-for="month in months" :key="month">{{ month }}</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">排氣量 (CC數) <span class="ml-0.5 text-rose-500">*</span></label>
                  <div class="relative">
                    <input type="text" placeholder="CC" :class="`${inputBaseStyle} pr-10 text-right`" />
                    <span class="absolute top-1/2 right-4 -translate-y-1/2 text-[10px] font-medium text-slate-400">cc</span>
                  </div>
                </div>
                <div class="flex flex-col space-y-2 md:col-span-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">廠牌 / 型號 <span class="ml-0.5 text-rose-500">*</span></label>
                  <div class="flex flex-col gap-3 sm:flex-row">
                    <button class="flex shrink-0 items-center justify-center space-x-2 rounded-2xl bg-[#7FBF27] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#7FBF27]/20 transition-all hover:bg-[#7FBF27]/90">
                      <Search :size="16" />
                      <span>選擇型號</span>
                    </button>
                    <div class="flex flex-1 gap-2">
                      <input type="text" readonly placeholder="廠牌" :class="`w-1/3 cursor-not-allowed ${inputBaseStyle}`" />
                      <input type="text" readonly placeholder="型號" :class="`w-2/3 cursor-not-allowed ${inputBaseStyle}`" />
                    </div>
                  </div>
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">引擎號碼</label>
                  <div class="relative">
                    <Hash :size="18" class="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="或填車身號碼" :class="`${inputBaseStyle} pl-12`" />
                  </div>
                </div>
                <div class="flex flex-col space-y-2">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">乘載人數 (含駕駛) <span class="ml-0.5 text-rose-500">*</span></label>
                  <select :class="selectBaseStyle">
                    <option>5 人</option>
                    <option>7 人</option>
                  </select>
                </div>
              </fieldset>
            </section>

            <section :class="['space-y-8 rounded-[20px] bg-white p-8 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)]', isConfirmPage ? 'is-confirm' : '']">
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center space-x-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                    <Shield :size="22" :stroke-width="2.5" />
                  </div>
                  <h3 class="text-xl font-black tracking-tight text-[#1b263b]">3. 已選保險內容</h3>
                </div>
                <p class="text-[14px] font-bold tracking-tight text-slate-400">保險金額（單位：新台幣元）</p>
              </div>

              <div :class="['grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2', isConfirmPage ? 'pointer-events-none' : '']">
                <div
                  @click="toggleSelection('compulsory')"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.compulsory
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.compulsory ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.compulsory" :size="12" class="text-white" />
                      </div>
                      <div class="flex items-center space-x-1.5">
                        <span :class="['policy-title text-[16px] font-black tracking-tight', selections.compulsory ? 'text-[#1469B6]' : 'text-slate-700']">
                          強制汽車責任保險
                        </span>
                        <div class="group relative">
                          <HelpCircle :size="14" class="cursor-help text-slate-300" />
                          <div class="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-48 rounded-lg bg-slate-800 p-2 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            依法令規定必須投保
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', selections.compulsory ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-500">每人傷害</span>
                        <span class="policy-value text-sm font-black text-slate-800">20 萬元</span>
                      </div>
                      <div class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-500">每人死亡/失能</span>
                        <span class="policy-value text-sm font-black text-slate-800">200 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('thirdParty')"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.thirdParty
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.thirdParty ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.thirdParty" :size="12" class="text-white" />
                      </div>
                      <span :class="['policy-title text-[16px] font-black tracking-tight', selections.thirdParty ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險
                      </span>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', selections.thirdParty ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-4">
                      <div class="flex flex-col space-y-1">
                        <label class="policy-label text-[14px] font-bold text-slate-400">每一人體傷</label>
                        <div class="relative">
                          <select :disabled="isConfirmPage" :class="`policy-select ${selectBaseStyle} !bg-slate-50/50 pr-10`">
                            <option>300 萬元</option>
                            <option>500 萬元</option>
                          </select>
                          <ChevronDown :size="14" class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                      <div class="flex flex-col space-y-1">
                        <label class="policy-label text-[14px] font-bold text-slate-400">每一事故財損</label>
                        <div class="relative">
                          <select :disabled="isConfirmPage" :class="`policy-select ${selectBaseStyle} !bg-slate-50/50 pr-10`">
                            <option>50 萬元</option>
                            <option>100 萬元</option>
                          </select>
                          <ChevronDown :size="14" class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('passengerLiability')"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.passengerLiability
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.passengerLiability ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.passengerLiability" :size="12" class="text-white" />
                      </div>
                      <span :class="['policy-title text-[16px] font-black tracking-tight', selections.passengerLiability ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險乘客體傷責任附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', selections.passengerLiability ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-500">每一人體傷責任</span>
                        <span class="policy-value text-sm font-black text-slate-800">100 萬元</span>
                      </div>
                      <div class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-500">每一事故體傷責任</span>
                        <span class="policy-value text-sm font-black text-slate-800">100 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('driverInjuryAttached')"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.driverInjuryAttached
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.driverInjuryAttached ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.driverInjuryAttached" :size="12" class="text-white" />
                      </div>
                      <span :class="['policy-title text-[16px] font-black tracking-tight', selections.driverInjuryAttached ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險駕駛人傷害附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', selections.driverInjuryAttached ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-500">每一人傷害醫療費用</span>
                        <span class="policy-value text-sm font-black text-slate-800">5 萬元</span>
                      </div>
                      <div class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-500">每一人死亡失能</span>
                        <span class="policy-value text-sm font-black text-slate-800">100 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('driverInjury')"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.driverInjury
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.driverInjury ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.driverInjury" :size="12" class="text-white" />
                      </div>
                      <span :class="['policy-title text-[16px] font-black tracking-tight', selections.driverInjury ? 'text-[#1469B6]' : 'text-slate-700']">
                        汽車駕駛人傷害保險
                      </span>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', selections.driverInjury ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-500">每一人傷害醫療費用</span>
                        <span class="policy-value text-sm font-black text-slate-800">3 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('consolation')"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.consolation
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.consolation ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.consolation" :size="12" class="text-white" />
                      </div>
                      <span :class="['policy-title text-[16px] font-black tracking-tight', selections.consolation ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險慰問金費用附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', selections.consolation ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-4">
                      <div class="flex flex-col space-y-1">
                        <label class="policy-label text-[14px] font-bold text-slate-400">每一事故慰問金費用保險金限額</label>
                        <div class="relative">
                          <select :disabled="isConfirmPage" :class="`policy-select ${selectBaseStyle} !bg-slate-50/50 pr-10`">
                            <option>5 仟元/每一事故</option>
                            <option>1 萬元/每一事故</option>
                          </select>
                          <ChevronDown :size="14" class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleAdditionsGroup"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    additionsSelected
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          additionsSelected ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="additionsSelected" :size="12" class="text-white" />
                      </div>
                      <span :class="['policy-title text-[16px] font-black tracking-tight', additionsSelected ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', additionsSelected ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-2">
                      <div @click.stop="toggleSelection('additionsPassenger')" class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-600">乘客體傷責任</span>
                        <div
                          :class="[
                            'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                            selections.additionsPassenger ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                          ]"
                        >
                          <Check v-if="selections.additionsPassenger" :size="12" class="text-white" />
                        </div>
                      </div>
                      <div @click.stop="toggleSelection('additionsExcess')" class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-600">超額責任險 (1000萬)</span>
                        <div
                          :class="[
                            'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                            selections.additionsExcess ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                          ]"
                        >
                          <Check v-if="selections.additionsExcess" :size="12" class="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleExtraGroup"
                  :class="[
                    'policy-card flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    extraSelected
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          extraSelected ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="extraSelected" :size="12" class="text-white" />
                      </div>
                      <span :class="['policy-title text-[16px] font-black tracking-tight', extraSelected ? 'text-[#1469B6]' : 'text-slate-700']">
                        汽車險其他附加
                      </span>
                    </div>
                  </div>
                  <div :class="['policy-divider h-[1px] w-full', extraSelected ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-2">
                      <div @click.stop="toggleSelection('extraRoadside')" class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-600">道路救援 (30KM)</span>
                        <div
                          :class="[
                            'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                            selections.extraRoadside ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                          ]"
                        >
                          <Check v-if="selections.extraRoadside" :size="12" class="text-white" />
                        </div>
                      </div>
                      <div @click.stop="toggleSelection('extraLegal')" class="policy-row flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="policy-label text-[14px] font-bold text-slate-600">法律費用補償</span>
                        <div
                          :class="[
                            'policy-check flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                            selections.extraLegal ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                          ]"
                        >
                          <Check v-if="selections.extraLegal" :size="12" class="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="policy-card flex h-full cursor-not-allowed select-none flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 opacity-60">
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div class="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white"></div>
                      <div class="flex items-center space-x-1.5">
                        <span class="text-[16px] font-black tracking-tight text-slate-400">車體損失險 (丙式)</span>
                        <div class="group relative">
                          <HelpCircle :size="14" class="cursor-help text-slate-300" />
                          <div class="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-48 rounded-lg bg-slate-800 p-2 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            您的車齡不符合投保條件
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="h-[1px] w-full bg-slate-200"></div>
                  <div class="flex flex-1 items-center justify-center rounded-xl bg-slate-50/30 p-6">
                    <p class="text-center text-[12px] leading-relaxed font-bold italic text-slate-400">
                      您的車齡已超過 15 年
                      <br />
                      暫不開放網路投保
                    </p>
                  </div>
                </div>

                <div class="policy-card flex h-full cursor-not-allowed select-none flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 opacity-60">
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div class="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white"></div>
                      <div class="flex items-center space-x-1.5">
                        <span class="text-[16px] font-black tracking-tight text-slate-400">竊盜損失險</span>
                        <div class="group relative">
                          <HelpCircle :size="14" class="cursor-help text-slate-300" />
                          <div class="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-48 rounded-lg bg-slate-800 p-2 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            本方案未包含此險種
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="h-[1px] w-full bg-slate-200"></div>
                  <div class="flex flex-1 items-center justify-center rounded-xl bg-slate-50/30 p-6">
                    <p class="text-center text-[12px] font-bold italic text-slate-400">此車型不符合投保條件</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="space-y-8 rounded-[20px] bg-white p-8 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)]">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                  <FileText :size="22" :stroke-width="2.5" />
                </div>
                <h3 class="text-xl font-black tracking-tight text-[#1b263b]">4. 其他事項</h3>
              </div>

              <div class="space-y-4 border-l-4 border-[#2F73BF] bg-slate-50 p-6">
                <p class="text-[14px] leading-relaxed font-bold text-slate-500">
                  依據
                  <span class="text-[#F37021]">「保險業招攬及核保理賠辦法」</span>
                  規範，保險公司須了解並評估您保險需求及適合度。
                </p>
                <p class="text-[14px] leading-relaxed font-bold text-slate-500">
                  依據
                  <span class="text-[#F37021]">「保險業辦理電子商務應注意事項」</span>
                  規定，為了保障您的權益，並確保您已充分了解投保內容與商品特性，本公司將隨機抽樣進行投保意願之確認。
                </p>
              </div>

              <fieldset
                :disabled="isConfirmPage"
                :class="[
                  'grid grid-cols-1 gap-10 xl:grid-cols-2',
                  isConfirmPage ? 'confirm-options' : '',
                ]"
              >
                <div class="space-y-5">
                  <h4 class="text-[14px] font-black text-[#2F73BF]">投保目的與需求</h4>
                  <label
                    v-for="purpose in purposeOptions"
                    :key="purpose"
                    class="flex items-center space-x-3"
                  >
                    <input
                      v-model="insurancePurposes"
                      type="checkbox"
                      :value="purpose"
                      class="peer sr-only"
                    />
                    <span class="option-check flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-[#7FBF27] peer-checked:bg-[#7FBF27] peer-checked:text-white">
                      <Check :size="12" />
                    </span>
                    <span class="text-[14px] font-bold text-slate-700">{{ purpose }}</span>
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model="insurancePurposes"
                      type="checkbox"
                      value="其他"
                      class="peer sr-only"
                    />
                    <span class="option-check flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-[#7FBF27] peer-checked:bg-[#7FBF27] peer-checked:text-white">
                      <Check :size="12" />
                    </span>
                    <span class="shrink-0 whitespace-nowrap text-[14px] font-bold text-slate-700">其他</span>
                    <input
                      v-model="purposeOther"
                      type="text"
                      placeholder="請輸入"
                      :class="`option-input ${inputBaseStyle}`"
                      class="max-w-[320px]"
                    />
                  </div>
                </div>

                <div class="space-y-10">
                  <div class="space-y-5">
                    <h4 class="text-[14px] font-black text-[#2F73BF]">一般人士（方便電話訪問時間）</h4>
                    <label
                      v-for="slot in contactOptions"
                      :key="slot"
                      class="flex items-center space-x-3"
                    >
                      <input
                        v-model="contactSlots"
                        type="checkbox"
                        :value="slot"
                        class="peer sr-only"
                      />
                      <span class="option-check flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-[#7FBF27] peer-checked:bg-[#7FBF27] peer-checked:text-white">
                      <Check :size="12" />
                      </span>
                      <span class="text-[14px] font-bold text-slate-700">{{ slot }}</span>
                    </label>
                  </div>

                  <div class="space-y-5">
                    <h4 class="text-[14px] font-black text-[#2F73BF]">聽語障礙人士</h4>
                    <label
                      v-for="item in accessibilityOptions"
                      :key="item"
                      class="flex items-center space-x-3"
                    >
                      <input
                        v-model="accessibilityNeeds"
                        type="checkbox"
                        :value="item"
                        class="peer sr-only"
                      />
                      <span class="option-check flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-[#7FBF27] peer-checked:bg-[#7FBF27] peer-checked:text-white">
                      <Check :size="12" />
                      </span>
                      <span class="text-[14px] font-bold text-slate-700">{{ item }}</span>
                    </label>
                  </div>

                  <div class="space-y-5">
                    <h4 class="text-[14px] font-black text-[#2F73BF]">保單寄送方式</h4>
                    <label class="flex items-start space-x-3">
                      <input type="radio" name="delivery" value="paper" class="peer sr-only" v-model="otherTab" />
                      <span class="option-check mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-[#7FBF27] peer-checked:bg-[#7FBF27] peer-checked:text-white">
                    <Check :size="12" />
                      </span>
                      <span class="text-[14px] font-bold text-slate-700">紙本保單</span>
                    </label>
                    <label class="flex items-start space-x-3">
                      <input type="radio" name="delivery" value="electronic" class="peer sr-only" v-model="otherTab" />
                      <span class="option-check mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-[#7FBF27] peer-checked:bg-[#7FBF27] peer-checked:text-white">
                    <Check :size="12" />
                      </span>
                      <span class="text-[14px] font-bold text-slate-700">電子保單</span>
                    </label>
                  </div>
                </div>
              </fieldset>

            </section>

            <section class="space-y-8 rounded-[20px] bg-white p-8 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)]">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                  <FileText :size="22" :stroke-width="2.5" />
                </div>
                <h3 class="text-xl font-black tracking-tight text-[#1b263b]">5. 告知義務與聲明事項</h3>
              </div>

              <div class="overflow-hidden rounded-[20px] border border-slate-100 bg-slate-50">
                <div class="flex border-b border-slate-200 bg-slate-100/50">
                  <button
                    type="button"
                    @click="termsTab = 1"
                    :class="[
                      'flex-1 py-4 text-xs font-bold transition-all',
                      termsTab === 1 ? 'bg-white text-[#1469B6] shadow-sm' : 'text-slate-400 hover:text-slate-600',
                    ]"
                  >
                    個資保護法告知義務
                  </button>
                  <button
                    type="button"
                    @click="termsTab = 2"
                    :class="[
                      'flex-1 py-4 text-xs font-bold transition-all',
                      termsTab === 2 ? 'bg-white text-[#1469B6] shadow-sm' : 'text-slate-400 hover:text-slate-600',
                    ]"
                  >
                    網路投保聲明事項
                  </button>
                </div>

                <div class="group relative">
                  <div class="h-64 overflow-y-scroll p-6 text-[13px] leading-relaxed text-slate-600">
                    <div v-if="termsTab === 1" class="space-y-4 font-medium">
                      <p class="font-bold text-slate-800">南山產物保險股份有限公司個資法告知事項：</p>
                      <p>
                        一、蒐集之目的：人身保險(OO一)、行銷(O四O)、金融服務業依法令規定及金融監理需要，所為之蒐集處理及利用(O五九)、非公務機關依法定義務所進行個人資料之蒐集處理及利用(O六三)、契約、類似契約或其他法律關係事務(O六九)、消費者、客戶管理與服務(O九O)、財產保險(O九三)、調查、統計與研究分析(一五七)及其他經營合於營業登記項目或組織章程所定之業務(一八一)。
                      </p>
                      <p>
                        二、蒐集之個人資料類別：姓名、身分證統一編號、護照號碼、出生年月日、性別、聯絡方式、病歷、醫療、健康檢查、旅行細節、汽機車牌照號碼、行照資料、財務資料、家庭成員及其姓名、身分證統一編號與出生年月日、以及網站瀏覽、查詢或付款時伺服器自行產生之相關紀錄。
                      </p>
                      <p>三、個人資料之來源：(一)要保人、被保險人 (二)當事人之法定代理人、輔助人。</p>
                      <p>四、利用之期間、對象、地區、方式：(一)期間：因執行業務所必須及依法令規定應保存之期間。</p>
                      <p>...(更多個資條款內容)</p>
                    </div>
                    <div v-else class="space-y-4 font-medium">
                      <p class="font-bold text-slate-800">網路投保聲明事項：</p>
                      <p>本人已詳閱並同意網路投保聲明事項之內容。本人理解並同意，透過網路投保之保險契約，其生效日及相關權利義務悉依保單條款及相關法令規定辦理。</p>
                      <p>本人保證所填寫之資料均屬實，若有不實之處，願負法律責任。...(更多聲明內容)</p>
                    </div>
                  </div>
                  <div class="pointer-events-none absolute right-0 bottom-0 left-0 flex h-12 items-end justify-center bg-gradient-to-t from-slate-50 to-transparent pb-2">
                    <p class="flex items-center text-[16px] font-bold text-amber-600">
                      <ChevronDown :size="16" class="mr-1 animate-bounce" /> 請滑動頁面詳閱完整內容
                    </p>
                  </div>
                </div>

                <div class="border-t border-slate-100 bg-slate-100/30 p-6">
                  <label class="flex items-center space-x-3">
                    <input type="checkbox" class="peer sr-only" />
                    <span class="option-check flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-[#7FBF27] peer-checked:bg-[#7FBF27] peer-checked:text-white">
                      <Check :size="12" />
                    </span>
                    <span class="text-[14px] font-bold text-slate-700">我已詳細閱讀並同意上述告知內容與聲明事項</span>
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div class="hidden items-center justify-center rounded-[20px] bg-white px-8 py-8 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)] lg:flex lg:px-12">
            <div class="flex items-center gap-6">
              <button
                type="button"
                @click="router.push({ name: isConfirmPage ? 'quote-flow-input' : 'quote-flow-selection' })"
                class="min-w-[168px] rounded-2xl border border-slate-200 bg-white px-10 py-5 text-sm font-black text-slate-400 transition-all hover:bg-slate-50 active:scale-95"
              >
                上一步
              </button>
              <button
                type="button"
                @click="handleNextStep"
                class="group inline-flex min-w-[232px] items-center justify-center rounded-2xl bg-[#7FBF27] px-12 py-5 text-lg font-black text-white transition-all hover:bg-[#7FBF27]/90 active:scale-95"
              >
                {{ isConfirmPage ? '下一步繳費' : '下一步確認資料' }}
                <ChevronRight :size="20" class="ml-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="fixed right-0 bottom-0 left-0 z-50 flex flex-col space-y-3 border-t border-slate-100 bg-white/95 p-4 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl lg:hidden">
      <div class="flex space-x-3">
        <button
          type="button"
          @click="router.push({ name: isConfirmPage ? 'quote-flow-input' : 'quote-flow-selection' })"
          class="flex-1 rounded-xl border border-slate-200 py-4 text-sm font-bold text-slate-400"
        >
          上一步
        </button>
        <button type="button" @click="handleNextStep" class="flex flex-[2] items-center justify-center rounded-xl bg-[#7FBF27] py-4 text-base font-black text-white shadow-lg">
          {{ isConfirmPage ? '下一步繳費' : '下一步確認資料' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-confirm .policy-card {
  border-color: #dbe4ef;
  background: #ffffff;
  box-shadow: none;
  opacity: 1;
}

.is-confirm .policy-check {
  border-color: #dbe4ef;
  background: #ffffff;
  color: transparent;
}

.is-confirm .policy-title,
.is-confirm .policy-label,
.is-confirm .policy-value {
  color: #94a3b8;
}

.is-confirm .policy-divider {
  background: #eef2f7;
}

.is-confirm .policy-row {
  border-color: #eef2f7;
  background: #f8fafc;
}

.is-confirm .policy-select {
  border-color: #e2e8f0;
  background: #f8fafc;
  color: #94a3b8;
  cursor: not-allowed;
}

.confirm-options label {
  cursor: not-allowed;
}

.confirm-options .option-check {
  border-color: #dbe4ef;
  background: #ffffff;
  color: transparent;
}

.confirm-options .option-input {
  border-color: #e2e8f0;
  background: #f8fafc;
  color: #94a3b8;
}

.confirm-options span {
  color: #94a3b8;
}

.quote-dots {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1.8px, transparent 1.8px);
  background-size: 30px 30px;
}
</style>
