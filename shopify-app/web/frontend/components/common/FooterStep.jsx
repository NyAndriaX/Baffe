import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@shopify/polaris';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CampaignSettingContext from '../../context/campaignSetting.context';
import ButtonHelpSupport from './ButtonHelpSupport';

export default function FooterStep({ hasPrevious, stepNext, stepPrevious }) {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (value.step === 4 || stepNext === 5) {
      setDisabledButton(
        !value.phoneNumber ||
          `${value.phoneNumber}`.trim() === '' ||
          !/[+]?\d{10}/.test(value.phoneNumber)
      );
    } else if (value.step === 3) {
      const sum = value.voicemail.reduce(
        (acc, val) => acc + (!isNaN(val.ratio) ? val.ratio : 0),
        0
      );
      setDisabledButton(sum !== 100);
    } else {
      setDisabledButton(false);
    }
  }, [stepNext, value.voicemail, value.phoneNumber, value.step]);

  const goToNext = () => {
    const voicemail = value.voicemail.filter(
      el => el.mediaId && el.mediaId !== '' && el.file && el.file !== ''
    );
    if (stepNext === 4) setValue({ ...value, voicemail, step: stepNext });
    else if (stepNext === 3) {
      const voiceMailLength = voicemail.length;

      const sharedPercentage = Math.round(100 / voiceMailLength);

      let index = 0;
      for (const el of voicemail) {
        if (index < voiceMailLength - 1) {
          el.ratio = sharedPercentage;
        } else {
          const total = sharedPercentage * (voiceMailLength - 1);
          voicemail[0].ratio = 100 - total;
          el.ratio = sharedPercentage;
        }
        index++;
      }
      setValue({ ...value, voicemail, step: stepNext });
    } else {
      setValue({ ...value, step: stepNext });
    }
  };

  return (
    <StyledDiv>
      <ButtonHelpSupport />
      <ButtonGroup>
        {hasPrevious && (
          <Button onClick={() => setValue({ ...value, step: stepPrevious })}>
            {i18n.translate('global.previous')}
          </Button>
        )}
        <Button
          primary
          onClick={() => goToNext()}
          disabled={(value.step === 2 && value.disabled) || disabledButton}
        >
          {i18n.translate('global.next')}
        </Button>
      </ButtonGroup>
    </StyledDiv>
  );
}

FooterStep.propTypes = {
  stepNext: PropTypes.number.isRequired,
  hasPrevious: PropTypes.bool,
  stepPrevious: PropTypes.number,
};

FooterStep.defaultProps = {
  hasPrevious: false,
  stepPrevious: -1,
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  @media screen and (max-width: 576px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;
