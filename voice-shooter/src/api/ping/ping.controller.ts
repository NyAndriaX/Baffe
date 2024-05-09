import { Response, Request } from 'express';

export const ping = async (req: Request, res: Response) => {
    res.status(200).send('pong');
};
