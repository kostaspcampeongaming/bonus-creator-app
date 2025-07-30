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

const DepositOpenForm = () => {
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
        <FormField label="Trigger Duration">
          <input {...register('duration')} required />
        </FormField>
        <FormField label="Expiry">
          <input {...register('expiry')} required />
        </FormField>
      </div>

      {/* Trigger IDs */}
      <fieldset>
        <legend><strong>Trigger IDs</strong></legend>
        <FormField label="Enter comma-separated bonus trigger IDs">
          <textarea {...register('triggerIds')} rows={3} placeholder="Welcome Casino Package 1st Deposit FI, ..." />
        </FormField>
      </fieldset>

      {/* Minimum Deposit Per Currency */}
      <fieldset>
        <legend><strong>Minimum Deposit Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <FormField key={`min-${cur}`} label={cur}>
              <input type="number" step="any" {...register(`minimumAmount.${cur}`, { valueAsNumber: true })} />
            </FormField>
          ))}
        </div>
      </fieldset>

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

      {/* Maximum Withdraw */}
      <fieldset>
        <legend><strong>Maximum Withdraw Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <div key={`maximumWithdraw-${cur}`} style={fieldStyle}>
              <FormField label={`${cur} Cap`}>
                <input type="number" step="any" {...register(`maximumWithdraw.${cur}.cap`, { valueAsNumber: true })} />
              </FormField>
              <FormField label={`${cur} Multiplier`}>
                <input type="number" step="any" {...register(`maximumWithdraw.${cur}.multiplier`, { valueAsNumber: true })} />
              </FormField>
            </div>
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
          <textarea {...register('games')} rows={3} placeholder="Big Bass Splash, ..." />
        </FormField>
      </fieldset>

      {/* Withdraw Toggle */}
      <label style={{ marginTop: '1rem' }}>
        <input type="checkbox" {...register('withdrawActive')} />
        &nbsp; Withdraw Active
      </label>
    </div>
  );
};

export default DepositOpenForm;
