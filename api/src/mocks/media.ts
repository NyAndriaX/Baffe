import { message } from '../api/errors/message';
import { MockContext } from '../database/context/index';
import { Media, MediaInput } from '../typings';

export const mockMediaRequest: MediaInput = {
  file: 'upvoice-1.mp3',
  audioBase64: 'base64Test',
};

export const mockMedia: Partial<Media> = {
  ...mockMediaRequest,
  id: '640eff2bb63aa9959fc920e9',
};

export const mockMediaWitAuditDate: Media = {
  id: '63ea109dba678075a50bb581',
  file: 'upvoice-1.mp3',
  url: 'https://example.com/upvoice-1.mp3',
  created_at: new Date(),
  updated_at: new Date(),
};

export function mockFindUniqueMedia(mockCtx: MockContext) {
  mockCtx.prisma.media.findUnique.mockResolvedValue(mockMediaWitAuditDate);
}

export function mockFindUniqueMediaEmpty(mockCtx: MockContext) {
  mockCtx.prisma.media.findUnique.mockResolvedValue(null);
}

export function mockFindUniqueMediaException(mockCtx: MockContext) {
  mockCtx.prisma.media.findUnique.mockRejectedValue(
    new Error(message.ERROR_FIND_UNIQUE),
  );
}

export function mockCreateMedia(mockCtx: MockContext) {
  mockCtx.prisma.media.create.mockResolvedValue(mockMediaWitAuditDate);
}

export function mockCreateMediaException(mockCtx: MockContext) {
  mockCtx.prisma.media.create.mockRejectedValue(
    new Error(message.ERROR_CREATE),
  );
}

export function mockUpdateMedia(mockCtx: MockContext) {
  mockCtx.prisma.media.update.mockResolvedValue(mockMediaWitAuditDate);
}

export function mockUpdateMediaException(mockCtx: MockContext) {
  mockCtx.prisma.media.update.mockRejectedValue(
    new Error(message.ERROR_UPDATE),
  );
}
