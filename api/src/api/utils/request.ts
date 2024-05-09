import { Response } from 'express';

export function handleError(res: Response, e: unknown) {
  const message = (e as Error).message;
  return res.status(500).send({
    message,
  });
}
