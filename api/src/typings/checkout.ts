export enum CheckoutState {
  ABANDONED = 'abandoned',
  VOICEMAIL_SENT = 'voicemailSent',
  CATCH_UP = 'catchUp',
  PAID_WITHOUT_BEING_CATCH_UP = 'paidWithoutBeingCatchUp'
}

export type AbandonedCheckoutRequest = {
  abandonedCheckoutId: number;
  abandonedCheckoutUrl: string;
  cartToken: string;
  lineItems: LineItems[];
  customer: Customer;
  token: string;
  totalLineItemsPrice: string;
  totalPrice: string;
  totalTax: string;
  subtotalPrice: string;
  name: string;
  currency: string;
  customerLocale: string;
};

export type CheckoutInput = AbandonedCheckoutRequest & {
  state: string;
  shopId: string;
};

export type CheckoutVoicemailInput = CheckoutInput & {
  voicemail_sent_at: Date | null;
}

export type Checkout = CheckoutVoicemailInput & {
  id: string;
  created_at: Date;
  updated_at: Date;
};

export type LineItems = {
  sku: string;
  productId: number;
  price: string;
  quantity: number;
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
};

export type LineItemsRequest = Omit<LineItems, 'productId'> & {
  product_id: number;
};

export type CheckoutToCatchUpResult = {
  id: string;
  status: string;
  total_price: string;
  currency: string;
}
