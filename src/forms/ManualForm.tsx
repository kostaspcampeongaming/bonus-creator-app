import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../components/FormField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const currencies = ['EUR', 'USD', 'CAD', 'AUD', 'BRL', 'NOK', 'GBP', 'NZD', 'CHF', 'MXN', 'PLN', 'PEN', 'CLP', 'ZAR', 'JPY'];

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

const ManualForm = () => {
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
      {/* General Info */}
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
        <FormField label="Trigger Name">
          <input {...register('triggerName')} required />
        </FormField>
        <FormField label="Expiry (e.g. 2d)">
          <input {...register('expiry')} required />
        </FormField>
      </div>

      {/* Cost per currency */}
      <fieldset>
        <legend><strong>Cost Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`cost-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`cost.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Multiplier per currency */}
      <fieldset>
        <legend><strong>Multiplier Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`multiplier-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`multiplier.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Maximum Bets */}
      <fieldset>
        <legend><strong>Maximum Bets Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`maximumBets-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`maximumBets.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Config Fields */}
      <div style={sectionStyle}>
        <FormField label="Provider">
          <input {...register('provider')} />
        </FormField>
        <FormField label="Brand">
          <input {...register('brand')} />
        </FormField>
        <FormField label="Category">
          <input {...register('category')} placeholder="games" />
        </FormField>
        <FormField label="Bonus Type">
          <input {...register('bonusType')} defaultValue="free_bet" readOnly />
        </FormField>
      </div>

      {/* Games */}
      <fieldset>
        <legend><strong>Games</strong></legend>
        <FormField label="Game Names (comma-separated)">
          <textarea {...register('games')} rows={3} placeholder="The Dog House Megaways, Gates of Olympus" />
        </FormField>
      </fieldset>

      {/* Toggles */}
      <label style={{ marginTop: '1rem' }}>
        <input type="checkbox" {...register('withdrawActive')} />
        &nbsp; Withdraw Active
      </label>

      {/* Maximum Withdraw */}
      <fieldset>
        <legend><strong>Maximum Withdraw Amounts</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`maximumWithdraw-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`maximumWithdraw.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ManualForm;
