export enum CampaignState {
  ACTIVE = 'active',
  PAUSE = 'pause',
}

export type CampaignStateType =
  | CampaignState.ACTIVE
  | CampaignState.PAUSE;

export type Campaign = {
  id: string;
  created_at: Date;
  updated_at: Date;
  days: DayActivity | null;
  optionDays: string | null;
  optionSchedule: string | null;
  scheduleBegin: string | null;
  scheduleEnd: string | null;
  phoneNumber: string | null;
  voiceMails: VoiceMail[];
  state: string;
  shopId: string;
};

export type CampaignInput = {
  days: DayActivity | null;
  optionDays: string | null;
  optionSchedule: string | null;
  scheduleBegin: string | null;
  scheduleEnd: string | null;
  phoneNumber: string | null;
  voiceMails: VoiceMail[];
  state: CampaignStateType;
  shopId: string;
};

export type CampaignOutput = {
  id: string;
  days: DayActivity;
  optionDays: string;
  optionSchedule: string;
  scheduleBegin: string;
  scheduleEnd: string;
  phoneNumber: string;
  voicemail: VoiceMailOutput[];
  state: CampaignStateType;
  shopId: string;
};

export type CampaignResolved = Required<Campaign>;

export type CampaignPartial = Partial<Campaign>;

export type CampaignRequest = Omit<CampaignPartial, 'shop'> & { shop: string };

export type DayActivity = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export type VoiceMail = {
  mediaId: string;
  ratio: number;
  url: string | null;
};

export type VoiceMailOutput = {
  id: number;
  file: string;
  ratio: number;
  mediaId: string;
};
