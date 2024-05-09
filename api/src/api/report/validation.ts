'use strict';

import { Request } from 'express';

import Joi from 'joi';

function validateBodyCheckouts(req: Request) {
  const body = Object.assign({}, req.body);

  return Joi.attempt(
    body,
    Joi.object({
      data: Joi.array().items(Joi.object()).not().empty().required(),
    }).required(),
  );
}

export default {
  validateBodyCheckouts,
};
