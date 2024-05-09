import { message } from '../../errors/message';
import { getContext, MockContext } from '../../../database/context';
import request from 'supertest';
import app from '../../../config/app';
import {
  mockFindUniqueMediaEmpty,
  mockCreateMediaException,
  mockMediaRequest,
  mockCreateMedia,
} from '../../../mocks';

let mockCtx: MockContext;
jest.useRealTimers();

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

jest.mock('../handler', () => {
  return {
    uploadMediaInGS: jest
      .fn()
      .mockReturnValue(Promise.resolve(true)),
  };
});

describe('API SHOP /api/media', () => {
  it('POST /api/media/add should create new media', async () => {
    mockFindUniqueMediaEmpty(mockCtx);
    mockCreateMedia(mockCtx);
    const { body, status } = await request(app)
      .post('/api/media/add')
      .send(mockMediaRequest);
    expect(status).toEqual(200);
    expect(body.mediaUploaded).toEqual(true);
  });

  it('POST /api/media/add should throw an error when create rejected value', async () => {
    mockCreateMediaException(mockCtx);

    const { body, status } = await request(app)
      .post('/api/media/add')
      .send(mockMediaRequest);
    expect(status).toEqual(500);
    expect(body.message).toEqual(message.ERROR_CREATE);
  });

  it('POST /api/media/add should throw exception when field request is not allowed', async () => {
    const { body, status } = await request(app).post('/api/media/add').send({
      ratio: 10,
    });
    expect(status).toEqual(500);
    expect(body.message).toEqual('"file" is required');
  });
});
