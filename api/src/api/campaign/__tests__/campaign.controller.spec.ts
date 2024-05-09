import { message } from './../../errors/message';
import {
  mockFindUniqueShop,
  mockCreateCampaign,
  mockCampaignRequest,
  mockFindUniqueShopEmpty,
  mockFindUniqueShopException,
  mockFindUniqueCampaignException,
  mockCreateCampaignException,
  mockFindUniqueCampaignEmpty,
  mockFindUniqueCampaign,
  mockFindUniqueMedia,
  mockFindUniqueMediaEmpty,
  mockFindUniqueMediaException,
  mockFindUniqueCampaignNotValid,
  mockUpdateCampaign,
  mockCampaignUpdateRequest,
  mockUpdateCampaignException,
  mockDeleteCamapign,
} from '../../../mocks';
import { getContext, MockContext } from '../../../database/context';
import request from 'supertest';
import app from '../../../config/app';
import {
  assertException,
  assertExceptionCampaignNotFound,
  assertExceptionShopNotFound,
} from '../../utils';

let mockCtx: MockContext;
jest.useRealTimers();

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

describe('API CAMPAIGN /api/campaign', () => {
  // Begin testing API Create campaign
  it('POST /api/campaign/save should create new campaign when is not in database', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaignEmpty(mockCtx);
    mockCreateCampaign(mockCtx);
    const { body, status } = await request(app)
      .post('/api/campaign/save')
      .send(mockCampaignRequest);
    expect(status).toEqual(200);
    expect(body.id).toEqual('6410562e7170d091ceec8a12');
  });

  it('POST /api/campaign/save should throw exception when field request is not allowed', async () => {
    await assertException(
      '/api/campaign/save',
      'POST',
      {},
      message.SHOP_IS_REQUIRED,
    );
  });

  it('POST /api/campaign/save should throw an error when shop has not found', async () => {
    mockFindUniqueShopEmpty(mockCtx);
    await assertExceptionShopNotFound(
      '/api/campaign/save',
      'POST',
      mockCampaignRequest,
    );
  });

  it('POST /api/campaign/save should throw an error when campaign already exist', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaign(mockCtx);
    await assertException(
      '/api/campaign/save',
      'POST',
      mockCampaignRequest,
      message.CAMPAIGN_IS_ALREADY_EXIST,
    );
  });

  it('POST /api/campaign/save should throw an error when find unique shop rejected value', async () => {
    mockFindUniqueShopException(mockCtx);
    await assertException(
      '/api/campaign/save',
      'POST',
      mockCampaignRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('POST /api/campaign/save should throw an error when find unique campaign rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaignException(mockCtx);
    await assertException(
      '/api/campaign/save',
      'POST',
      mockCampaignRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('POST /api/campaign/save should throw an error when create campaign rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaignEmpty(mockCtx);
    mockCreateCampaignException(mockCtx);
    await assertException(
      '/api/campaign/save',
      'POST',
      mockCampaignRequest,
      message.ERROR_CREATE,
    );
  });

  // End testing API Create campaign

  // Begin testing API Get campaign by shop name
  it('GET /api/campaign/get/:shop should fetch campaign by shop', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaign(mockCtx);
    mockFindUniqueMedia(mockCtx);
    const { body, status } = await request(app).get(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
    );
    expect(status).toEqual(200);
    expect(body.id).toEqual('6410562e7170d091ceec8a12');
    expect(body.voicemail[0].id).toEqual(1);
  });

  it('GET /api/campaign/get/:shop should throw an error when get shop by name has exception', async () => {
    await assertExceptionShopNotFound(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
      'GET',
      {},
    );
  });

  it('GET /api/campaign/get/:shop should throw an error when get campaign by shop is empty', async () => {
    mockFindUniqueShop(mockCtx);
    await assertExceptionCampaignNotFound(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
      'GET',
      {},
    );
  });

  it('GET /api/campaign/get/:shop should throw an error when get shop by name has exception', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaign(mockCtx);
    mockFindUniqueMediaEmpty(mockCtx);
    await assertException(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
      'GET',
      {},
      message.MEDIA_NOT_FOUND,
    );
  });

  it('GET /api/campaign/get/:shop throw an exception when find unique shop has an error', async () => {
    mockFindUniqueShopException(mockCtx);
    await assertException(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
      'GET',
      {},
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('GET /api/campaign/get/:shop throw an exception when find unique campaign has an error', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaignException(mockCtx);
    await assertException(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
      'GET',
      {},
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('GET /api/campaign/get/:shop throw an exception when find unique media has an error', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaign(mockCtx);
    mockFindUniqueMediaException(mockCtx);
    await assertException(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
      'GET',
      {},
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('GET /api/campaign/get/:shop should throw an error when campaign is not valid', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaignNotValid(mockCtx);
    await assertException(
      '/api/campaign/get/test-campaign-dev.mycampaignify.com',
      'GET',
      {},
      message.CAMPAIGN_IS_NOT_VALID,
    );
  });
  // End testing API Get campaign by shop name

  // Begin testing API Update campaign
  it('PUT /api/campaign/update should update campaign when is in database', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaign(mockCtx);
    mockUpdateCampaign(mockCtx);
    const { body, status } = await request(app)
      .put('/api/campaign/update')
      .send(mockCampaignUpdateRequest);
    expect(status).toEqual(200);
    expect(body.id).toEqual('6410562e7170d091ceec8a12');
  });

  it('PUT /api/campaign/update should throw exception when field request is not allowed', async () => {
    await assertException(
      '/api/campaign/update',
      'PUT',
      {},
      message.SHOP_IS_REQUIRED,
    );
  });

  it('PUT /api/campaign/update should throw an error when shop has not found', async () => {
    await assertExceptionShopNotFound(
      '/api/campaign/update',
      'PUT',
      mockCampaignRequest,
    );
  });

  it('PUT /api/campaign/update should throw an error when campaign has not found', async () => {
    mockFindUniqueShop(mockCtx);
    await assertExceptionCampaignNotFound(
      '/api/campaign/update',
      'PUT',
      mockCampaignRequest,
    );
  });

  it('PUT /api/campaign/update should throw an error when find unique shop rejected value', async () => {
    mockFindUniqueShopException(mockCtx);
    await assertException(
      '/api/campaign/update',
      'PUT',
      mockCampaignRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('PUT /api/campaign/update should throw an error when find unique campaign rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaignException(mockCtx);
    await assertException(
      '/api/campaign/update',
      'PUT',
      mockCampaignRequest,
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('PUT /api/campaign/update should throw an error when update campaign rejected value', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaign(mockCtx);
    mockUpdateCampaignException(mockCtx);
    await assertException(
      '/api/campaign/update',
      'PUT',
      mockCampaignRequest,
      message.ERROR_UPDATE,
    );
  });

  // End testing API Update campaign

  // Begin testing API Delete campaign by shop name
  it('DELETE /api/campaign/delete/:shop should delete campaign by shop', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaign(mockCtx);
    mockDeleteCamapign(mockCtx);
    const { body, status } = await request(app).delete(
      '/api/campaign/delete/test-campaign-dev.mycampaignify.com',
    );
    expect(status).toEqual(200);
    expect(body.id).toEqual('6410562e7170d091ceec8a12');
  });

  it('DELETE /api/campaign/delete/:shop should throw an error when delete shop by name has exception', async () => {
    await assertExceptionShopNotFound(
      '/api/campaign/delete/test-campaign-dev.mycampaignify.com',
      'DELETE',
      {},
    );
  });

  it('DELETE /api/campaign/delete/:shop should throw an error when delete campaign by shop is empty', async () => {
    mockFindUniqueShop(mockCtx);
    await assertExceptionCampaignNotFound(
      '/api/campaign/delete/test-campaign-dev.mycampaignify.com',
      'DELETE',
      {},
    );
  });

  it('DELETE /api/campaign/delete/:shop throw an exception when find unique shop has an error', async () => {
    mockFindUniqueShopException(mockCtx);
    await assertException(
      '/api/campaign/delete/test-campaign-dev.mycampaignify.com',
      'DELETE',
      {},
      message.ERROR_FIND_UNIQUE,
    );
  });

  it('DELETE /api/campaign/delete/:shop throw an exception when find unique campaign has an error', async () => {
    mockFindUniqueShop(mockCtx);
    mockFindUniqueCampaignException(mockCtx);
    await assertException(
      '/api/campaign/delete/test-campaign-dev.mycampaignify.com',
      'DELETE',
      {},
      message.ERROR_FIND_UNIQUE,
    );
  });

  // End testing API Get campaign by shop name
});
