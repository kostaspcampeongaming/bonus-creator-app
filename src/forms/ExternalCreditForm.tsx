import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../components/FormField';

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

const ExternalCreditForm = () => {
  const { register } = useFormContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* General Info */}
      <div style={sectionStyle}>
        <FormField label="Bonus Name (ID)">
          <input {...register('name')} required />
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

      {/* Cost Per Currency */}
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

      {/* Multiplier Per Currency */}
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

      {/* Withdraw Caps */}
      <fieldset>
        <legend><strong>Maximum Withdraw Cap Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`maximumWithdraw.${cur}.cap`} label={cur}>
              <input type="number" step="any" {...register(`maximumWithdraw.${cur}.cap`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Additional Config */}
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
          <textarea {...register('games')} rows={3} placeholder="Safari Sam 2" />
        </FormField>
      </fieldset>

      {/* Withdraw Active */}
      <label style={{ marginTop: '1rem' }}>
        <input type="checkbox" {...register('withdrawActive')} />
        &nbsp; Withdraw Active
      </label>
    </div>
  );
};

export default ExternalCreditForm;
