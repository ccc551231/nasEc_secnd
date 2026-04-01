import { createRouter, createWebHistory } from 'vue-router';
import SharedLayout from '../layouts/SharedLayout.vue';
import HomeView from '../views/HomeView.vue';
import QuoteFlowView from '../views/QuoteFlowView.vue';
import QuoteInputView from '../views/QuoteInputView.vue';
import QuotePaymentView from '../views/QuotePaymentView.vue';
import QuoteRenewalView from '../views/QuoteRenewalView.vue';
import QuoteSelectionView from '../views/QuoteSelectionView.vue';
import QuoteSuccessView from '../views/QuoteSuccessView.vue';
import TravelInsuranceView from '../views/TravelInsuranceView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: SharedLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'travel-insurance',
          name: 'travel-insurance',
          component: TravelInsuranceView,
        },
        {
          path: 'quote-flow',
          name: 'quote-flow',
          component: QuoteFlowView,
        },
        {
          path: 'quote-flow-selection',
          name: 'quote-flow-selection',
          component: QuoteSelectionView,
        },
        {
          path: 'quote-flow-input',
          name: 'quote-flow-input',
          component: QuoteInputView,
        },
        {
          path: 'quote-flow-confirm',
          name: 'quote-flow-confirm',
          component: QuoteInputView,
        },
        {
          path: 'quote-flow-payment',
          name: 'quote-flow-payment',
          component: QuotePaymentView,
        },
        {
          path: 'quote-flow-renewal',
          name: 'quote-flow-renewal',
          component: QuoteRenewalView,
        },
        {
          path: 'quote-flow-success',
          name: 'quote-flow-success',
          component: QuoteSuccessView,
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
