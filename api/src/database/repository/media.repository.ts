import { Media, MediaInput } from '../../typings';
import { Context, getContext } from '../context';

const ctx: Context = getContext();

export async function add(data: MediaInput): Promise<Media> {
  return ctx.prisma.media.create({
    data,
  });
}

export async function findById(id: string): Promise<Media | null> {
  return ctx.prisma.media.findUnique({
    where: { id },
  });
}

export async function update(media: Media): Promise<Media> {
  const { id, url, file } = media;
  return ctx.prisma.media.update({
    where: { id },
    data: { url, file },
  });
}
