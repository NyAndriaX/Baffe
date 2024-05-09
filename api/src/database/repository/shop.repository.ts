import { Shop } from '../../typings';
import { Context, getContext } from '../context';

const ctx: Context = getContext();

export async function add(name: string): Promise<Shop> {
  return ctx.prisma.shop.create({
    data: { name },
  });
}

export async function findByName(name: string): Promise<Shop | null> {
  return ctx.prisma.shop.findUnique({
    where: { name },
  });
}
