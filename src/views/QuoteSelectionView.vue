<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  AlertCircle,
  Calculator,
  Calendar,
  Check,
  CheckCircle,
  CheckCircle2,
  ClipboardCheck,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Edit3,
  FileText,
  HelpCircle,
  Info,
  Search,
  Shield,
  ShieldCheck,
} from 'lucide-vue-next';

const router = useRouter();
const activeStep = ref(2);
const isMobile = ref(false);

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
  { id: 2, title: '選擇保險內容', icon: Shield },
  { id: 3, title: '資料輸入', icon: Edit3 },
  { id: 4, title: '資料確認', icon: ClipboardCheck },
  { id: 5, title: '繳費', icon: CreditCard },
  { id: 6, title: '完成投保', icon: CheckCircle },
];

const progressWidth = computed(() => `${((activeStep.value - 1) / (steps.length - 1)) * 100}%`);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024;
};

const toggleSelection = (key) => {
  selections[key] = !selections[key];
};

const additionsSelected = computed(() => selections.additionsPassenger && selections.additionsExcess);
const extraSelected = computed(() => selections.extraRoadside && selections.extraLegal);

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

const controlBaseStyle =
  'w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all placeholder:font-normal placeholder:text-slate-300 focus:border-[#1469B6] focus:bg-white';

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
                  activeStep >= step.id
                    ? 'bg-[#7FBF27] text-white shadow-lg shadow-[#7FBF27]/20'
                    : 'bg-white/10 text-white/50',
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
          <div class="space-y-6 border-b border-slate-50 px-8 pt-12 pb-6 lg:px-12">
            <h2 class="text-3xl font-black tracking-tighter text-[#1b263b]">選擇保險內容</h2>
            <p class="max-w-xl text-[14px] font-bold tracking-tight text-slate-400">
              以下欄位均為必填，請依行車執照資料填寫，方能提供您正確的保費資訊。
            </p>
            <div class="rounded-r-2xl border-l-[6px] border-[#7FBF27] bg-[#7FBF27]/5 p-5">
              <p class="text-[15px] leading-relaxed font-black text-slate-600">
                要保人與行照車主及持卡人需為同一人，請依真實資料及行照資料填寫，方能提供您正確的保費資訊，謝謝！
              </p>
            </div>
          </div>

          <div class="space-y-16 px-8 py-10 lg:px-12">
            <section>
              <div class="mb-6 flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                  <Shield :size="22" :stroke-width="2.5" />
                </div>
                <h3 class="text-xl font-black tracking-tight text-[#1b263b]">1. 基本投保資訊</h3>
              </div>

              <div class="ml-0 grid grid-cols-1 gap-4 rounded-3xl border border-slate-100 bg-slate-50/50 p-6 md:grid-cols-2">
                <div class="flex items-center space-x-4">
                  <div class="rounded-xl border border-slate-100 bg-white p-3 text-[#1469B6] shadow-sm">
                    <Calendar :size="20" />
                  </div>
                  <div>
                    <p class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">保險期間</p>
                    <p class="text-sm font-black text-slate-700">一年期 (自生效日起算)</p>
                  </div>
                </div>
                <div class="flex items-center justify-end md:pr-4">
                  <button
                    type="button"
                    class="rounded-2xl bg-[#F37021] px-10 py-4 text-[16px] font-black text-white transition-all hover:bg-[#E65F10] active:scale-95"
                  >
                    自由配
                  </button>
                </div>
              </div>
            </section>

            <section>
              <div class="mb-6 flex items-center justify-between gap-4">
                <div class="flex items-center space-x-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7FBF27]/10 text-[#7FBF27]">
                    <Edit3 :size="22" :stroke-width="2.5" />
                  </div>
                  <h3 class="text-xl font-black tracking-tight text-[#1b263b]">2. 投保項目調整</h3>
                </div>
                <p class="text-[14px] font-bold tracking-tight text-slate-400">保險金額（單位：新台幣元）</p>
              </div>

              <div class="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
                <div
                  @click="toggleSelection('compulsory')"
                  :class="[
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.compulsory
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.compulsory ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.compulsory" :size="12" class="text-white" />
                      </div>
                      <div class="flex items-center space-x-1.5">
                        <span :class="['text-[16px] font-black tracking-tight', selections.compulsory ? 'text-[#1469B6]' : 'text-slate-700']">
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
                  <div :class="['h-[1px] w-full', selections.compulsory ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="text-[14px] font-bold text-slate-500">每人傷害</span>
                        <span class="text-sm font-black text-slate-800">20 萬元</span>
                      </div>
                      <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="text-[14px] font-bold text-slate-500">每人死亡/失能</span>
                        <span class="text-sm font-black text-slate-800">200 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('thirdParty')"
                  :class="[
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.thirdParty
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.thirdParty ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.thirdParty" :size="12" class="text-white" />
                      </div>
                      <span :class="['text-[16px] font-black tracking-tight', selections.thirdParty ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險
                      </span>
                    </div>
                  </div>
                  <div :class="['h-[1px] w-full', selections.thirdParty ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-4">
                      <div class="flex flex-col space-y-1">
                        <label class="text-[14px] font-bold text-slate-400">每一人體傷</label>
                        <div class="relative">
                          <select :class="`${controlBaseStyle} !bg-slate-50/50 pr-10`">
                            <option>300 萬元</option>
                            <option>500 萬元</option>
                          </select>
                          <ChevronDown :size="14" class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                      <div class="flex flex-col space-y-1">
                        <label class="text-[14px] font-bold text-slate-400">每一事故財損</label>
                        <div class="relative">
                          <select :class="`${controlBaseStyle} !bg-slate-50/50 pr-10`">
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
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.passengerLiability
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.passengerLiability ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.passengerLiability" :size="12" class="text-white" />
                      </div>
                      <span :class="['text-[16px] font-black tracking-tight', selections.passengerLiability ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險乘客體傷責任附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['h-[1px] w-full', selections.passengerLiability ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="text-[14px] font-bold text-slate-500">每一人體傷責任</span>
                        <span class="text-sm font-black text-slate-800">100 萬元</span>
                      </div>
                      <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="text-[14px] font-bold text-slate-500">每一事故體傷責任</span>
                        <span class="text-sm font-black text-slate-800">100 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('driverInjuryAttached')"
                  :class="[
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.driverInjuryAttached
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.driverInjuryAttached ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.driverInjuryAttached" :size="12" class="text-white" />
                      </div>
                      <span :class="['text-[16px] font-black tracking-tight', selections.driverInjuryAttached ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險駕駛人傷害附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['h-[1px] w-full', selections.driverInjuryAttached ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="text-[14px] font-bold text-slate-500">每一人傷害醫療費用</span>
                        <span class="text-sm font-black text-slate-800">5 萬元</span>
                      </div>
                      <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="text-[14px] font-bold text-slate-500">每一人死亡失能</span>
                        <span class="text-sm font-black text-slate-800">100 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('driverInjury')"
                  :class="[
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.driverInjury
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.driverInjury ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.driverInjury" :size="12" class="text-white" />
                      </div>
                      <span :class="['text-[16px] font-black tracking-tight', selections.driverInjury ? 'text-[#1469B6]' : 'text-slate-700']">
                        汽車駕駛人傷害保險
                      </span>
                    </div>
                  </div>
                  <div :class="['h-[1px] w-full', selections.driverInjury ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-3">
                      <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span class="text-[14px] font-bold text-slate-500">每一人傷害醫療費用</span>
                        <span class="text-sm font-black text-slate-800">3 萬元</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  @click="toggleSelection('consolation')"
                  :class="[
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    selections.consolation
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          selections.consolation ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="selections.consolation" :size="12" class="text-white" />
                      </div>
                      <span :class="['text-[16px] font-black tracking-tight', selections.consolation ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人責任保險慰問金費用附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['h-[1px] w-full', selections.consolation ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-4">
                      <div class="flex flex-col space-y-1">
                        <label class="text-[14px] font-bold text-slate-400">每一事故慰問金費用保險金限額</label>
                        <div class="relative">
                          <select :class="`${controlBaseStyle} !bg-slate-50/50 pr-10`">
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
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    additionsSelected
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          additionsSelected ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="additionsSelected" :size="12" class="text-white" />
                      </div>
                      <span :class="['text-[16px] font-black tracking-tight', additionsSelected ? 'text-[#1469B6]' : 'text-slate-700']">
                        第三人附加條款
                      </span>
                    </div>
                  </div>
                  <div :class="['h-[1px] w-full', additionsSelected ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-2">
                      <div
                        @click.stop="toggleSelection('additionsPassenger')"
                        class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5"
                      >
                        <span class="text-[14px] font-bold text-slate-600">乘客體傷責任</span>
                        <div
                          :class="[
                            'flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                            selections.additionsPassenger ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                          ]"
                        >
                          <Check v-if="selections.additionsPassenger" :size="12" class="text-white" />
                        </div>
                      </div>
                      <div
                        @click.stop="toggleSelection('additionsExcess')"
                        class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5"
                      >
                        <span class="text-[14px] font-bold text-slate-600">超額責任險 (1000萬)</span>
                        <div
                          :class="[
                            'flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
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
                    'flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300',
                    extraSelected
                      ? 'border-[#1469B6] bg-white shadow-[0_20px_40px_-15px_rgba(20,105,182,0.2)] ring-4 ring-[#1469B6]/5'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
                  ]"
                >
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center space-x-3">
                      <div
                        :class="[
                          'flex h-5 w-5 items-center justify-center rounded-md border transition-all',
                          extraSelected ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                        ]"
                      >
                        <Check v-if="extraSelected" :size="12" class="text-white" />
                      </div>
                      <span :class="['text-[16px] font-black tracking-tight', extraSelected ? 'text-[#1469B6]' : 'text-slate-700']">
                        汽車險其他附加
                      </span>
                    </div>
                  </div>
                  <div :class="['h-[1px] w-full', extraSelected ? 'bg-[#1469B6]/15' : 'bg-slate-100']"></div>
                  <div class="flex-1 bg-white p-5">
                    <div class="space-y-2">
                      <div
                        @click.stop="toggleSelection('extraRoadside')"
                        class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5"
                      >
                        <span class="text-[14px] font-bold text-slate-600">道路救援 (30KM)</span>
                        <div
                          :class="[
                            'flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                            selections.extraRoadside ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                          ]"
                        >
                          <Check v-if="selections.extraRoadside" :size="12" class="text-white" />
                        </div>
                      </div>
                      <div
                        @click.stop="toggleSelection('extraLegal')"
                        class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5"
                      >
                        <span class="text-[14px] font-bold text-slate-600">法律費用補償</span>
                        <div
                          :class="[
                            'flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                            selections.extraLegal ? 'border-[#7FBF27] bg-[#7FBF27]' : 'border-slate-300 bg-white',
                          ]"
                        >
                          <Check v-if="selections.extraLegal" :size="12" class="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex h-full cursor-not-allowed select-none flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 opacity-60">
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

                <div class="flex h-full cursor-not-allowed select-none flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 opacity-60">
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
          </div>

          <div class="mt-4 hidden items-center justify-center border-t border-slate-100 bg-slate-50/60 px-8 py-8 lg:flex lg:px-12">
            <div class="flex items-center gap-6">
              <button
                type="button"
                @click="router.push({ name: 'quote-flow' })"
                class="min-w-[168px] rounded-2xl border border-slate-200 bg-white px-10 py-5 text-sm font-black text-slate-400 transition-all hover:bg-slate-50 active:scale-95"
              >
                上一步
              </button>
              <button
                type="button"
                @click="router.push({ name: 'quote-flow-input' })"
                class="group inline-flex min-w-[232px] items-center justify-center rounded-2xl bg-[#7FBF27] px-12 py-5 text-lg font-black text-white transition-all hover:bg-[#7FBF27]/90 active:scale-95"
              >
                下一步輸入資料
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
          @click="router.push({ name: 'quote-flow' })"
          class="flex-1 rounded-xl border border-slate-200 py-4 text-sm font-bold text-slate-400"
        >
          上一步
        </button>
        <button
          type="button"
          @click="router.push({ name: 'quote-flow-input' })"
          class="flex flex-[2] items-center justify-center rounded-xl bg-[#7FBF27] py-4 text-base font-black text-white shadow-lg"
        >
          下一步輸入資料
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
