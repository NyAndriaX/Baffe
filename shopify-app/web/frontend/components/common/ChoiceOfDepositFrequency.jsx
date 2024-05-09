import { Checkbox, Grid, Select, Stack } from '@shopify/polaris';
import React, { useContext } from 'react';
import CampaignSettingContext, {
  OptionsDaysType,
  OptionsScheduleType,
} from '../../context/campaignSetting.context';

export default function ChoiceOfDepositFrequency() {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);

  const handleCheckedDays = (newChecked, id) => {
    setValue({
      ...value,
      optionDays: OptionsDaysType.CUSTOMIZE,
      days: {
        ...value.days,
        [id]: newChecked,
      },
    });
  };

  const handleSelectDaysChange = optionDays => {
    setValue({
      ...value,
      optionDays,
    });
  };

  const handleSelectScheduleChange = optionSchedule =>
    setValue({
      ...value,
      optionSchedule,
    });

  const handleSelectScheduleChangeBegin = scheduleBegin =>
    setValue({
      ...value,
      optionSchedule: OptionsScheduleType.CUSTOMIZE,
      scheduleBegin,
    });

  const handleSelectScheduleChangeEnd = scheduleEnd =>
    setValue({
      ...value,
      optionSchedule: OptionsScheduleType.CUSTOMIZE,
      scheduleEnd,
    });

  const optionListDays = [
    {
      label: i18n.translate('stepOne.everyDayExceptWeekends'),
      value: OptionsDaysType.EVERY_DAY_EXCEPT_WEEKENDS,
    },
    {
      label: i18n.translate('stepOne.customize'),
      value: OptionsDaysType.CUSTOMIZE,
    },
  ];

  const optionListSchedule = [
    {
      label: i18n.translate('stepOne.scheduleComplete'),
      value: OptionsScheduleType.COMPLETE,
    },
    {
      label: i18n.translate('stepOne.customize'),
      value: OptionsScheduleType.CUSTOMIZE,
    },
  ];

  const hours = [
    ['09', '9am'],
    ['10', '10am'],
    ['11', '11am'],
    ['12', '12pm'],
    ['13', '1pm'],
    ['14', '2pm'],
    ['15', '3pm'],
    ['16', '4pm'],
    ['17', '5pm'],
    ['18', '6pm'],
    ['19', '7pm'],
  ];

  const optionsScheduleBegin = hours.map(hour => ({
    label: i18n.translate(`stepOne.hours.${hour[0]}`),
    value: hour[1],
  }));

  const optionsScheduleEnd = hours.slice(1).map(hour => ({
    label: i18n.translate(`stepOne.hours.${hour[0]}`),
    value: hour[1],
  }));

  const daysRowOne = [
    {
      label: i18n.translate('stepOne.friday'),
      name: 'friday',
    },
    {
      label: i18n.translate('stepOne.saturday'),
      name: 'saturday',
    },
    {
      label: i18n.translate('stepOne.sunday'),
      name: 'sunday',
    },
  ];

  const daysRowTwo = [
    {
      label: i18n.translate('stepOne.monday'),
      name: 'monday',
    },
    {
      label: i18n.translate('stepOne.tuesday'),
      name: 'tuesday',
    },
    {
      label: i18n.translate('stepOne.wednesday'),
      name: 'wednesday',
    },
    {
      label: i18n.translate('stepOne.thursday'),
      name: 'thursday',
    },
  ];

  return (
    <Stack spacing="loose" vertical>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 7, xl: 7 }}>
          <Select
            label={i18n.translate('stepOne.days')}
            options={optionListDays}
            onChange={handleSelectDaysChange}
            value={value.optionDays}
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 5, xl: 5 }}>
          <Select
            label={i18n.translate('stepOne.schedule')}
            options={optionListSchedule}
            onChange={handleSelectScheduleChange}
            value={value.optionSchedule}
          />
        </Grid.Cell>
      </Grid>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 7, xl: 7 }}>
          {value.optionDays === OptionsDaysType.CUSTOMIZE && (
            <Stack spacing="baseTight">
              {daysRowOne.map(el => (
                <Checkbox
                  key={el.name}
                  label={el.label}
                  id={el.name}
                  checked={value.days && value.days[el.name]}
                  onChange={handleCheckedDays}
                />
              ))}
              {daysRowTwo.map(el => (
                <Checkbox
                  key={el.name}
                  label={el.label}
                  id={el.name}
                  checked={value.days && value.days[el.name]}
                  onChange={handleCheckedDays}
                />
              ))}
            </Stack>
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 5, xl: 5 }}>
          {value.optionSchedule === OptionsScheduleType.CUSTOMIZE && (
            <Stack spacing="baseTight">
              <Select
                label={i18n.translate('stepOne.begin')}
                options={optionsScheduleBegin}
                onChange={handleSelectScheduleChangeBegin}
                value={value.scheduleBegin}
              />
              <Select
                label={i18n.translate('stepOne.end')}
                options={optionsScheduleEnd}
                onChange={handleSelectScheduleChangeEnd}
                value={value.scheduleEnd}
              />
            </Stack>
          )}
        </Grid.Cell>
      </Grid>
    </Stack>
  );
}
