import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

let ctx: Context;
let env = '';

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};

export const createContext = (): Context => {
  return {
    prisma: new PrismaClient(),
  };
};

export const getContext = (): Context => {
  const environment: string = process.env.NODE_ENV ?? 'test';
  if (env === environment && ctx !== null) {
    return ctx;
  } else if (environment === 'test') {
    ctx = createMockContext();
  } else {
    ctx = createContext();
  }
  env = environment;
  return ctx;
};
