'use strict';

import { Request } from 'express';

import Joi from 'joi';

function validateAdd(req: Request) {
  const params = Object.assign({}, req.params, req.query, req.body);

  return Joi.attempt(
    params,
    Joi.object({
      file: Joi.string().required(),
      audioBase64: Joi.string().required(),
    }).required(),
  );
}

export default {
  validateAdd,
};
