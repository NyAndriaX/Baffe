import { createContext } from 'react';

const initialDaysValues = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: false,
  sunday: false,
};

export const StateType = {
  ACTIVE: 'active',
  PAUSE: 'pause',
};

export const OptionsDaysType = {
  EVERY_DAY_EXCEPT_WEEKENDS: 'everyDayExceptWeekends',
  CUSTOMIZE: 'customize',
};

export const OptionsScheduleType = {
  COMPLETE: '9h-19h',
  CUSTOMIZE: 'customize',
};

export const initialCampaignValue = {
  step: 0,
  days: initialDaysValues,
  optionDays: OptionsDaysType.EVERY_DAY_EXCEPT_WEEKENDS,
  optionSchedule: OptionsScheduleType.COMPLETE,
  scheduleBegin: '9h',
  scheduleEnd: '19h',
  voicemail: [
    {
      id: 1,
      file: null,
      ratio: 100,
      mediaId: null
    },
  ],
  voiceMails: [],
  phoneNumber: '',
  state: StateType.PAUSE,
  saved: false,
  disabled: false,
  dismiss: false,
  confirmUpdate: false
};

const CampaignSettingContext = createContext({
  value: initialCampaignValue,
  setValue: () => initialCampaignValue,
  i18n: () => '',
});

export default CampaignSettingContext;