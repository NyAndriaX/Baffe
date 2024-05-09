import {
  AbandonedCheckoutRequest,
  Checkout,
  CheckoutInput,
  LineItemsRequest,
} from '../../typings/checkout';

export const mapToAbandonedCheckout = (obj: any): AbandonedCheckoutRequest => ({
  abandonedCheckoutId: obj.id,
  abandonedCheckoutUrl: obj.abandoned_checkout_url,
  cartToken: obj.cart_token,
  lineItems: obj.line_items.map((el: LineItemsRequest) => ({
    sku: el.sku,
    productId: el.product_id,
    price: el.price,
    quantity: el.quantity,
  })),
  customer: {
    id: obj.customer.id,
    firstName: obj.customer.first_name,
    lastName: obj.customer.last_name,
    phone: obj.customer?.phone || obj.customer.default_address?.phone,
    country: obj.customer.default_address.country
  },
  token: obj.token,
  totalLineItemsPrice: obj.total_line_items_price,
  name: obj.name,
  currency: obj.currency,
  customerLocale: obj.customer_locale,
  totalPrice: obj.total_price,
  totalTax: obj.total_tax,
  subtotalPrice: obj.subtotal_price,
});

export const mapToCheckoutInput = (
  obj: Checkout,
  state: string,
): CheckoutInput => ({
  abandonedCheckoutId: obj.abandonedCheckoutId,
  abandonedCheckoutUrl: obj.abandonedCheckoutUrl,
  cartToken: obj.cartToken,
  lineItems: obj.lineItems,
  customer: obj.customer,
  token: obj.token,
  totalLineItemsPrice: obj.totalLineItemsPrice,
  name: obj.name,
  currency: obj.currency,
  customerLocale: obj.customerLocale,
  totalPrice: obj.totalPrice,
  totalTax: obj.totalTax,
  subtotalPrice: obj.subtotalPrice,
  state,
  shopId: obj.shopId,
});
