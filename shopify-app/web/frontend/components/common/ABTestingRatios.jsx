import { DropZone, Grid, Stack, TextField } from '@shopify/polaris';
import React, { useContext } from 'react';
import styled from 'styled-components';
import CampaignSettingContext from '../../context/campaignSetting.context';

export default function ABTestingRatios() {
  const { value, setValue } = useContext(CampaignSettingContext);
  const MAX_VALUE = 100;
  const convertRatio = ratio =>
    !isNaN(Number.parseInt(ratio, 10)) ? Number.parseInt(ratio, 10) : '';

  const checkValueLowerThan = value => Number.parseInt(value, 10) <= MAX_VALUE;

  const calculateRatio = (otherAudioWithoutAudioSelected, ratio) => {
    const voiceMailRestLength = otherAudioWithoutAudioSelected.length;
    const myValue = !isNaN(ratio) ? ratio : 0;
    const restRatio = Math.round((100 - myValue) / voiceMailRestLength);
    let index = 0;
    for (const el of otherAudioWithoutAudioSelected) {
      if (index === voiceMailRestLength - 1) {
        const totalRest =
          100 - (myValue + restRatio * (voiceMailRestLength - 1));
        if (checkValueLowerThan(totalRest))
          otherAudioWithoutAudioSelected[0].ratio = totalRest;
      }
      if (checkValueLowerThan(restRatio)) el.ratio = restRatio;
      index++;
    }
    return otherAudioWithoutAudioSelected;
  };

  const updateValue = (
    otherAudioWithoutAudioSelected,
    audioSelected,
    ratio
  ) => {
    otherAudioWithoutAudioSelected.push({
      ...audioSelected,
      ratio: !isNaN(ratio) ? ratio : 0,
    });
    otherAudioWithoutAudioSelected = otherAudioWithoutAudioSelected.sort(
      (a, b) => a.id - b.id
    );
    setValue({ ...value, voicemail: [...otherAudioWithoutAudioSelected] });
  };

  const handleRatioChange = (ratioValue, audioId) => {
    let ratio = convertRatio(ratioValue);
    if (ratio <= MAX_VALUE) {
      const audioSelected = value.voicemail.find(el => el.id === audioId);
      let otherAudioWithoutAudioSelected = value.voicemail.filter(
        el => el.id !== audioId
      );

      otherAudioWithoutAudioSelected = calculateRatio(
        otherAudioWithoutAudioSelected,
        ratio
      );

      updateValue(otherAudioWithoutAudioSelected, audioSelected, ratio);
    }
  };

  const uploadedFiles = file =>
    file && (
      <Stack vertical>
        <div>{file} </div>
      </Stack>
    );

  return (
    <StyledDiv>
      <Grid>
        {value.voicemail &&
          value.voicemail.map(el => (
            <Grid.Cell
              columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
              key={el.id}
            >
              <DropZone label="" disabled>
                {uploadedFiles(el.file)}
              </DropZone>
              <br />
              <TextField
                type="number"
                value={value.voicemail.length === 1 ? 100 : el.ratio}
                onChange={ratio => handleRatioChange(ratio, el.id)}
                suffix="%"
                autoComplete="off"
                disabled={value.voicemail.length === 1}
              />
            </Grid.Cell>
          ))}
      </Grid>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin: 0.5rem auto 1.5rem;

  .Polaris-Grid {
    .Polaris-Grid-Cell {
      .Polaris-DropZone {
        .Polaris-DropZone__Container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .Polaris-Stack {
            padding: 1.5rem;
            .Polaris-Stack__Item {
              background-color: #dbdddf;
              padding: 0.25rem 0.375rem;
              border-radius: 4px;
              text-align: center;
            }
          }
        }
      }
    }
  }
`;
