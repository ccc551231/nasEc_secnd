<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  AlertTriangle,
  Bike,
  Car,
  ChevronDown,
  ExternalLink,
  FileEdit,
  FileText,
  HelpCircle,
  Home,
  Info,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  Plane,
  Settings,
  ShieldCheck,
  Upload,
  User,
  X,
  Zap,
} from 'lucide-vue-next';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import contactPhone from '../assets/contact-phone.png';
import generalLogo from '../assets/general-logo.svg';

const route = useRoute();
const router = useRouter();

const showHomeContactBar = computed(() => route.name === 'home');
const isQuoteFlowPage = computed(() => typeof route.path === 'string' && route.path.startsWith('/quote-flow'));

const footerLinks = [
  '電子商務自律規範',
  '主管機關網站',
  '隱私權保護聲明',
  '會員服務條款(含個資告知)',
  '網路使用條款',
  '服務據點',
];

const isMenuOpen = ref(false);
const activeTab = ref(null);
const expandedMobileTab = ref(null);
const scrolled = ref(false);

const products = [
  { title: '汽車保險', desc: '完善保障，開車更安心', icon: Car, route: { name: 'quote-flow' } },
  { title: '機車保險', desc: '騎士首選，給您全面防護', icon: Bike, route: { name: 'travel-insurance' } },
  { title: '電動機車險', desc: '專屬電能守護，智慧出行', icon: Zap, route: { name: 'travel-insurance' } },
  { title: '旅遊保險', desc: '國內外旅遊，保障不缺席', icon: Plane, route: { name: 'travel-insurance' } },
];

const applyList = [
  { title: '汽車保險', icon: Car, route: { name: 'quote-flow' } },
  { title: '機車保險', icon: Bike, route: { name: 'travel-insurance' } },
  { title: '電動機車險', icon: Zap, route: { name: 'travel-insurance' } },
  { title: '旅遊保險', icon: Plane, route: { name: 'travel-insurance' } },
];

const renewList = [
  { title: '汽車保險', icon: Car, route: { name: 'quote-flow-renewal' } },
  { title: '機車保險', icon: Bike, route: { name: 'quote-flow-renewal' } },
];

const serviceCategories = [
  {
    title: '投保進度',
    color: '#0054A6',
    lightColor: '#eff6ff',
    items: [
      { name: '汽車險保單', icon: Car },
      { name: '機車險保單', icon: Bike },
      { name: '旅遊險保單', icon: Plane },
      { name: '居家綜合險保單', icon: Home },
    ],
  },
  {
    title: '理賠服務',
    color: '#0054A6',
    lightColor: '#eff6ff',
    items: [
      { name: '旅行延誤事故通知', icon: AlertTriangle },
      { name: '海外緊急救援專線', icon: Phone },
      { name: '理賠Q&A', icon: Info },
      { name: '車險線上事故通報', icon: AlertTriangle },
      { name: '車險照會文件上傳', icon: Upload },
    ],
  },
  {
    title: '保單服務',
    color: '#86BC25',
    lightColor: '#f7fee7',
    items: [{ name: '保單變更', icon: FileEdit }],
  },
  {
    title: '會員中心',
    color: '#0054A6',
    lightColor: '#eff6ff',
    items: [{ name: '會員資料修改', icon: Settings }],
  },
];

function handleScroll() {
  scrolled.value = window.scrollY > 20;
}

function toggleMobileTab(tab) {
  expandedMobileTab.value = expandedMobileTab.value === tab ? null : tab;
}

function closeMenus() {
  activeTab.value = null;
  isMenuOpen.value = false;
  expandedMobileTab.value = null;
}

function navigateTo(target) {
  closeMenus();
  router.push(target);
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-[#E4EEF7] text-slate-900 selection:bg-blue-100">
    <nav
      :class="[
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-[#e8edf3] bg-white/95 py-2 shadow-md backdrop-blur-md'
          : 'border-b border-[#e8edf3] bg-white py-4',
      ]"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <RouterLink :to="{ name: 'home' }" class="flex shrink-0 items-center self-center gap-3">
            <img :src="generalLogo" alt="Nan Shan 網路投保中心" class="h-8 w-auto sm:h-9" />
            <span class="hidden h-6 w-px self-center bg-[#cdd9e5] sm:block"></span>
            <span class="hidden self-center leading-none text-[15px] font-bold tracking-wide text-[#0054A6] sm:block">網路投保中心</span>
          </RouterLink>

          <div class="hidden items-center space-x-2 lg:flex">
            <button
              type="button"
              @mouseenter="activeTab = 'products'"
              :class="[
                'flex items-center space-x-1 rounded-full px-5 py-2 text-[15px] font-bold transition-all',
                activeTab === 'products' ? 'bg-blue-50 text-[#0054A6]' : 'text-gray-700 hover:text-[#0054A6]',
              ]"
            >
              <span>熱賣商品</span>
              <ChevronDown :class="['h-4 w-4 transition-transform duration-300', activeTab === 'products' ? 'rotate-180' : '']" />
            </button>

            <button
              type="button"
              @mouseenter="activeTab = 'renewal'"
              :class="[
                'flex items-center space-x-1 rounded-full px-5 py-2 text-[15px] font-bold transition-all',
                activeTab === 'renewal' ? 'bg-blue-50 text-[#0054A6]' : 'text-gray-700 hover:text-[#0054A6]',
              ]"
            >
              <span>投保 / 續保</span>
              <ChevronDown :class="['h-4 w-4 transition-transform duration-300', activeTab === 'renewal' ? 'rotate-180' : '']" />
            </button>

            <button
              type="button"
              @mouseenter="activeTab = 'services'"
              :class="[
                'flex items-center space-x-1 rounded-full px-5 py-2 text-[15px] font-bold transition-all',
                activeTab === 'services' ? 'bg-blue-50 text-[#0054A6]' : 'text-gray-700 hover:text-[#0054A6]',
              ]"
            >
              <span>保戶服務</span>
              <ChevronDown :class="['h-4 w-4 transition-transform duration-300', activeTab === 'services' ? 'rotate-180' : '']" />
            </button>
          </div>

          <div class="hidden items-center space-x-4 md:flex">
            <button class="rounded-full bg-[#0054A6] px-6 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#00488f]">
              註冊
            </button>
            <button class="rounded-full bg-[#86BC25] px-6 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-lime-600">
              登入
            </button>
          </div>

          <div class="flex items-center space-x-1 lg:hidden">
            <button
              type="button"
              @click="isMenuOpen = !isMenuOpen"
              :class="[
                'rounded-lg p-2 transition-colors',
                isMenuOpen ? 'bg-blue-50 text-[#0054A6]' : 'text-gray-600',
              ]"
            >
              <X v-if="isMenuOpen" class="h-7 w-7" />
              <Menu v-else class="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      <div
        :class="[
          'absolute top-full left-0 hidden w-full origin-top border-t border-gray-100 bg-white shadow-2xl transition-all duration-300 lg:block',
          activeTab ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-0 opacity-0',
        ]"
        @mouseenter.stop
        @mouseleave="activeTab = null"
      >
        <div class="mx-auto flex min-h-[420px] max-w-7xl">
          <div class="flex-1 p-10">
            <div v-if="activeTab === 'products'" class="grid grid-cols-2 gap-x-10 gap-y-6">
              <div class="col-span-2 mb-2">
                <h3 class="border-l-[6px] border-[#0054A6] pl-4 text-xl font-bold text-[#0054A6]">熱賣商品</h3>
              </div>
              <button
                v-for="item in products"
                :key="item.title"
                type="button"
                class="group flex items-center rounded-2xl p-4 text-left transition-all hover:bg-blue-50/50"
                @click="navigateTo(item.route)"
              >
                <div class="rounded-xl bg-blue-50 p-3 text-[#0054A6] transition-all duration-300 group-hover:bg-[#0054A6] group-hover:text-white">
                  <component :is="item.icon" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <p class="text-[17px] font-bold text-gray-800">{{ item.title }}</p>
                  <p class="mt-0.5 text-sm text-gray-400">{{ item.desc }}</p>
                </div>
              </button>
            </div>

            <div v-else-if="activeTab === 'renewal'" class="grid grid-cols-2 gap-x-12">
              <div>
                <h3 class="mb-8 border-l-[6px] border-[#0054A6] pl-4 text-xl font-bold text-[#0054A6]">我要投保</h3>
                <div class="space-y-3">
                  <button
                    v-for="item in applyList"
                    :key="item.title"
                    type="button"
                    class="group flex w-full items-center rounded-xl p-2 text-left transition-all hover:bg-blue-50"
                    @click="navigateTo(item.route)"
                  >
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0054A6] transition-colors group-hover:bg-[#0054A6] group-hover:text-white">
                      <component :is="item.icon" class="h-4 w-4" />
                    </div>
                    <span class="ml-4 text-[16px] font-bold text-gray-700 group-hover:text-blue-700">{{ item.title }}</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 class="mb-8 border-l-[6px] border-[#86BC25] pl-4 text-xl font-bold text-[#0054A6]">我要續保</h3>
                <div class="space-y-3">
                  <button
                    v-for="item in renewList"
                    :key="item.title"
                    type="button"
                    class="group flex w-full items-center rounded-xl p-2 text-left transition-all hover:bg-green-50"
                    @click="navigateTo(item.route)"
                  >
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-colors group-hover:bg-[#86BC25] group-hover:text-white">
                      <component :is="item.icon" class="h-4 w-4" />
                    </div>
                    <span class="ml-4 text-[16px] font-bold text-gray-700 group-hover:text-green-700">{{ item.title }}</span>
                  </button>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'services'" class="grid grid-cols-4 gap-x-6">
              <div v-for="cat in serviceCategories" :key="cat.title">
                <h3 class="mb-8 border-l-[6px] pl-4 text-xl font-bold text-[#0054A6]" :style="{ borderLeftColor: cat.color }">
                  {{ cat.title }}
                </h3>
                <div class="space-y-2">
                  <button
                    v-for="item in cat.items"
                    :key="item.name"
                    type="button"
                    class="group flex w-full items-center rounded-xl p-2 text-left transition-all hover:bg-slate-50"
                  >
                    <div
                      class="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
                      :style="{ backgroundColor: cat.lightColor, color: cat.color }"
                    >
                      <component :is="item.icon" class="h-4 w-4" />
                    </div>
                    <span class="ml-3 text-[15px] font-bold text-gray-600 transition-colors group-hover:text-blue-700">
                      {{ item.name }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex w-[320px] flex-col space-y-4 border-l border-gray-100 bg-gray-50/50 p-10">
            <p class="mb-2 text-[12px] font-bold tracking-widest text-gray-400 uppercase">快捷服務</p>
            <a href="#" class="group flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <span class="text-[16px] font-bold text-gray-700">常見問題</span>
              <ChevronDown class="h-4 w-4 -rotate-90 text-gray-300 group-hover:text-[#0054A6]" />
            </a>
            <a href="#" class="group flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <span class="text-[16px] font-bold text-gray-700">服務據點</span>
              <ExternalLink class="h-4 w-4 text-gray-300 group-hover:text-[#0054A6]" />
            </a>
            <div class="mt-auto rounded-2xl bg-[#0054A6] p-6 text-white">
              <p class="text-[11px] font-medium opacity-80">24小時服務專線</p>
              <p class="mt-1 text-[22px] font-black">0800-020-060</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isMenuOpen"
        class="h-[calc(100vh-80px)] overflow-y-auto border-t border-gray-100 bg-white px-5 py-6 animate-in slide-in-from-right duration-300 lg:hidden"
      >
        <div class="space-y-4">
          <div class="border-b border-gray-50">
            <button
              type="button"
              @click="toggleMobileTab('products')"
              class="flex w-full items-center justify-between py-4 text-[19px] font-black text-[#0054A6]"
            >
              <span>熱賣商品</span>
              <ChevronDown :class="['h-6 w-6 transition-transform', expandedMobileTab === 'products' ? 'rotate-180 text-[#0054A6]' : 'text-gray-300']" />
            </button>
            <div v-if="expandedMobileTab === 'products'" class="grid grid-cols-1 gap-3 pb-6">
              <button
                v-for="item in products"
                :key="item.title"
                type="button"
                class="flex items-center rounded-xl p-3 text-left hover:bg-gray-50"
                @click="navigateTo(item.route)"
              >
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0054A6]">
                  <component :is="item.icon" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <p class="text-[16px] font-bold text-gray-700">{{ item.title }}</p>
                  <p class="mt-0.5 text-[13px] text-gray-400">{{ item.desc }}</p>
                </div>
              </button>
            </div>
          </div>

          <div class="border-b border-gray-50">
            <button
              type="button"
              @click="toggleMobileTab('renewal')"
              class="flex w-full items-center justify-between py-4 text-[19px] font-black text-[#0054A6]"
            >
              <span>投保 / 續保</span>
              <ChevronDown :class="['h-6 w-6 transition-transform', expandedMobileTab === 'renewal' ? 'rotate-180 text-[#0054A6]' : 'text-gray-300']" />
            </button>
            <div v-if="expandedMobileTab === 'renewal'" class="space-y-6 pb-6">
              <div>
                <h3 class="mb-4 border-l-[6px] border-[#0054A6] pl-3 text-[17px] font-black text-[#0054A6]">我要投保</h3>
                <div class="grid grid-cols-1 gap-2">
                  <button
                    v-for="item in applyList"
                    :key="item.title"
                    type="button"
                    class="flex items-center rounded-xl p-3 text-left hover:bg-gray-50"
                    @click="navigateTo(item.route)"
                  >
                    <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0054A6]">
                      <component :is="item.icon" class="h-4 w-4" />
                    </div>
                    <span class="ml-3 text-[16px] font-bold text-gray-700">{{ item.title }}</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 class="mb-4 border-l-[6px] border-[#86BC25] pl-3 text-[17px] font-black text-[#0054A6]">我要續保</h3>
                <div class="grid grid-cols-1 gap-2">
                  <button
                    v-for="item in renewList"
                    :key="item.title"
                    type="button"
                    class="flex items-center rounded-xl p-3 text-left hover:bg-gray-50"
                    @click="navigateTo(item.route)"
                  >
                    <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <component :is="item.icon" class="h-4 w-4" />
                    </div>
                    <span class="ml-3 text-[16px] font-bold text-gray-700">{{ item.title }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b border-gray-50">
            <button
              type="button"
              @click="toggleMobileTab('services')"
              class="flex w-full items-center justify-between py-4 text-[19px] font-black text-[#0054A6]"
            >
              <span>保戶服務</span>
              <ChevronDown :class="['h-6 w-6 transition-transform', expandedMobileTab === 'services' ? 'rotate-180 text-[#0054A6]' : 'text-gray-300']" />
            </button>
            <div v-if="expandedMobileTab === 'services'" class="space-y-6 pb-6">
              <div v-for="cat in serviceCategories" :key="cat.title">
                <h3 class="mb-4 border-l-[6px] pl-3 text-[17px] font-black text-[#0054A6]" :style="{ borderLeftColor: cat.color }">
                  {{ cat.title }}
                </h3>
                <div class="grid grid-cols-1 gap-1">
                  <button
                    v-for="item in cat.items"
                    :key="item.name"
                    type="button"
                    class="flex items-center rounded-xl p-3 text-left active:bg-gray-50"
                  >
                    <div class="flex h-9 w-9 items-center justify-center rounded-lg shadow-sm" :style="{ backgroundColor: cat.lightColor, color: cat.color }">
                      <component :is="item.icon" class="h-4 w-4" />
                    </div>
                    <span class="ml-4 text-[15px] font-bold text-gray-600">{{ item.name }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6 pt-8">
            <div class="grid grid-cols-2 gap-4">
              <button class="w-full rounded-2xl bg-[#0054A6] py-4 text-[16px] font-bold text-white shadow-lg shadow-blue-100">註冊</button>
              <button class="w-full rounded-2xl bg-[#86BC25] py-4 text-[16px] font-bold text-white shadow-lg shadow-lime-100">登入</button>
            </div>

            <div class="grid grid-cols-1 gap-3">
              <a href="#" class="flex items-center justify-between rounded-2xl bg-gray-50 p-4 text-[16px] font-bold text-gray-700">
                <span class="flex items-center"><HelpCircle class="mr-3 h-5 w-5 text-blue-500" /> 常見問題</span>
                <ExternalLink class="h-4 w-4 text-gray-300" />
              </a>
              <a href="#" class="flex items-center justify-between rounded-2xl bg-gray-50 p-4 text-[16px] font-bold text-gray-700">
                <span class="flex items-center"><MapPin class="mr-3 h-5 w-5 text-blue-500" /> 服務據點</span>
                <ExternalLink class="h-4 w-4 text-gray-300" />
              </a>
            </div>

            <div class="rounded-2xl bg-[#0054A6] p-6 text-white shadow-md">
              <p class="text-[12px] font-bold tracking-wider opacity-80 uppercase">24H 服務專線</p>
              <p class="mt-1 text-[26px] font-black tracking-tight">0800-020-060</p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view />

    <div v-if="showHomeContactBar" class="mt-8 w-full bg-white px-4 py-4 md:px-4">
      <div class="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-6 md:flex-row md:gap-14">
        <div class="flex items-center gap-8">
          <img :src="contactPhone" alt="電話插圖" class="h-24 w-auto object-contain" />
          <div>
            <p class="text-[26px] leading-none font-black tracking-tight text-[#0A254A] md:text-[32px]">0800-005-678</p>
            <p class="mt-2 text-[14px] font-black text-slate-600">理賠服務專線</p>
          </div>
        </div>

        <div class="hidden h-18 w-px bg-[#cfd8e3] md:block"></div>

        <div class="flex items-center gap-8">
          <div>
            <p class="text-[26px] leading-none font-black tracking-tight text-[#0A254A] md:text-[32px]">0800-020-060#2</p>
            <p class="mt-2 text-[14px] font-black text-slate-600">網路投保服務專線</p>
          </div>
        </div>
      </div>
    </div>

    <footer id="service" class="relative z-20 w-full">
      <div
        :class="[
          'relative py-8',
          isQuoteFlowPage ? 'border-b border-[#c8d8e6] bg-[#E4EEF7]' : 'border-b border-white/10 bg-[#2E68B2]',
        ]"
      >
        <div
          :class="[
            'mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-4 px-6 text-sm font-bold tracking-widest uppercase',
            isQuoteFlowPage ? 'text-[#001D3D]' : 'text-white',
          ]"
        >
          <a
            v-for="item in footerLinks"
            :key="item"
            href="#"
            :class="[
              'whitespace-nowrap transition-colors',
              isQuoteFlowPage ? 'hover:text-[#0E73C8]' : 'hover:text-green-300',
            ]"
          >
            {{ item }}
          </a>
        </div>
      </div>

      <div class="bg-[#001529] pt-12 pb-16 text-white/90">
        <div class="mx-auto flex max-w-7xl flex-col items-end justify-between gap-12 px-6 md:flex-row">
          <div class="space-y-6 text-center text-sm font-medium opacity-80 md:text-left">
            <p class="mb-4 text-lg font-bold tracking-tight">南山產物總公司 台北市中正區忠孝西路一段6號19樓</p>
            <p class="tracking-widest">電話客服中心：0800-020-060按2 (營業時間：早上9：00~下午5：30)</p>
            <p class="mt-8 text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">
              Copyright © Nan Shan General Insurance Company, Ltd. All rights reserved. 建議瀏覽器：Chrome, Safari, Edge 最新版本
            </p>
          </div>

          <div class="flex items-center gap-6">
            <a href="#" class="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/5 bg-[#415568] shadow-2xl transition-all hover:-translate-y-1 hover:bg-[#06c755]">
              <span class="text-xs font-black tracking-tighter text-white uppercase transition-transform group-hover:scale-110">LINE</span>
            </a>
            <RouterLink :to="{ name: 'home' }" class="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/5 bg-[#415568] shadow-2xl transition-all hover:-translate-y-1 hover:bg-[#0054A6]">
              <Home class="h-6 w-6 text-white transition-transform group-hover:scale-110" />
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
