'use strict';

import { Request } from 'express';

import Joi from 'joi';

function validateCampaignRequest(req: Request) {
  const params = Object.assign({}, req.params, req.query, req.body);

  return Joi.attempt(
    params,
    Joi.object({
      shop: Joi.string().required(),
      days: Joi.object().required(),
      optionDays: Joi.string().required(),
      optionSchedule: Joi.string().required(),
      scheduleBegin: Joi.string().required(),
      scheduleEnd: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      voiceMails: Joi.array()
        .items(
          Joi.object({
            mediaId: Joi.string().required(),
            ratio: Joi.number().required(),
          }),
        )
        .required(),
      state: Joi.string().default('pause').required(),
    }).required(),
  );
}

export default {
  validateCampaignRequest,
};
