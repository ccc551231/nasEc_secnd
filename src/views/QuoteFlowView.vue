<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  AlertCircle,
  Calculator,
  Calendar,
  Car,
  CheckCircle,
  CheckCircle2,
  ClipboardCheck,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Edit3,
  FileText,
  Hash,
  Info,
  Phone,
  RefreshCw,
  Search,
  Shield,
  ShieldCheck,
  User,
} from 'lucide-vue-next';

const router = useRouter();
const activeStep = ref(1);
const isMobile = ref(false);
const termsTab = ref(1);

const steps = [
  { id: 1, title: '保費試算', icon: Calculator, sub: '初步預估', completed: true },
  { id: 2, title: '選擇保險內容', icon: Shield, sub: '量身打造', completed: true },
  { id: 3, title: '資料輸入', icon: Edit3, sub: '填寫詳情' },
  { id: 4, title: '資料確認', icon: ClipboardCheck, sub: '最後檢查' },
  { id: 5, title: '繳費', icon: CreditCard, sub: '安全支付' },
  { id: 6, title: '完成投保', icon: CheckCircle, sub: '保險生效' },
];

const years = Array.from({ length: 25 }, (_, index) => 2026 - index);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
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

const inputBaseStyle = 'w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#7FBF27] focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300 placeholder:font-normal text-sm';
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

    <main class="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-40 md:px-6 lg:pb-16">
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

        <div class="flex-1 overflow-hidden rounded-[24px] bg-white shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)]">
        <div class="border-b border-slate-50 px-8 pt-10 pb-8 lg:px-12">
          <div class="space-y-3">
            <h1 class="text-3xl font-black tracking-tighter text-slate-800">保費試算</h1>
            <p class="max-w-xl text-xs leading-relaxed font-medium text-slate-400">
              以下欄位均為必填，請依行車執照資料填寫，方能提供您正確的保費資訊。
            </p>
            <div class="rounded-r-2xl border-l-4 border-[#7FBF27] bg-[#7FBF27]/5 p-4">
              <p class="text-xs leading-relaxed font-bold text-slate-600">
                要保人與行照車主及持卡人需為同一人，請依真實資料及行照資料填寫，方能提供您正確的保費資訊，謝謝！
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-12 px-8 py-10 lg:px-12">
          <section class="space-y-8">
            <div class="flex items-center space-x-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7FBF27]/10 text-[#7FBF27]">
                <User :size="18" :stroke-width="2.5" />
              </div>
              <h2 class="text-lg font-black tracking-tight text-slate-800">1. 被保險人資訊</h2>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
              <div class="flex w-full flex-col space-y-2">
                <div class="flex items-center space-x-1.5">
                  <label class="text-[14px] font-bold tracking-tight text-slate-700">
                    身分證字號 <span class="ml-0.5 text-rose-500">*</span>
                  </label>
                  <div class="group relative">
                    <Info :size="14" class="cursor-help text-slate-300" />
                    <span class="pointer-events-none absolute bottom-full left-1/2 mb-3 w-60 -translate-x-1/2 scale-95 rounded-xl bg-slate-800 p-2.5 text-[11px] leading-relaxed text-white opacity-0 shadow-2xl transition-all group-hover:scale-100 group-hover:opacity-100">
                      要保人與行照車主需為同一人。
                    </span>
                  </div>
                </div>
                <div class="group relative">
                  <div class="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#7FBF27]">
                    <CreditCard :size="18" />
                  </div>
                  <input type="text" placeholder="請輸入身分證字號" :class="`${inputBaseStyle} pl-12`" />
                </div>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  出生日期 (民國) <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <input type="text" placeholder="年" :class="`${inputBaseStyle} px-2 text-center`" />
                  <input type="text" placeholder="月" :class="`${inputBaseStyle} px-2 text-center`" />
                  <input type="text" placeholder="日" :class="`${inputBaseStyle} px-2 text-center`" />
                </div>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  手機號碼 <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <div class="group relative">
                  <div class="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#7FBF27]">
                    <Phone :size="18" />
                  </div>
                  <input type="text" placeholder="09XX-XXX-XXX" :class="`${inputBaseStyle} pl-12`" />
                </div>
              </div>
            </div>
          </section>

          <section class="space-y-6 rounded-[20px] border border-slate-100 bg-slate-50 p-8">
            <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div class="flex items-center space-x-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7FBF27] text-white shadow-lg shadow-[#7FBF27]/20">
                  <ShieldCheck :size="20" :stroke-width="2.5" />
                </div>
                <h2 class="text-md font-black tracking-tight text-slate-800">本次是否投保車體險 / 竊盜險？</h2>
              </div>
              <div class="flex w-fit rounded-xl bg-slate-200 p-1.5">
                <button class="rounded-lg border border-slate-100 bg-white px-8 py-2 text-xs font-black text-slate-800 shadow-sm transition-all">是</button>
                <button class="px-8 py-2 text-xs font-black text-slate-500 transition-all hover:text-slate-700">否</button>
              </div>
            </div>

            <div class="grid gap-3 md:grid-cols-2">
              <div class="flex items-start rounded-2xl border border-amber-100/50 bg-amber-50 p-4">
                <AlertCircle :size="14" class="mt-0.5 mr-2.5 shrink-0 text-amber-500" />
                <p class="text-[14px] leading-relaxed font-bold text-amber-900">
                  無法投保：(1) 電動車 (2) 車齡 15 年以上 (3) 乘載人數 &lt; 5 人
                </p>
              </div>
              <div class="flex items-start rounded-2xl border border-[#7FBF27]/20 bg-[#7FBF27]/5 p-4">
                <Info :size="14" class="mt-0.5 mr-2.5 shrink-0 text-[#7FBF27]" />
                <p class="text-[14px] leading-relaxed font-bold text-slate-800">
                  需與原投保保障範圍相同方可網路投保。
                </p>
              </div>
            </div>
          </section>

          <section class="space-y-8">
            <div class="space-y-8">
              <hr class="border-0 border-t border-[#D3DDE8]" />
              <div class="flex items-center space-x-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7FBF27]/10 text-[#7FBF27]">
                  <Car :size="18" :stroke-width="2.5" />
                </div>
                <h2 class="text-lg font-black tracking-tight text-slate-800">2. 車輛詳細資訊</h2>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  牌照號碼 <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <div class="flex items-center space-x-3">
                  <input type="text" placeholder="ABC" :class="`${inputBaseStyle} px-3 text-center uppercase`" />
                  <div class="h-1 w-3 shrink-0 rounded-full bg-slate-200"></div>
                  <input type="text" placeholder="1234" :class="`${inputBaseStyle} px-3 text-center uppercase`" />
                </div>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  出廠年月 (西元) <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <select :class="`${inputBaseStyle} appearance-none px-3`">
                    <option>年份</option>
                    <option v-for="year in years" :key="year">{{ year }}</option>
                  </select>
                  <select :class="`${inputBaseStyle} appearance-none px-3`">
                    <option>月份</option>
                    <option v-for="month in months" :key="month">{{ month }}</option>
                  </select>
                </div>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  排氣量 (CC數) <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <div class="flex h-full items-center space-x-3 pt-1">
                  <div class="shrink-0 space-x-2 flex items-center">
                    <div class="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#7FBF27] p-1">
                      <div class="h-full w-full rounded-full bg-[#7FBF27]"></div>
                    </div>
                    <span class="text-xs font-bold text-slate-600">燃油</span>
                  </div>
                  <div class="relative flex-1">
                    <input type="text" placeholder="CC" :class="`${inputBaseStyle} pr-10 text-right`" />
                    <span class="absolute top-1/2 right-4 -translate-y-1/2 text-[10px] font-medium text-slate-400">cc</span>
                  </div>
                </div>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  車輛種類 <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <select :class="`${inputBaseStyle} appearance-none`">
                  <option>自用小客車</option>
                  <option>營業用小客車</option>
                </select>
              </div>

              <div class="flex w-full flex-col space-y-2 md:col-span-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  廠牌 / 型號 <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <div class="flex flex-col gap-3 sm:flex-row">
                  <button class="flex shrink-0 items-center justify-center space-x-2 rounded-2xl bg-[#7FBF27] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#7FBF27]/20 transition-all hover:bg-[#7FBF27]/90">
                    <Search :size="16" />
                    <span>選擇型號</span>
                  </button>
                  <div class="flex flex-1 gap-2">
                    <input type="text" readonly placeholder="廠牌" class="w-1/3 cursor-not-allowed rounded-xl border border-slate-100 bg-slate-100 px-4 py-3.5 text-sm font-medium text-slate-400" />
                    <input type="text" readonly placeholder="型號" class="w-2/3 cursor-not-allowed rounded-xl border border-slate-100 bg-slate-100 px-4 py-3.5 text-sm font-medium text-slate-400" />
                  </div>
                </div>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  乘載人數 (含駕駛) <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <select :class="`${inputBaseStyle} appearance-none`">
                  <option>5 人</option>
                  <option>7 人</option>
                </select>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">引擎號碼</label>
                <div class="group relative">
                  <div class="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#7FBF27]">
                    <Hash :size="18" />
                  </div>
                  <input type="text" placeholder="或填車身號碼" :class="`${inputBaseStyle} pl-12`" />
                </div>
              </div>

              <div class="flex w-full flex-col space-y-2">
                <label class="text-[14px] font-bold tracking-tight text-slate-700">
                  發照日期 (民國) <span class="ml-0.5 text-rose-500">*</span>
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <input type="text" placeholder="年" :class="`${inputBaseStyle} px-2 text-center`" />
                  <input type="text" placeholder="月" :class="`${inputBaseStyle} px-2 text-center`" />
                  <input type="text" placeholder="日" :class="`${inputBaseStyle} px-2 text-center`" />
                </div>
              </div>
            </div>
          </section>

          <section class="space-y-6">
            <div class="space-y-8">
              <hr class="border-0 border-t border-[#D3DDE8]" />
              <div class="flex items-center space-x-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7FBF27]/10 text-[#7FBF27]">
                  <FileText :size="18" :stroke-width="2.5" />
                </div>
                <h2 class="text-lg font-black tracking-tight text-slate-800">3. 告知義務與聲明事項</h2>
              </div>
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
                <div class="h-64 overflow-y-auto p-6 text-[13px] leading-relaxed text-slate-600">
                  <div v-if="termsTab === 1" class="space-y-4 font-medium">
                    <p class="font-bold text-slate-800">南山產物保險股份有限公司個資法告知事項：</p>
                    <p>一、蒐集之目的：人身保險(OO一)、行銷(O四O)、金融服務業依法令規定及金融監理需要，所為之蒐集處理及利用(O五九)、非公務機關依法定義務所進行個人資料之蒐集處理及利用(O六三)、契約、類似契約或其他法律關係事務(O六九)、消費者、客戶管理與服務(O九O)、財產保險(O九三)、調查、統計與研究分析(一五七)及其他經營合於營業登記項目或組織章程所定之業務(一八一)。</p>
                    <p>二、蒐集之個人資料類別：姓名、身分證統一編號、護照號碼、出生年月日、性別、聯絡方式、病歷、醫療、健康檢查、旅行細節、汽機車牌照號碼、行照資料、財務資料、家庭成員及其姓名、身分證統一編號與出生年月日、以及網站瀏覽、查詢或付款時伺服器自行產生之相關紀錄。</p>
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
                    <ChevronDown :size="12" class="mr-1 animate-bounce" />
                    請滑動頁面詳閱完整內容
                  </p>
                </div>
              </div>

              <div class="space-y-4 border-t border-slate-100 bg-slate-100/30 p-6">
                <label class="group flex cursor-pointer items-center space-x-3">
                  <div class="relative flex items-center justify-center">
                    <input type="checkbox" class="peer h-5 w-5 appearance-none rounded-lg border-2 border-slate-300 transition-all checked:border-[#7FBF27] checked:bg-[#7FBF27]" />
                    <CheckCircle2 :size="14" class="absolute scale-0 text-white transition-transform peer-checked:scale-100" />
                  </div>
                  <span class="text-xs font-bold text-slate-700 transition-colors group-hover:text-[#7FBF27]">我已詳細閱讀並同意上述告知內容與聲明事項</span>
                </label>
              </div>
            </div>
          </section>
        </div>

        <div class="mt-4 hidden items-center justify-center border-t border-slate-100 bg-slate-50/60 px-8 py-8 lg:flex lg:px-12">
          <div class="flex items-center gap-6">
            <button class="min-w-[168px] rounded-2xl border border-slate-200 bg-white px-10 py-5 text-sm font-black text-slate-400 transition-all hover:bg-slate-50 active:scale-95">
              上一步
            </button>
            <button
              type="button"
              @click="router.push({ name: 'quote-flow-selection' })"
              class="group inline-flex min-w-[232px] items-center justify-center rounded-2xl bg-[#7FBF27] px-12 py-5 text-lg font-black text-white transition-all hover:bg-[#7FBF27]/90 active:scale-95"
            >
              下一步試算
              <ChevronRight :size="20" class="ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </main>

    <div class="fixed right-0 bottom-0 left-0 z-50 flex flex-col space-y-3 border-t border-slate-100 bg-white/90 p-4 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl lg:hidden">
      <div class="flex items-start space-x-2 px-1">
        <AlertCircle :size="14" class="mt-0.5 shrink-0 text-amber-500" />
        <p class="text-[10px] leading-tight font-bold text-slate-500">若乘載人數未達 5 人，將無法網路投保車體險。</p>
      </div>
      <div class="flex space-x-3">
        <button class="flex-1 rounded-xl border border-slate-200 py-4 text-sm font-bold text-slate-400">上一步</button>
        <button
          type="button"
          @click="router.push({ name: 'quote-flow-selection' })"
          class="flex flex-[2] items-center justify-center rounded-xl bg-[#7FBF27] py-4 text-md font-black text-white"
        >
          下一步試算
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
