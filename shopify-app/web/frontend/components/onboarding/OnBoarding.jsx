import React, { useContext } from 'react';
import CampaignSettingContext from '../../context/campaignSetting.context';
import WelcomeOnBoarding from './WelcomeOnBoarding';
import ChoiceOfDepositFrequencyStep from './ChoiceOfDepositFrequencyStep';
import AudioFilesStep from './AudioFilesStep';
import ABTestingRatiosStep from './ABTestingRatiosStep';
import CallbackNumberStep from './CallbackNumberStep';
import CampaignSettingStep from './CampaignSettingStep';
import ConfirmationCampaignLaunched from './ConfirmationCampaignLaunched';
import Dashboard from '../dashboard/Dashboard';
import { Frame } from '@shopify/polaris';

export default function OnBoarding() {
  const { value } = useContext(CampaignSettingContext);

  return (
    <Frame>
      {(value.step === 0 && <WelcomeOnBoarding />) ||
        (value.step === 1 && <ChoiceOfDepositFrequencyStep />) ||
        (value.step === 2 && <AudioFilesStep />) ||
        (value.step === 3 && <ABTestingRatiosStep />) ||
        (value.step === 4 && <CallbackNumberStep />) ||
        (value.step === 5 && <CampaignSettingStep />) ||
        (value.step === 6 && <ConfirmationCampaignLaunched />) ||
        ((value.step === 7 || value.step === 8) && <Dashboard />)}
    </Frame>
  );
}
