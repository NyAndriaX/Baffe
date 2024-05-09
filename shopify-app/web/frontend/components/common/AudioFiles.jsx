import {
  Button,
  DropZone,
  Grid,
  Icon,
  Spinner,
  Stack,
  Text,
  TextContainer,
  Toast,
} from '@shopify/polaris';
import { CirclePlusMinor } from '@shopify/polaris-icons';
import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import CampaignSettingContext from '../../context/campaignSetting.context';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';
import { LIMIT_AUDIO } from '../../data';

export default function AudioFiles() {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetch = useAuthenticatedFetch();

  async function updateAudioFiles({ file, id, audioBase64 }) {
    setLoading(true);
    setValue({ ...value, disabled: true });

    const media = await PostUploadVoiceMail({ file, audioBase64 });
    if (media && media.id) {
      const listAudioNotUpdated = value.voicemail.filter(el => el.id !== id);
      let newListAudios = listAudioNotUpdated;
      newListAudios.push({ id, file, ratio: 100, mediaId: media.id });
      const voiceMails = value.voiceMails;
      voiceMails.push({
        mediaId: media.id,
        ratio: 100,
      });
      newListAudios = newListAudios.sort((a, b) => a.id - b.id);
      setValue({
        ...value,
        voicemail: [...newListAudios],
        voiceMails,
        disabled: false,
      });
    } else {
      console.log('===>', media)
      setError(true);
    }
    setLoading(false);
  }

  const PostUploadVoiceMail = async data => {
    try {
      const response = await fetch('/api/media/add', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const handleDropZoneDrop = (
    _dropFiles,
    acceptedFiles,
    _rejectedFiles,
    audioId
  ) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function () {
      const audioBase64 = reader.result;
      updateAudioFiles({
        file: acceptedFiles[0].name,
        id: audioId,
        audioBase64,
        ratio: 100,
      }).then(() => console.log('media uploaded'));
    };
  };

  const validAudioTypes = ['audio/mpeg'];

  const fileUpload = file => {
    if (!file) {
      return !loading ? (
        <DropZone.FileUpload
          actionHint="Format .mp3 ou .mp4"
          actionTitle={i18n.translate('stepTwo.upload')}
          acceptedFiles={validAudioTypes}
        />
      ) : (
        <Spinner />
      );
    }
  };

  const uploadedFiles = file =>
    file && (
      <Stack vertical>
        <div>{file} </div>
      </Stack>
    );

  const handleAddAudio = () => {
    if (value.voicemail.length < LIMIT_AUDIO) {
      setValue({
        ...value,
        voicemail: [
          ...value.voicemail,
          { id: value.voicemail.length + 1, file: null, ratio: 100 },
        ],
      });
    }
  };

  const toastError = error ? (
    <Toast
      content={i18n.translate('stepTwo.errorToaster')}
      error
      onDismiss={() => setError(false)}
    />
  ) : null;

  return (
    <StyledDiv>
      {toastError}
      <TextContainer>
        <Text variant="headingMd" as="h2">
          {i18n.translate('stepTwo.title')}
        </Text>
        <p className="description">{i18n.translate('stepTwo.description')}</p>
      </TextContainer>
      <br />
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 12, md: 3, lg: 6, xl: 6 }}>
          <Stack>
            {value.voicemail.map(el => (
              <div key={el.id}>
                <DropZone
                  accept="audio/mpeg"
                  type="audio"
                  errorOverlayText="Format .mp3 ou .mp4"
                  onDrop={(files, acceptedFiles, rejectedFiles) =>
                    handleDropZoneDrop(
                      files,
                      acceptedFiles,
                      rejectedFiles,
                      el.id
                    )
                  }
                  variableHeight
                  label={
                    el.file
                      ? i18n.translate('stepTwo.fileUploaded')
                      : i18n.translate('stepTwo.uploadYourFileAudio')
                  }
                  allowMultiple={false}
                >
                  {uploadedFiles(el.file)}
                  {fileUpload(el.file)}
                </DropZone>
              </div>
            ))}
          </Stack>
        </Grid.Cell>
        {value.voicemail.filter(
          el =>
            el.id &&
            el.id > 0 &&
            el.file &&
            el.file !== '' &&
            el.mediaId &&
            el.mediaId !== ''
        ).length === 1 && (
          <Grid.Cell columnSpan={{ xs: 6, sm: 12, md: 3, lg: 6, xl: 6 }}>
            <Stack>
              <Icon source={CirclePlusMinor} color="primary" />
              <Button primary onClick={handleAddAudio}>
                {i18n.translate('stepTwo.addOtherAudio')}
              </Button>
            </Stack>
            <TextContainer>
              <Text variant="bodySm" as="p">
                {i18n.translate('stepTwo.addOtherAudioDescription')}
              </Text>
            </TextContainer>
          </Grid.Cell>
        )}
      </Grid>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .Polaris-TextContainer {
    margin-bottom: 2rem;

    p.description {
      color: #6d7175;
    }
  }

  .Polaris-Grid {
    .Polaris-Grid-Cell:first-of-type {
      .Polaris-Stack {
        .Polaris-Stack__Item {
          .Polaris-DropZone {
            width: 16.5rem;
            height: 6.75rem;
            .Polaris-DropZone__Container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .Polaris-Stack {
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

      @media screen and (max-width: 792px) {
        .Polaris-Stack:first-child {
          .Polaris-Stack__Item {
            width: 96%;
            .Polaris-DropZone {
              width: 100%;
            }
          }
        }
      }
    }

    .Polaris-Grid-Cell:last-of-type {
      .Polaris-Stack {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 0.5rem;
      }

      .Polaris-TextContainer {
        margin-top: 0.5rem;
        color: #6d7175;
      }
    }
  }
`;
