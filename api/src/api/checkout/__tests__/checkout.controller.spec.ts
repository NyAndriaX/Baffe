import { message } from './../../errors/message';
import {
  mockFindUniqueShop,
  mockCreateCheckout,
  mockFindUniqueShopEmpty,
  mockFindUniqueShopException,
  mockFindUniqueCheckoutException,
  mockCreateCheckoutException,
  mockFindUniqueCheckoutEmpty,
  mockFindUniqueCheckout,
  mockUpdateCheckout,
  mockUpdateCheckoutException,
  mockCheckoutInOrderRequest,
  mockFindManyCheckout,
  mockFindManyCheckoutException,
  mockFindManyCheckoutEmpty,
  mockCheckoutsRequest,
  mockFindUniqueCheckoutAbandoned,
  mockFindManyCampaign,
  mockFindManyCampaignEmpty,
  mockFindUniqueMedia,
} from '../../../mocks';
import { getContext, MockContext } from '../../../database/context';
import request from 'supertest';
import app from '../../../config/app';
import { assertException, assertExceptionCampaignNotFound, assertExceptionShopNotFound } from '../../utils';

jest.mock('../../../services/voicemail.service', () => {
  return {
    sendVoicemailBySlybroadcast: jest
      .fn()
      .mockReturnValue(Promise.resolve(true)),
  };
});

let mockCtx: MockContext;
jest.useRealTimers();

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

describe('API CHECKOUT /api/checkout', () => {
  // Begin testing API Create checkout
  it('POST /api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com should create new checkout when is not in database', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindManyCampaign(mockCtx);
    mockFindUniqueCheckoutEmpty(mockCtx);
    mockCreateCheckout(mockCtx);
    mockUpdateCheckout(mockCtx);
    mockFindUniqueMedia(mockCtx);
    jest.mock('../../../services/voicemail.service', async () => {
      return {
        sendVoicemailBySlybroadcast: jest.fn(() => true),
      };
    });

    const { body, status } = await request(app)
      .post(
        '/api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com',
      )
      .send(mockCheckoutsRequest);
    expect(status).toEqual(200);
    expect(body.message).toEqual('saveOrUpdateAbandonedCheckout success');
      });

  it('POST /api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com should throw an error when shop has not found', async () => {
    mockFindUniqueShopEmpty(mockCtx);
    await assertExceptionShopNotFound(
      '/api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com',
      'POST',
      mockCheckoutsRequest,
    );
  });

  it('POST /api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com should throw an error when shop has not found', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindManyCampaignEmpty(mockCtx);
    await assertExceptionCampaignNotFound(
      '/api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com',
      'POST',
      mockCheckoutsRequest,
    );    
  });

  it('POST /api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com should throw an error when find unique shop rejected value', async () => {
    mockFindUniqueShopException(mockCtx);
    await assertException(
      '/api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com',
      'POST',
      mockCheckoutsRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('POST /api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com should throw an error when find unique checkout rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindManyCampaign(mockCtx);
    mockFindUniqueCheckoutException(mockCtx);
    await assertException(
      '/api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com',
      'POST',
      mockCheckoutsRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('POST /api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com should throw an error when create checkout rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindManyCampaign(mockCtx);
    mockFindUniqueCheckoutEmpty(mockCtx);
    mockCreateCheckoutException(mockCtx);
    await assertException(
      '/api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com',
      'POST',
      mockCheckoutsRequest,
      message.ERROR_CREATE,
    );
  });

  it('POST /api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com should throw an error when request body is empty', async () => {
    await assertException(
      '/api/checkout/saveOrUpdateAbandonedCheckout/test-campaign-dev.mycampaign.com',
      'POST',
      {},
      message.REQUEST_ABANDONED_CHECKOUT_IS_EMPTY,
    );
  });

  // End testing API Create checkout

  // Begin testing API Update Checkout To CatchUp
  it('PUT /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should update new checkout when is indatabase', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCheckout(mockCtx);
    mockUpdateCheckout(mockCtx);
    const { body, status } = await request(app)
      .put(
        '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
      )
      .send(mockCheckoutInOrderRequest);
    expect(status).toEqual(200);
    expect(body.message).toEqual('updateCheckoutToCatchUp success');
  });

  it('PUT /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should update new checkout when state is abandoned', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCheckoutAbandoned(mockCtx);
    mockUpdateCheckout(mockCtx);
    const { body, status } = await request(app)
      .put(
        '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
      )
      .send(mockCheckoutInOrderRequest);
    expect(status).toEqual(200);
    expect(body.message).toEqual('updateCheckoutToCatchUp success');
  });

  it('PUT /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should throw an error when shop has not found', async () => {
    mockFindUniqueShopEmpty(mockCtx);
    await assertExceptionShopNotFound(
      '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
      'PUT',
      mockCheckoutInOrderRequest,
    );
  });

  it('POST /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should throw an error when find unique shop rejected value', async () => {
    mockFindUniqueShopException(mockCtx);
    await assertException(
      '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
      'PUT',
      mockCheckoutInOrderRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('PUT /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should throw an error when find unique checkout rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCheckoutException(mockCtx);
    await assertException(
      '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
      'PUT',
      mockCheckoutInOrderRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('PUT /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should throw an error when update checkout rejected value', async () => {
  mockFindUniqueShop(mockCtx);
  mockFindUniqueCheckout(mockCtx);
  mockUpdateCheckoutException(mockCtx);
  await assertException(
  '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
  'PUT',
  mockCheckoutInOrderRequest,
  message.ERROR_UPDATE,
  );
  });

  it('PUT /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should throw an error when update checkout state is abandoned rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCheckoutAbandoned(mockCtx);
    mockUpdateCheckoutException(mockCtx);
    await assertException(
      '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
      'PUT',
      mockCheckoutInOrderRequest,
      message.ERROR_UPDATE,
    );
  });

  it('PUT /api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com should throw an error when request body is empty', async () => {
    await assertException(
      '/api/checkout/updateCheckoutToCatchUp/test-campaign-dev.mycampaign.com',
      'PUT',
      [],
      message.DATA_IS_REQUIRED,
    );
  });

  // End testing API updateCheckoutToCatchUp

  // Begin testing API getCheckoutsByShop
  it('GET /api/checkout/getCheckouts/test-campaign-dev.mycampaign.com should getCheckouts when is in database', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindManyCheckout(mockCtx);
    const { body, status } = await request(app).get(
      '/api/checkout/getCheckouts/test-campaign-dev.mycampaign.com',
    );
    expect(status).toEqual(200);
    expect(body.length).toEqual(1);
  });

  it('GET /api/checkout/getCheckouts/test-campaign-dev.mycampaign.com should getCheckouts when is not in database', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindManyCheckoutEmpty(mockCtx);
    const { body, status } = await request(app).get(
      '/api/checkout/getCheckouts/test-campaign-dev.mycampaign.com',
    );
    expect(status).toEqual(200);
    expect(body.length).toEqual(0);
  });

  it('GET /api/checkout/getCheckouts/test-campaign-dev.mycampaign.com should throw an error when shop has not found', async () => {
    mockFindUniqueShopEmpty(mockCtx);
    await assertExceptionShopNotFound(
      '/api/checkout/getCheckouts/test-campaign-dev.mycampaign.com',
      'GET',
      {},
    );
  });

  it('GET /api/checkout/getCheckouts/test-campaign-dev.mycampaign.com should throw an error when find unique shop rejected value', async () => {
    mockFindUniqueShopException(mockCtx);
    await assertException(
      '/api/checkout/getCheckouts/test-campaign-dev.mycampaign.com',
      'GET',
      {},
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('GET /api/checkout/getCheckouts/test-campaign-dev.mycampaign.com should throw an error when find many shop rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindManyCheckoutException(mockCtx);
    await assertException(
      '/api/checkout/getCheckouts/test-campaign-dev.mycampaign.com',
      'GET',
      {},
      message.ERROR_FIND_MANY,
    );
  });
  // End testing API getCheckoutsByShop
});
