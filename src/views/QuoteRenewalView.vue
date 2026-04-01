<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowLeftCircle, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

const isMobile = ref(false);
const currentPage = ref(1);

const policies = [
  { product: '汽車保險', policyNo: 'CK***576', period: '2025/12/04 12:00 - 2025/12/30 12:00', downloadable: true },
  { product: '汽車保險', policyNo: 'CK***577', period: '2025/11/02 12:00 - 2025/12/02 12:00', downloadable: false },
  { product: '汽車保險', policyNo: 'CK***578', period: '2025/10/16 12:00 - 2025/11/16 12:00', downloadable: true },
  { product: '汽車保險', policyNo: 'CK***579', period: '2025/09/11 12:00 - 2025/10/11 12:00', downloadable: true },
  { product: '汽車保險', policyNo: 'CK***580', period: '2025/08/09 12:00 - 2025/09/09 12:00', downloadable: false },
  { product: '汽車保險', policyNo: 'CK***581', period: '2025/07/06 12:00 - 2025/08/06 12:00', downloadable: true },
  { product: '汽車保險', policyNo: 'CK***582', period: '2025/06/01 12:00 - 2025/07/01 12:00', downloadable: true },
  { product: '汽車保險', policyNo: 'CK***583', period: '2025/05/01 12:00 - 2025/06/01 12:00', downloadable: true },
];

const pages = [1, 2, 3];
const progressWidth = computed(() => '0%');

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
  <div class="relative min-h-screen pt-10 md:pt-8">
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#145EAD] via-[#145EAD] to-[#0D427A]"></div>
      <div class="absolute top-[-20%] left-[-10%] h-[160%] w-[160%] -rotate-12 bg-white/[0.035] transform-gpu"></div>
      <div class="absolute right-[-20%] bottom-[-10%] h-[70%] w-[130%] rotate-6 bg-[#145EAD]/[0.1] blur-[120px] transform-gpu"></div>
      <div class="absolute top-1/3 left-[-25%] h-[550px] w-[220%] -rotate-[12deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-[100px]"></div>
      <div class="quote-dots absolute inset-0 opacity-60"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14)_0%,transparent_70%)]"></div>
    </div>

    <main class="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-6 pb-16 md:px-6 md:pt-10">
      <section class="px-0 py-0 md:px-0 md:py-0">
        <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center">
            <div class="mr-3 h-6 w-2 rounded-full bg-[#8cc63f]"></div>
            <h2 class="text-[32px] font-bold text-white">汽車保險</h2>
          </div>
          <RouterLink :to="{ name: 'home' }" class="inline-flex items-center text-[16px] font-medium !text-white transition-colors hover:!text-white/80">
            <ArrowLeftCircle :size="18" class="mr-1 !text-white" />
            回首頁
          </RouterLink>
        </div>

        <div class="mb-8 rounded-xl border border-white/45 bg-white/55 p-5 text-sm leading-relaxed text-slate-600 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div class="flex items-start space-x-2">
            <span class="mt-0.5 font-bold text-slate-600">1.</span>
            <p>僅提供查詢截至前1日簽單之有效保單。</p>
          </div>
          <div class="mt-1 flex items-start space-x-2">
            <span class="mt-0.5 font-bold text-slate-600">2.</span>
            <p>僅提供目前仍有效的保險單且未執行任何批改作業始可提出補發，如「下載」按鈕反灰，即表示無法產生對應電子保單。</p>
          </div>
          <p class="mt-3 border-l-2 border-[#475569] pl-6 italic text-slate-600">
            如有查詢疑問或欲查詢已過期之電子保單，請撥打客戶服務專線 <span class="font-bold text-[#0054A6]">0800-020-060</span> 按 2 洽詢，謝謝！
          </p>
        </div>

        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div v-if="!isMobile" class="overflow-x-auto md:overflow-visible">
            <table class="w-full min-w-[960px] border-collapse text-center md:min-w-0">
              <thead>
                <tr class="border-b border-slate-200 bg-[#E0EBF6] font-bold text-[#004a96]">
                  <th class="px-6 py-5">商品別</th>
                  <th class="px-6 py-5">保單號碼</th>
                  <th class="px-6 py-5">保險期間</th>
                  <th class="px-6 py-5">功能</th>
                </tr>
              </thead>
              <tbody class="text-base font-normal text-slate-700">
                <tr
                  v-for="policy in policies"
                  :key="`${policy.policyNo}-${policy.period}`"
                  class="border-b border-slate-100 transition-colors hover:bg-slate-50/50"
                >
                  <td class="px-4 py-6" data-label="商品別">{{ policy.product }}</td>
                  <td class="px-4 py-6" data-label="保單號碼">{{ policy.policyNo }}</td>
                  <td class="px-4 py-6 font-mono text-[15px] text-slate-500" data-label="保險期間">{{ policy.period }}</td>
                  <td class="px-4 py-6" data-label="操作功能">
                    <div class="flex flex-col justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-3">
                      <button type="button" class="w-full rounded-lg bg-[#8cc63f] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#7ab336] md:w-auto">
                        保障項目
                      </button>
                      <button
                        type="button"
                        :class="policy.downloadable
                          ? 'w-full rounded-lg bg-[#004a96] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#003a75] md:w-auto'
                          : 'w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-medium text-slate-400 md:w-auto'"
                      >
                        保單下載
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="divide-y divide-slate-100">
            <div
              v-for="policy in policies"
              :key="`mobile-${policy.policyNo}-${policy.period}`"
              class="space-y-4 px-5 py-5"
            >
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-bold text-[#004a96]">商品別</span>
                <span class="text-sm text-slate-700">{{ policy.product }}</span>
              </div>
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-bold text-[#004a96]">保單號碼</span>
                <span class="text-sm text-slate-700">{{ policy.policyNo }}</span>
              </div>
              <div class="flex items-start justify-between gap-4">
                <span class="pt-0.5 text-sm font-bold text-[#004a96]">保險期間</span>
                <span class="max-w-[62%] text-right font-mono text-[13px] text-slate-500">{{ policy.period }}</span>
              </div>
              <div class="space-y-3">
                <span class="block text-sm font-bold text-[#004a96]">操作功能</span>
                <div class="flex flex-col space-y-2">
                  <button type="button" class="w-full rounded-lg bg-[#8cc63f] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#7ab336]">
                    保障項目
                  </button>
                  <button
                    type="button"
                    :class="policy.downloadable
                      ? 'w-full rounded-lg bg-[#004a96] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#003a75]'
                      : 'w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-medium text-slate-400'"
                  >
                    保單下載
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-200 bg-white px-6 py-5">
            <div class="flex justify-center">
              <nav class="flex items-center space-x-2">
                <button type="button" class="rounded-lg border border-slate-200 p-2 text-slate-400 transition-all hover:bg-slate-50">
                  <ChevronLeft :size="20" />
                </button>
                <button
                  v-for="page in pages"
                  :key="page"
                  type="button"
                  @click="currentPage = page"
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold transition-all',
                    currentPage === page
                      ? 'border-[#004a96] bg-[#004a96] text-white shadow-md shadow-[#004a96]/20'
                      : 'border-slate-200 text-slate-500 hover:text-[#004a96]',
                  ]"
                >
                  {{ page }}
                </button>
                <button type="button" class="rounded-lg border border-slate-200 p-2 text-slate-400 transition-all hover:bg-slate-50">
                  <ChevronRight :size="20" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.quote-dots {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1.8px, transparent 1.8px);
  background-size: 30px 30px;
}
</style>
