import {
  AbandonedCheckoutRequest,
  Checkout,
  CheckoutInput,
  CheckoutVoicemailInput,
  CheckoutState,
} from './../typings/checkout';
import { message } from './../api/errors/message';
import { MockContext } from './../database/context/index';

export const mockCheckoutInOrderRequest = {
  data: [
    {
      checkout_id: 123,
    },
  ],
};

export const mockCheckoutRequest = {
  id: 123,
  abandoned_checkout_url: 'abandoned_checkout_url',
  cart_token: 'cart_token',
  line_items: [
    {
      sku: 'sku',
      product_id: 245,
      price: '500.0',
      quantity: 2,
    },
  ],
  customer: {
    id: 567,
    first_name: 'John',
    last_name: 'Doe',
    phone: '+XX XXX XXX',
    default_address: {
      country: 'United States',
    }
  },
  token: 'token',
  total_line_items_price: '500.0',
  name: '#123',
  currency: 'USD',
  customer_locale: 'usd',
  total_price: '500.0',
  total_tax: '400.0',
  subtotal_price: '300.0',
};

export const mockCheckoutsRequest = {
  checkouts: [mockCheckoutRequest],
};

export const mockAbandonedCheckout: AbandonedCheckoutRequest = {
  abandonedCheckoutId: 123,
  abandonedCheckoutUrl: 'abandoned_checkout_url',
  cartToken: 'cart_token',
  lineItems: [
    {
      sku: 'test',
      productId: 245,
      price: '500.0',
      quantity: 2,
    },
  ],
  customer: {
    id: 567,
    firstName: 'John',
    lastName: 'Doe',
    phone: '+XX XXX XXX',
    country: 'United States'
  },
  token: 'token',
  totalLineItemsPrice: '500.0',
  name: '#123',
  currency: 'USD',
  customerLocale: 'usd',
  totalPrice: '500.0',
  totalTax: '400.0',
  subtotalPrice: '300.0',
};

export const mockCheckoutInput: CheckoutInput = {
  ...mockAbandonedCheckout,
  state: CheckoutState.VOICEMAIL_SENT,
  shopId: '640eff2bb63aa9959fc920e9',
};

export const mockCheckoutVoicemailInput: CheckoutVoicemailInput = {
  ...mockCheckoutInput,
  voicemail_sent_at: new Date(),
};

export const mockCheckoutWithAuditDate: Checkout = {
  ...mockCheckoutVoicemailInput,
  id: '6410562e7170d091ceec8a12',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCheckoutAbandonedWithAuditDate: Checkout = {
  ...mockCheckoutWithAuditDate,
  state: CheckoutState.ABANDONED,
};

export function mockFindManyCheckout(mockCtx: MockContext) {
  mockCtx.prisma.checkout.findMany.mockResolvedValue([
    mockCheckoutWithAuditDate,
  ]);
}

export function mockFindManyCheckoutEmpty(mockCtx: MockContext) {
  mockCtx.prisma.checkout.findMany.mockResolvedValue([]);
}

export function mockFindManyCheckoutException(mockCtx: MockContext) {
  mockCtx.prisma.checkout.findMany.mockRejectedValue(
    new Error(message.ERROR_FIND_MANY),
  );
}

export function mockFindUniqueCheckout(mockCtx: MockContext) {
  mockCtx.prisma.checkout.findUnique.mockResolvedValue(
    mockCheckoutWithAuditDate,
  );
}

export function mockFindUniqueCheckoutAbandoned(mockCtx: MockContext) {
  mockCtx.prisma.checkout.findUnique.mockResolvedValue(
    mockCheckoutAbandonedWithAuditDate,
  );
}

export function mockFindUniqueCheckoutEmpty(mockCtx: MockContext) {
  mockCtx.prisma.checkout.findUnique.mockResolvedValue(null);
}

export function mockFindUniqueCheckoutException(mockCtx: MockContext) {
  mockCtx.prisma.checkout.findUnique.mockRejectedValue(
    new Error(message.ERROR_FIND_UNIQUE),
  );
}

export function mockCreateCheckout(mockCtx: MockContext) {
  mockCtx.prisma.checkout.create.mockResolvedValue(mockCheckoutWithAuditDate);
}

export function mockCreateCheckoutException(mockCtx: MockContext) {
  mockCtx.prisma.checkout.create.mockRejectedValue(
    new Error(message.ERROR_CREATE),
  );
}

export function mockUpdateCheckout(mockCtx: MockContext) {
  mockCtx.prisma.checkout.update.mockResolvedValue(mockCheckoutWithAuditDate);
}

export function mockUpdateCheckoutException(mockCtx: MockContext) {
  mockCtx.prisma.checkout.update.mockRejectedValue(
    new Error(message.ERROR_UPDATE),
  );
}
