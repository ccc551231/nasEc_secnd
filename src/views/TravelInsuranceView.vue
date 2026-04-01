<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Star,
  X,
} from 'lucide-vue-next';
import cardMoney from '../assets/card-money.svg';
import cardPig from '../assets/card-pig.svg';
import heroPlane from '../assets/hero-plane.png';
import people from '../assets/people.png';

const activeFaq = ref(null);
const activeTab = ref('商品特色');
const isModalOpen = ref(false);
const pageRoot = ref(null);
const featureSection = ref(null);
const faqSection = ref(null);
const modalType = ref('投保規則');
let revealObserver;

const tabs = ['商品特色', '投保規則', '保障範圍', '保單條款', '常見問題'];

const faqs = [
  {
    q: 'Q1：可以幫同行家人投保嗎?',
    a: '不行，本專案僅限本人自行投保。',
  },
  {
    q: 'Q2：投保旅遊保險（旅平險＋不便險）需要準備哪些資料？',
    a: [
      '要保人與被保險人資料：姓名、身分證號碼、出生年月日、聯絡資訊。',
      '護照資訊：護照英文姓名與護照號碼（如需申請英文投保證明）。',
      '旅遊資訊：出發日期、返國日期、旅遊地區。',
    ],
  },
  {
    q: 'Q3：「新旅遊御守專案」保險保障範圍及投保年齡/保險金額/投保天數之限制？',
    a: [
      '保險保障範圍',
      '意外身故（喪葬費用）或失能保險金。',
      '傷害醫療保險金（實支實付）。',
      '海外突發疾病醫療保險。',
      '海外旅行不便保險。',
      '緊急救援費用保險。',
      '第三人責任保險。',
      '投保年齡/保險金額/投保天數：',
      '單位：新臺幣元',
      '20歲 ~ 未滿65歲：有效契約保戶最高1,200萬。',
      '18歲 ~ 未滿20歲 / 65歲 ~ 未滿75歲：有效契約保戶最高500萬。',
      '75歲 ~ 未滿85歲：有效契約保戶最高200萬。',
      '投保天數：海外最長180天；非有效契約保戶海外最長30天。',
      '註：有效契約保戶係指已擁有本公司其他任一商品未到期保單之被保險人。',
    ],
  },
  {
    q: 'Q4：國外旅遊地區有哪些？',
    a: '係指台、澎、金、馬以外地區。',
  },
  {
    q: 'Q5：如旅遊地點屬外交部國外旅遊警示分級表的紅色警示地區，可否承保？',
    a: '紅色警示地區（建議避免前往地區）不予承保。投保前請先確認旅遊國家是否列入外交部國外旅遊警示分級表之紅色警示。',
  },
  {
    q: 'Q6：若旅遊地點有跨越時區，保險期間如何計算？',
    a: '保險期間的時日以保單簽署地（台灣）時間為準。即便跨越時區，仍以台灣時間判定保障起迄。',
  },
  {
    q: 'Q7：投保完成後，發現資料填寫錯誤，該如何處理？',
    a: '投保資料錯誤可能影響保險權益，請於服務時間致電客服中心（0800-020-060按2）辦理資料批改作業。',
  },
  {
    q: 'Q8：旅遊期間發生事故，被保險人應注意哪些事項？',
    a: [
      '1. 優先確保人身安全，並向可協助機構尋求協助（如警察機關、司法機關、大使館、國際紅十字會等）。',
      '2. 取得事故的證明文件，如報案紀錄、航空公司或機場的延誤證明、行李托運紀錄等相關證明。',
      '3. 保留完整的費用證明，包括住宿、交通、醫療單據等正本與損失清單。',
    ],
  },
  {
    q: 'Q9：海外突發疾病醫療包括哪些？',
    a: [
      '海外突發疾病醫療保障包含被保險人在國外因突發疾病所接受的必要醫療支出（含門診、急診、住院及返國住院）。',
      '突發疾病之醫療費用',
      '法定傳染病之必要醫療處置',
      '醫生診察費、處置費',
      '檢查費、放射線與實驗室檢驗費',
      '藥品費',
      '必要之住院醫療費用',
      '其他依保單條款規範之必要醫療支出',
      '於美國、加拿大、歐洲、日本、紐澳等高醫療費用地區，依條款約定加倍保障。',
    ],
  },
];

const noticeItems = [
  '投保規範及注意事項',
  '保險單條款下載',
  '理賠申請文件清單',
  '網路投保服務聲明',
];

const noticeModalMap = {
  '投保規範及注意事項': '投保規則',
  '保險單條款下載': '保單條款',
  '理賠申請文件清單': '保障範圍',
  '網路投保服務聲明': '投保規則',
};

const modalRules = [
  '若以網路方式註冊者，累積同業網路投保之保險金額以1,200萬元為限。',
  '被保險人不得重複投保本公司旅行險，累計不得超過2家保險公司。',
  '保險期間≧90天者，保額以500萬/傷害醫療50萬/突發疾病50萬為限。',
  '投保旅平險係以旅遊、商務、遊學為目的；若以工作為目的，請投保傷害醫療險。',
];

const modalConfig = {
  投保規則: {
    title: '投保規則',
    intro: '要保人及被保險人須為同一人，且必須身在台、澎、金、馬地區者，於旅行出發前 1 小時完成投保，即可享有旅行保障。',
    tableLabel: '單位:新台幣元',
    table: {
      headers: ['投保年齡', '20-65歲', '18-75歲', '75-85歲'],
      rows: [['最高保額', '1,200萬', '500萬', '200萬']],
    },
    bullets: modalRules,
    notices: [
      '消費者於投保前，應審慎瞭解本保險商品之承保範圍及風險。',
      '本保險商品一切權利義務，悉依保單條款為準。',
    ],
    footer: '※ 詳細投保規則請以官方公告為準。',
  },
  保障範圍: {
    title: '保障範圍',
    intro: '本專案提供旅遊平安、傷害醫療、海外突發疾病、旅行不便與緊急救援等保障，依投保方案內容提供對應保護。',
    tableLabel: '主要保障項目',
    table: {
      headers: ['保障項目', '內容摘要'],
      rows: [
        ['旅平險', '意外身故或失能保障'],
        ['傷害醫療', '實支實付醫療費用'],
        ['海外突發疾病', '門診、急診、住院皆有保障'],
        ['旅遊不便險', '班機延誤、行李延誤、文件損失'],
      ],
    },
    bullets: [
      '海外突發疾病醫療包含門診、急診、住院及返國後住院續療。',
      '旅行不便險保障班機延誤、行李延誤、旅程取消、旅程更改等常見風險。',
      '不論保額高低，皆可享有緊急救援服務。',
      '詳細給付條件、限額與除外責任請以正式條款內容為準。',
    ],
    notices: [
      '實際承保範圍及金額，仍應以投保方案及保單條款記載為準。',
      '不同年齡、地區與旅程天數，保障內容與限額可能有所差異。',
    ],
    footer: '※ 建議投保前再次確認旅遊地區與保障需求。',
  },
  保單條款: {
    title: '保單條款',
    intro: '保險契約之承保範圍、除外責任、理賠文件與作業程序，均以正式保單條款及附加條款約定內容為準。',
    tableLabel: '條款重點',
    table: {
      headers: ['項目', '說明'],
      rows: [
        ['承保範圍', '依投保方案與附加條款而定'],
        ['除外責任', '依條款列示之不保事項辦理'],
        ['理賠申請', '須備齊事故與費用相關證明文件'],
      ],
    },
    bullets: [
      '網路投保完成後，電子保單將寄送至指定信箱。',
      '若需紙本保單或保單補發，請依客服指示辦理。',
      '被保險人應妥善保存保單及相關投保文件，以利後續查詢與理賠。',
      '如有批改需求，請於服務時間聯繫客服中心。',
    ],
    notices: [
      '保單條款內容屬保險契約一部分，投保前請務必詳細閱讀。',
      '若有疑義，請洽客服中心或服務據點說明。',
    ],
    footer: '※ 正式條款內容以本公司核發保單及附加條款為準。',
  },
};

const currentModal = computed(() => modalConfig[modalType.value]);

watch(isModalOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : 'unset';
});

onBeforeUnmount(() => {
  document.body.style.overflow = 'unset';
  revealObserver?.disconnect();
});

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const scrollToSection = (targetRef) => {
  targetRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const openTabAction = (tab) => {
  activeTab.value = tab;

  if (tab === '商品特色') {
    scrollToSection(featureSection);
    return;
  }

  if (tab === '常見問題') {
    scrollToSection(faqSection);
    return;
  }

  modalType.value = tab;
  isModalOpen.value = true;
};

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

  pageRoot.value.querySelectorAll('[data-reveal], [data-plane-reveal]').forEach((element) => {
    revealObserver.observe(element);
  });
});
</script>

<template>
  <div ref="pageRoot">
    <section class="relative z-10 flex min-h-[600px] items-center overflow-hidden bg-[#E4EEF7]">
      <div class="absolute top-0 left-0 z-0 h-full w-full rounded-br-[240px] bg-[#1469B6] shadow-2xl shadow-blue-900/10 transition-all duration-700 md:w-[76%] md:rounded-br-[420px]"></div>

      <div class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-10">
        <div class="max-w-2xl text-white">
          <h1 class="mb-8 text-6xl leading-none font-black tracking-tighter text-white drop-shadow-sm md:text-8xl">
            新旅遊御守
          </h1>
          <h2 class="mb-8 text-xl leading-tight font-bold text-[#FACA37] md:text-2xl">
            出發前 1 小時，線上投保旅綜險，
            <br class="hidden md:block" />
            意外醫療、法定傳染病都保障。
          </h2>

          <div class="mb-12 space-y-3 border-l-2 border-white pl-6 text-sm font-medium opacity-90 md:text-base">
            <p>海外突發疾病醫療最高保障 100 萬，美、日、韓、紐澳再加倍！</p>
            <p>班機延誤、行李延誤、旅行文件損失，定額 NT$5,000。</p>
            <p>突發狀況好安心！旅程取消、更改有保障，緊急救援費用最高 300 萬。</p>
          </div>
        </div>

        <div class="relative hidden h-full min-h-[360px] lg:flex">
          <img
            :src="heroPlane"
            alt="飛機插圖"
            data-plane-reveal
            class="animate-plane-reveal pointer-events-none absolute right-[-120px] bottom-[-52px] w-[680px] max-w-none object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.18)]"
          />
        </div>
      </div>
    </section>

    <div class="relative z-30 rounded-tl-[240px] rounded-bl-[240px] bg-white pt-[36px] pb-12 shadow-[0_-10px_30px_rgba(37,99,235,0.06)] md:rounded-tl-[420px] md:rounded-bl-[420px]">
      <div class="absolute top-0 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-6" data-reveal style="--reveal-delay: 80ms">
        <div class="no-scrollbar flex overflow-x-auto rounded-[40px] border border-white bg-white/90 p-2 shadow-2xl shadow-blue-900/10 backdrop-blur-xl">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            @click="openTabAction(tab)"
            :class="[
              'min-w-[120px] flex-1 whitespace-nowrap rounded-[32px] px-6 py-4 text-sm font-black transition-all duration-300',
              activeTab === tab
                ? 'scale-105 bg-[#7FBF27] text-white shadow-xl active:scale-100'
                : 'text-slate-400 hover:text-slate-900',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="mb-12"></div>

      <main class="mx-auto max-w-7xl px-6">
        <section ref="featureSection" class="mb-16 px-6 py-8" data-reveal style="--reveal-delay: 120ms">
          <div class="mb-12">
            <div class="group relative inline-flex flex-col pt-4">
              <span class="absolute -top-6 left-0 select-none text-[96px] leading-none font-black text-slate-100">
                01
              </span>
              <div class="relative z-10 flex flex-col gap-2">
                <div class="flex items-center gap-4 pt-4">
                  <h2 class="text-[40px] leading-none font-black tracking-tight text-slate-900">商品特色</h2>
                  <span class="mt-2 h-[6px] w-12 rounded-full bg-[#2563EB] transition-all duration-300 group-hover:w-18"></span>
                </div>
                <p class="text-xs font-bold tracking-[0.24em] text-slate-400 uppercase">Policy & Protection Details</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div class="group relative h-[340px] overflow-hidden rounded-[28px] border border-slate-200 bg-white px-7 pt-8 pb-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
              <div class="relative z-10 w-[500px] max-w-[calc(100%-180px)] pb-16">
                <h3 class="mb-4 text-[24px] leading-snug font-bold tracking-tight text-[#1469B6]">
                  線上投保．小保費、大保障
                </h3>
                <div class="space-y-4 text-[16px] leading-7 font-normal text-slate-900">
                  <p class="flex items-start gap-3">
                    <Star class="mt-0.5 h-4.5 w-4.5 shrink-0 fill-[#FACA37] text-[#FACA37]" />
                    <span>出發前 1 小時投保，即買即生效，再享保費優惠。旅行期間 24 小時全年守護，還有即時諮詢服務(醫療/旅遊/推薦汽車機場)。</span>
                  </p>
                  <p class="flex items-start gap-3">
                    <Star class="mt-0.5 h-4.5 w-4.5 shrink-0 fill-[#FACA37] text-[#FACA37]" />
                    <span>出國遇 Trouble，南山罩！班機延誤、行李延誤、旅行文件損失、班機改降、旅程取消、旅程更改有保障。不論保額高低，皆享有緊急救援服務。</span>
                  </p>
                </div>
              </div>

              <div class="pointer-events-none absolute right-0 bottom-0 h-[58%] w-[42%]">
                <img
                  :src="cardPig"
                  alt="卡片插圖"
                  class="absolute right-0 bottom-0 h-full w-auto max-w-none object-contain"
                />
              </div>
            </div>

            <div class="group relative h-[340px] overflow-hidden rounded-[28px] border border-slate-200 bg-white px-7 pt-8 pb-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
              <div class="relative z-10 w-[500px] max-w-[calc(100%-180px)] pb-16">
                <h3 class="mb-4 text-[24px] leading-snug font-bold tracking-tight text-[#1469B6]">
                  海外突發疾病，黃加歐日韓最高再加倍
                </h3>
                <div class="space-y-4 text-[16px] leading-7 font-normal text-slate-900">
                  <p class="flex items-start gap-3">
                    <Star class="mt-0.5 h-4.5 w-4.5 shrink-0 fill-[#FACA37] text-[#FACA37]" />
                    <span>海外突發疾病涵蓋法定傳染病與常見急症，醫療費用高的地區再提高給付，減輕旅途中臨時就醫的負擔。</span>
                  </p>
                </div>
              </div>

              <div class="pointer-events-none absolute right-0 bottom-0 h-[58%] w-[42%]">
                <img
                  :src="cardMoney"
                  alt="卡片插圖"
                  class="absolute right-0 bottom-0 h-full w-auto max-w-none object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="mb-0 px-6 py-2" data-reveal style="--reveal-delay: 160ms">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <div class="mb-10">
                <div class="group relative inline-flex flex-col pt-4">
                  <span class="absolute -top-5 left-0 select-none text-[72px] leading-none font-black text-slate-100">
                    02
                  </span>
                  <div class="relative z-10 flex flex-col gap-1">
                    <div class="flex items-center gap-3 pt-3">
                      <h2 class="text-[40px] leading-none font-black tracking-tight text-slate-900">條款須知</h2>
                      <span class="mt-1 h-[5px] w-10 rounded-full bg-[#2563EB] transition-all duration-300 group-hover:w-16"></span>
                    </div>
                    <p class="text-[9px] font-bold tracking-[0.22em] text-slate-400 uppercase">Policy & Protection Details</p>
                  </div>
                </div>
              </div>

              <div class="flex justify-start">
                <img
                  :src="people"
                  alt="條款須知插圖"
                  class="h-[420px] w-[340px] object-contain object-left-bottom"
                />
              </div>
            </div>

            <div class="pt-1">
              <div class="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div
                  v-for="item in noticeItems"
                  :key="item"
                  class="group flex items-center justify-between rounded-[12px] border border-slate-200 bg-white px-5 py-5 shadow-sm transition-all hover:border-blue-300"
                >
                  <span class="text-[16px] font-bold tracking-tight text-slate-700">{{ item }}</span>
                  <button
                    type="button"
                    class="group/btn flex items-center gap-3 text-[16px] font-bold text-[#0054A6] transition-colors hover:text-[#003D78]"
                    @click="
                      modalType = noticeModalMap[item] || '投保規則';
                      isModalOpen = true;
                    "
                  >
                    了解更多
                    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover/btn:bg-[#0054A6] group-hover/btn:text-white">
                      <ChevronRight :size="14" />
                    </span>
                  </button>
                </div>
              </div>

              <div class="rounded-[12px] border border-[#F7CACA] bg-[#FFF1F1] px-5 py-4">
                <h4 class="mb-3 text-[18px] font-black text-[#D92D20]">重要聲明</h4>
                <div class="space-y-1 text-[12px] leading-5 font-normal text-[#D92D20]">
                  <p>• 消費者於投保前，應審慎瞭解本保險商品之承保範圍、除外不保事項及商品風險。</p>
                  <p>• 本保險所稱之「住院」，係指被保險人經醫師診斷其接受疾病治療入住醫院，且正式辦理住院手續並確實在醫院接受診察。但不包含相當於中醫正骨醫院、民俗調理治療院之住院者與非治療目的而出入同日病房。</p>
                  <p>• 本商品經本公司合格簽署人員檢視並內容符合保險商品資訊及保險法令，惟為確保權益，其於保險契約消費者審訂契約等原則，消費者仍應詳加閱讀保險單條款內容，審慎選擇保險商品。</p>
                  <p>• 本商品如有虛偽不實或違法情事，應由本公司及負責人依法負責。</p>
                  <p>• 投保後將約定不繼續繳費可能不利消費者，請審慎評估需求之保險商品。</p>
                  <p>• 保險契約各項權利義務均詳列於保險條款，消費者務必詳加閱讀了解。</p>
                  <p>• 當您來不及在出發前收到本公司寄發之保單時，您可以先將本保險之承保內容及保單條款列印出來作為參考，以維護您的權益。</p>
                  <p>• 本商品為保險商品，依保險法及其他相關規定，受保險安定基金之保障，但不受存款保險之保障。</p>
                  <p>• 本公司保有承保與否的權利。</p>
                  <p>• 消費者於購買前，應詳閱各種銷售文件內容，本商品之預定費用率(預定附加費用率)：南山產物旅遊傷害醫療保險、南山產物個人旅行平安保險及其附加條款最高40.5%，最低23.3%，南山產物旅遊人旅行平安保險及其附加條款最高49.5%，最低23.3%；如要詳細了解其他相關資訊，請洽本公司業務員、服務據點(免付費電話:0800-020-060按2)或網站(網址：www.nanshangeneral.com.tw)，以保障您的權益。</p>
                  <p>• 查詢本公司資訊公開說明文件，請上本公司網站、網址：www.nanshangeneral.com.tw，或至本公司索取。客服服務專線：0800-020-060。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <section ref="faqSection" class="bg-[#DDEAF7] px-6 pt-10 pb-24" data-reveal style="--reveal-delay: 120ms">
      <div class="mx-auto max-w-7xl">
        <div class="mb-8 text-center">
          <h2 class="text-[40px] leading-none font-black tracking-tight text-slate-900">常見問題</h2>
          <p class="mt-1 text-[9px] font-bold tracking-[0.22em] text-slate-400 uppercase">Policy & Protection Details</p>
        </div>
        <div class="mx-auto max-w-5xl space-y-3">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.q"
            class="group overflow-hidden rounded-[10px] border border-slate-100 bg-white shadow-sm transition-all hover:border-blue-100 hover:shadow-lg"
          >
            <button type="button" class="flex w-full items-center justify-between px-5 py-4 text-left" @click="toggleFaq(index)">
              <span class="text-[14px] leading-snug font-bold tracking-tight text-slate-700">{{ faq.q }}</span>
              <span
                :class="[
                  'flex h-7 w-7 items-center justify-center rounded-full transition-all',
                  activeFaq === index
                    ? 'rotate-180 bg-[#0054A6] text-white'
                    : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100',
                ]"
              >
                <ChevronDown :size="16" />
              </span>
            </button>

            <div v-if="activeFaq === index" class="animate-faq-enter px-5 pt-0 pb-5 leading-relaxed text-slate-500">
              <div class="flex gap-4 rounded-[14px] border border-slate-100 bg-slate-50 p-5 text-[14px] font-normal text-slate-600">
                <HelpCircle class="mt-0.5 shrink-0 text-blue-500" :size="20" />
                <div class="space-y-2">
                  <template v-if="Array.isArray(faq.a)">
                    <p v-for="item in faq.a" :key="item">{{ item }}</p>
                  </template>
                  <template v-else>
                    <p>{{ faq.a }}</p>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-md" @click="isModalOpen = false"></div>

      <div class="animate-modal-enter relative w-full max-w-4xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div class="relative overflow-hidden bg-[#0093dd] px-10 py-7 text-white">
          <div class="pointer-events-none absolute inset-y-0 left-[-22%] w-[144%] opacity-10">
            <svg viewBox="0 0 400 100" preserveAspectRatio="none" class="h-full w-full max-w-none">
              <path d="M0,50 C100,20 200,80 400,50 L400,0 L0,0 Z" fill="white" />
            </svg>
          </div>
          <div class="relative z-10 flex items-center justify-between">
            <h2 class="text-4xl font-black tracking-widest uppercase">{{ currentModal.title }}</h2>
            <button type="button" class="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/40" @click="isModalOpen = false">
              <X :size="28" />
            </button>
          </div>
        </div>

        <div class="max-h-[75vh] overflow-y-auto p-10 text-blue-900">
          <div class="mb-8 rounded-[24px] bg-[#0093dd] p-6 leading-relaxed font-bold text-white shadow-lg">
            {{ currentModal.intro }}
          </div>

          <div class="mb-8 overflow-hidden rounded-[24px] border-2 border-blue-100">
            <div class="border-b border-blue-100 bg-blue-50 px-6 p-2 text-right text-[10px] font-bold text-blue-800 underline">{{ currentModal.tableLabel }}</div>
            <table class="w-full border-collapse text-center text-sm">
              <thead>
                <tr class="bg-[#0093dd] font-black text-white">
                  <th
                    v-for="header in currentModal.table.headers"
                    :key="header"
                    class="border border-blue-300 p-4"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="font-bold">
                <tr v-for="row in currentModal.table.rows" :key="row[0]">
                  <td
                    v-for="(cell, cellIndex) in row"
                    :key="`${row[0]}-${cellIndex}`"
                    :class="[
                      'border border-blue-100 p-4',
                      cellIndex === 0 ? 'bg-blue-50/50' : '',
                    ]"
                  >
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mb-8 space-y-4">
            <div v-for="rule in currentModal.bullets" :key="rule" class="flex gap-4 text-sm leading-relaxed font-bold text-slate-600">
              <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400"></span>
              <span>{{ rule }}</span>
            </div>
          </div>

          <div class="space-y-4 rounded-[24px] border border-orange-100 bg-orange-50 p-8 shadow-inner">
            <div v-for="notice in currentModal.notices" :key="notice" class="flex gap-3 text-sm font-black text-orange-800">
              <span class="shrink-0">※</span>
              <span>{{ notice }}</span>
            </div>
          </div>

          <p class="mt-8 text-sm font-medium tracking-tight text-slate-500 italic">{{ currentModal.footer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
