import {
  BillingInterval,
  BillingReplacementBehavior,
} from "@shopify/shopify-api";

// The transactions with Shopify will always be marked as test transactions,
// unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
export const billingConfig = {
  'basic': {
    amount: 2000.0, // maximum amount you will charge the merchant per 30 days
    currencyCode: 'EUR',
    replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
    interval: BillingInterval.Usage,
    usageTerms: '8% of sales on each basket recovered.',
  },
};

export const FEE_PERCENTAGE = 0.08;

export default {
  billingConfig,
  FEE_PERCENTAGE,
};
