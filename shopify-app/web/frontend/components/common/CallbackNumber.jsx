import { Grid, TextField } from '@shopify/polaris';
import React, { useContext } from 'react';
import styled from 'styled-components';
import CampaignSettingContext from '../../context/campaignSetting.context';

export default function CallbackNumber() {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);

  const handlePhoneNumberChanged = phoneNumber => {
    setValue({ ...value, phoneNumber });
  };

  return (
    <StyledDiv>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 8, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <TextField
            label={i18n.translate('stepFour.labelInput')}
            type="tel"
            value={value.phoneNumber}
            onChange={handlePhoneNumberChanged}
            autoComplete="off"
          />
        </Grid.Cell>
      </Grid>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin: 0.5rem auto 2.5rem;

  .Polaris-Grid {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
