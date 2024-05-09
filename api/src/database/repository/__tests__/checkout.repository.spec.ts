import { CheckoutState } from './../../../typings/checkout';
import { MockContext, getContext } from '../../context/index';
import * as checkoutRepository from '../checkout.repository';
import {
  mockCheckoutInput,
  mockCreateCheckout,
  mockCreateCheckoutException,
  mockFindManyCheckout,
  mockFindManyCheckoutEmpty,
  mockFindManyCheckoutException,
  mockFindUniqueCheckout,
  mockFindUniqueCheckoutEmpty,
  mockFindUniqueCheckoutException,
  mockUpdateCheckout,
  mockUpdateCheckoutException,
} from '../../../mocks';

let mockCtx: MockContext;

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

test('should create new checkout if not exist in database', async () => {
  mockCreateCheckout(mockCtx);

  const checkoutCreated = await checkoutRepository.save(mockCheckoutInput);

  expect(checkoutCreated?.shopId).toEqual('640eff2bb63aa9959fc920e9');
});

test('should throw runtime exception when create rejected value', async () => {
  mockCreateCheckoutException(mockCtx);

  await expect(checkoutRepository.save(mockCheckoutInput)).rejects.toThrow(
    Error,
  );
});

test('should find checkout by shop when checkout is exist', async () => {
  mockFindManyCheckout(mockCtx);

  const checkoutFind = await checkoutRepository.findByShopId(
    '640eff2bb63aa9959fc920e9',
  );

  expect(checkoutFind?.length).toEqual(1);
});

test('should find null when checkout is not exist', async () => {
  mockFindManyCheckoutEmpty(mockCtx);

  const checkoutFind = await checkoutRepository.findByShopId(
    '640eff2bb63aa9959fc920e9',
  );

  expect(checkoutFind.length).toEqual(0);
});

test('should throw runtime exception when find many rejected value', async () => {
  mockFindManyCheckoutException(mockCtx);

  await expect(
    checkoutRepository.findByShopId('640eff2bb63aa9959fc920e9'),
  ).rejects.toThrow(Error);
});

test('should find checkout by abandonedCheckoutId when checkout is exist', async () => {
  mockFindUniqueCheckout(mockCtx);

  const checkoutFind = await checkoutRepository.findByAbandonedCheckoutId(123);

  expect(checkoutFind?.state).toEqual(CheckoutState.VOICEMAIL_SENT);
});

test('should find null when abandonedCheckoutId is not exist', async () => {
  mockFindUniqueCheckoutEmpty(mockCtx);

  const checkoutFind = await checkoutRepository.findByAbandonedCheckoutId(123);

  expect(checkoutFind).toEqual(null);
});

test('should throw runtime exception when find unique rejected value', async () => {
  mockFindUniqueCheckoutException(mockCtx);

  await expect(
    checkoutRepository.findByAbandonedCheckoutId(123),
  ).rejects.toThrow(Error);
});

test('should update checkout if exist in database', async () => {
  mockUpdateCheckout(mockCtx);

  const checkoutUpdated = await checkoutRepository.update(
    mockCheckoutInput,
    '640eff2bb63aa9959fc920e9',
  );

  expect(checkoutUpdated?.state).toEqual(CheckoutState.VOICEMAIL_SENT);
});

test('should throw runtime exception when update rejected value', async () => {
  mockUpdateCheckoutException(mockCtx);

  await expect(
    checkoutRepository.update(mockCheckoutInput, '640eff2bb63aa9959fc920e9'),
  ).rejects.toThrow(Error);
});

test('should find checkout by shop and state when checkout is exist', async () => {
  mockFindManyCheckout(mockCtx);

  const checkoutFind = await checkoutRepository.findByShopIdAndState(
    '640eff2bb63aa9959fc920e9',
    CheckoutState.ABANDONED,
  );

  expect(checkoutFind?.length).toEqual(1);
});

test('should find null when checkout is not exist for shop and state', async () => {
  mockFindManyCheckoutEmpty(mockCtx);

  const checkoutFind = await checkoutRepository.findByShopIdAndState(
    '640eff2bb63aa9959fc920e9',
    CheckoutState.ABANDONED,
  );

  expect(checkoutFind.length).toEqual(0);
});

test('should throw runtime exception when find many shop and state rejected value', async () => {
  mockFindManyCheckoutException(mockCtx);

  await expect(
    checkoutRepository.findByShopIdAndState(
      '640eff2bb63aa9959fc920e9',
      CheckoutState.ABANDONED,
    ),
  ).rejects.toThrow(Error);
});
