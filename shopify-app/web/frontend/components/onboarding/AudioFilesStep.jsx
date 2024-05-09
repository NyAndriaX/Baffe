import { Card } from '@shopify/polaris';
import React, { useContext } from 'react';
import styled from 'styled-components';
import AudioFiles from '../common/AudioFiles';
import FooterStep from '../common/FooterStep';
import CampaignSettingContext from '../../context/campaignSetting.context';
import { LIMIT_AUDIO } from '../../data';

export default function AudioFilesStep() {
  const { value } = useContext(CampaignSettingContext);
  return (
    <StyledDiv>
      <Card>
        <Card.Section>
          <AudioFiles />
          <br />
          <FooterStep
            stepNext={
              value.voicemail.filter(
                el => el.id && el.id > 0 && el.file && el.file !== ''
              ).length === LIMIT_AUDIO
                ? 3
                : 4
            }
            hasPrevious
            stepPrevious={1}
          />
        </Card.Section>
      </Card>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  .Polaris-Card {
    width: 38.5rem;
    //max-width: 71.75rem;
    padding: 1rem 0.5rem;
  }
`;
