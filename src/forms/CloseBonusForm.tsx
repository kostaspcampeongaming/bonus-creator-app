import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../components/FormField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const currencies = ['EUR', 'USD', 'CAD', 'AUD', 'BRL', 'NOK', 'GBP', 'NZD', 'CHF', 'MXN', 'PLN', 'PEN', 'CLP', 'ZAR', 'JPY'];

const sectionStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1rem',
};

const CloseBonusForm = () => {
  const { register, setValue } = useFormContext();
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleFromChange = (date: Date | null) => {
    setFromDate(date);
    if (date) setValue('from', format(date, 'dd-MM-yyyy HH:mm'));
  };

  const handleToChange = (date: Date | null) => {
    setToDate(date);
    if (date) setValue('to', format(date, 'dd-MM-yyyy HH:mm'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={sectionStyle}>
        <FormField label="Bonus ID">
          <input {...register('name')} required />
        </FormField>
        <FormField label="From (date & time)">
          <>
            <input type="hidden" {...register('from')} />
            <DatePicker
              selected={fromDate}
              onChange={handleFromChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd-MM-yyyy HH:mm"
              timeCaption="Time"
              placeholderText="Select start date & time"
            />
          </>
        </FormField>
        <FormField label="To (date & time)">
          <>
            <input type="hidden" {...register('to')} />
            <DatePicker
              selected={toDate}
              onChange={handleToChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd-MM-yyyy HH:mm"
              timeCaption="Time"
              placeholderText="Select end date & time"
            />
          </>
        </FormField>
        <FormField label="Trigger Name">
          <input {...register('triggerName')} required />
        </FormField>
        <FormField label="Trigger Description">
          <input {...register('triggerDescription')} />
        </FormField>
        <FormField label="Duration (e.g. 2d)">
          <input {...register('duration')} required />
        </FormField>
        <FormField label="Expiry (e.g. 30d)">
          <input {...register('expiry')} required />
        </FormField>
      </div>

      <div style={sectionStyle}>
        <FormField label="Trigger IDs (comma-separated)">
          <input {...register('triggerIds')} placeholder="bonus-id-1, bonus-id-2" />
        </FormField>
        <FormField label="Iterations">
          <input type="number" {...register('iterations', { valueAsNumber: true })} required />
        </FormField>
        <FormField label="Segments (comma-separated)">
          <input {...register('segments')} />
        </FormField>
      </div>

      {[ // Currency Maps
        { label: 'Minimum Amount', key: 'minimumAmount' },
        { label: 'Min Stake to Wager', key: 'minimumStakeToWager' },
        { label: 'Max Stake to Wager', key: 'maximumStakeToWager' },
        { label: 'Maximum Bonus Amount', key: 'maximumAmount' },
        { label: 'Maximum Withdraw', key: 'maximumWithdraw' },
      ].map(section => (
        <fieldset key={section.key}>
          <legend><strong>{section.label}</strong></legend>
          <div style={sectionStyle}>
            {currencies.map(cur => (
              <FormField key={`${section.key}-${cur}`} label={cur}>
                <input
                  type="number"
                  step="any"
                  {...register(`${section.key}.${cur}`, { valueAsNumber: true })}
                />
              </FormField>
            ))}
          </div>
        </fieldset>
      ))}

      <div style={sectionStyle}>
        <FormField label="Bonus Percentage">
          <input type="number" {...register('percentage', { valueAsNumber: true })} required />
        </FormField>
        <FormField label="Wagering Multiplier">
          <input type="number" {...register('wageringMultiplier', { valueAsNumber: true })} required />
        </FormField>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <label><input type="checkbox" {...register('includeAmountOnTargetWagerCalculation')} /> Include Amount on Wager Target</label>
        <label><input type="checkbox" {...register('capCalculationAmountToMaximumBonus')} /> Cap to Max Bonus</label>
        <label><input type="checkbox" {...register('compensateOverspending')} /> Compensate Overspending</label>
        <label><input type="checkbox" {...register('withdrawActive')} /> Withdraw Active</label>
      </div>

      <div style={sectionStyle}>
        <FormField label="Bonus Category">
          <input {...register('category')} placeholder="games" required />
        </FormField>
      </div>
    </div>
  );
};

export default CloseBonusForm;
