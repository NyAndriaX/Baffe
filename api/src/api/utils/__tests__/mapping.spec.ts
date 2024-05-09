import {
  AbandonedCheckoutRequest,
  CheckoutInput,
  CheckoutState,
} from '../../../typings/checkout';
import {
  mockCheckoutRequest,
  mockCheckoutWithAuditDate,
} from '../../../mocks/checkout';
import { mapToAbandonedCheckout, mapToCheckoutInput } from '../mapping';

describe('Mapping typings Checkout', () => {
  // Begin testing API Create campaign
  it('Giving body checkout should populate AbandonedCheckoutRequest', async () => {
    const abandondedRequest: AbandonedCheckoutRequest =
      mapToAbandonedCheckout(mockCheckoutRequest);
    expect(abandondedRequest.abandonedCheckoutUrl).toEqual(
      mockCheckoutRequest.abandoned_checkout_url,
    );
    expect(abandondedRequest.abandonedCheckoutId).toEqual(
      mockCheckoutRequest.id,
    );
    expect(abandondedRequest.lineItems.length).toEqual(1);
    expect(abandondedRequest.lineItems[0].productId).toEqual(
      mockCheckoutRequest.line_items[0].product_id,
    );
    expect(abandondedRequest.customer.firstName).toEqual(
      mockCheckoutRequest.customer.first_name,
    );
    expect(abandondedRequest.customer.lastName).toEqual(
      mockCheckoutRequest.customer.last_name,
    );
    expect(abandondedRequest.totalLineItemsPrice).toEqual(
      mockCheckoutRequest.total_line_items_price,
    );
    expect(abandondedRequest.totalPrice).toEqual(
      mockCheckoutRequest.total_price,
    );
    expect(abandondedRequest.totalTax).toEqual(mockCheckoutRequest.total_tax);
    expect(abandondedRequest.subtotalPrice).toEqual(
      mockCheckoutRequest.subtotal_price,
    );
  });

  it('Giving Checkout should populate CheckoutInput', async () => {
    const checkoutInput: CheckoutInput = mapToCheckoutInput(
      mockCheckoutWithAuditDate,
      CheckoutState.VOICEMAIL_SENT,
    );
    expect(checkoutInput.abandonedCheckoutUrl).toEqual(
      mockCheckoutWithAuditDate.abandonedCheckoutUrl,
    );
    expect(checkoutInput.lineItems.length).toEqual(1);
    expect(checkoutInput.lineItems[0].productId).toEqual(
      mockCheckoutWithAuditDate.lineItems[0].productId,
    );
    expect(checkoutInput.customer.firstName).toEqual(
      mockCheckoutWithAuditDate.customer.firstName,
    );
    expect(checkoutInput.customer.lastName).toEqual(
      mockCheckoutWithAuditDate.customer.lastName,
    );
    expect(checkoutInput.totalLineItemsPrice).toEqual(
      mockCheckoutWithAuditDate.totalLineItemsPrice,
    );
    expect(checkoutInput.totalPrice).toEqual(
      mockCheckoutWithAuditDate.totalPrice,
    );
    expect(checkoutInput.totalTax).toEqual(mockCheckoutWithAuditDate.totalTax);
    expect(checkoutInput.subtotalPrice).toEqual(
      mockCheckoutWithAuditDate.subtotalPrice,
    );
  });
});
