import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormField } from '../components/FormField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const currencies = ['EUR', 'USD', 'CAD', 'AUD', 'NZD', 'BRL', 'NOK', 'PEN', 'CLP', 'MXN', 'GBP', 'CHF', 'ZAR', 'PLN', 'JPY'];

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

const sectionStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1rem',
};

const ManualProviderForm = () => {
  const { register, control, setValue } = useFormContext();

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

  const selectorsString = useWatch({ control, name: 'selectors' }) || '';
  const selectors: string[] = selectorsString
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Schedule */}
      <div style={sectionStyle}>
        <FormField label="Bonus Name (ID)">
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
      </div>

      <FormField label="Trigger Name">
        <input {...register('triggerName')} required />
      </FormField>

      {/* Stake limits */}
      <fieldset>
        <legend><strong>Minimum Stake To Wager</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`min-stake-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`minimumStakeToWager.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend><strong>Maximum Stake To Wager</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`max-stake-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`maximumStakeToWager.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Max Bonus */}
      <fieldset>
        <legend><strong>Maximum Bonus Amount</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`max-amount-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`maximumAmount.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Core Config */}
      <div style={sectionStyle}>
        <FormField label="Bonus Percentage">
          <input type="number" {...register('percentage', { valueAsNumber: true })} required />
        </FormField>
        <FormField label="Wagering Multiplier">
          <input type="number" {...register('wageringMultiplier', { valueAsNumber: true })} required />
        </FormField>
        <FormField label="Expiry (e.g. 7d)">
          <input {...register('expiry')} required />
        </FormField>
      </div>

      {/* Max Withdraw Cap */}
      <fieldset>
        <legend><strong>Maximum Withdraw Cap</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`withdraw-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`maximumWithdraw.${cur}.cap`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Category */}
      <FormField label="Category">
        <input {...register('category')} defaultValue="games" />
      </FormField>

      {/* Selectors Input */}
      <FormField label="Selectors (comma-separated)">
        <input {...register('selectors')} placeholder="e.g. NOLIMIT,PRAGMATIC" />
      </FormField>

      {/* Proportions for Selectors */}
      {selectors.length > 0 && (
        <fieldset>
          <legend><strong>Proportions</strong></legend>
          <div style={sectionStyle}>
            {selectors.map((key: string) => (
              <FormField key={`extra.proportions.${key}`} label={`${key} Proportion`}>
                <input
                  type="number"
                  step="any"
                  {...register(`extra.proportions.${key}`, { valueAsNumber: true })}
                  placeholder="e.g. 100"
                />
              </FormField>
            ))}
          </div>
        </fieldset>
      )}

      {/* Toggles */}
      <label><input type="checkbox" {...register('compensateOverspending')} /> &nbsp; Compensate Overspending</label>
      <label><input type="checkbox" {...register('includeAmountOnTargetWagerCalculation')} /> &nbsp; Include Amount on Wager Target</label>
      <label><input type="checkbox" {...register('capCalculationAmountToMaximumBonus')} /> &nbsp; Cap to Max Bonus</label>
      <label><input type="checkbox" {...register('withdrawActive')} /> &nbsp; Withdraw Active</label>
    </div>
  );
};

export default ManualProviderForm;
