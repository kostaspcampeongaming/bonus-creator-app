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

const ExternalCreditForm = () => {
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
        <FormField label="Trigger Duration (e.g. 2d)">
          <input {...register('duration')} required />
        </FormField>
        <FormField label="Expiry (e.g. 2d)">
          <input {...register('expiry')} required />
        </FormField>
      </div>

      {/* ...rest of the form unchanged... */}
      {/* Cost, Multiplier, Bets, Withdraw, Config, etc. remain as-is */}
    </div>
  );
};

export default ExternalCreditForm;
