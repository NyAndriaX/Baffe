import { MockContext, getContext } from '../../context/index';
import * as mediaRepository from '../media.repository';
import {
  mockCreateMedia,
  mockCreateMediaException,
  mockFindUniqueMedia,
  mockFindUniqueMediaEmpty,
  mockFindUniqueMediaException,
  mockMediaRequest,
  mockMediaWitAuditDate,
  mockUpdateMedia,
  mockUpdateMediaException,
} from '../../../mocks';

let mockCtx: MockContext;

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

test('should create new media if not exist in database', async () => {
  mockCreateMedia(mockCtx);

  const mediaCreated = await mediaRepository.add(mockMediaRequest);

  expect(mediaCreated?.file).toEqual(mockMediaRequest.file);
});

test('should throw runtime exception when create rejected value', async () => {
  mockCreateMediaException(mockCtx);

  await expect(mediaRepository.add(mockMediaRequest)).rejects.toThrow(Error);
});

test('should find media by name when media is exist', async () => {
  mockFindUniqueMedia(mockCtx);

  const mediaFind = await mediaRepository.findById('640eff2bb63aa9959fc920e9');

  expect(mediaFind?.file).toEqual(mockMediaRequest.file);
});

test('should find null when media is not exist', async () => {
  mockFindUniqueMediaEmpty(mockCtx);

  const mediaFind = await mediaRepository.findById('640eff2bb63aa9959fc920e9');

  expect(mediaFind).toEqual(null);
});

test('should throw runtime exception when find unique rejected value', async () => {
  mockFindUniqueMediaException(mockCtx);

  await expect(
    mediaRepository.findById('640eff2bb63aa9959fc920e9'),
  ).rejects.toThrow(Error);
});

test('should update media when media is exist', async () => {
  mockUpdateMedia(mockCtx);

  const mediaFind = await mediaRepository.update(mockMediaWitAuditDate);

  expect(mediaFind?.file).toEqual(mockMediaWitAuditDate.file);
});

test('should throw runtime exception when update rejected value', async () => {
  mockUpdateMediaException(mockCtx);

  await expect(mediaRepository.update(mockMediaWitAuditDate)).rejects.toThrow(
    Error,
  );
});
