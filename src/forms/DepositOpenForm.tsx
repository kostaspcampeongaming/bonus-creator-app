import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { FormSection } from '../components/FormSection';

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
        <div style={fieldStyle}>
          <label>Bonus Name (ID)</label>
          <input {...register('name')} required />
        </div>
        <div style={fieldStyle}>
          <label>Trigger Name</label>
          <input {...register('triggerName')} required />
        </div>
        <div style={fieldStyle}>
          <label>Trigger Duration</label>
          <input {...register('duration')} required />
        </div>
        <div style={fieldStyle}>
          <label>Expiry</label>
          <input {...register('expiry')} required />
        </div>
      </div>

      {/* Trigger IDs */}
      <fieldset>
        <legend><strong>Trigger IDs</strong></legend>
        <div style={fieldStyle}>
          <label>Enter comma-separated bonus trigger IDs</label>
          <textarea {...register('triggerIds')} rows={3} placeholder="Welcome Casino Package 1st Deposit FI, ..." />
        </div>
      </fieldset>

      {/* Minimum Deposit Per Currency */}
      <fieldset>
        <legend><strong>Minimum Deposit Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <div style={fieldStyle} key={`min-${cur}`}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`minimumAmount.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Cost Per Currency */}
      <fieldset>
        <legend><strong>Cost Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <div style={fieldStyle} key={`cost-${cur}`}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`cost.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Multiplier Per Currency */}
      <fieldset>
        <legend><strong>Multiplier Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <div style={fieldStyle} key={`multiplier-${cur}`}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`multiplier.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Maximum Bets */}
      <fieldset>
        <legend><strong>Maximum Bets Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <div style={fieldStyle} key={`maximumBets-${cur}`}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`maximumBets.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Maximum Withdraw */}
      <fieldset>
        <legend><strong>Maximum Withdraw Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map(cur => (
            <div key={`maximumWithdraw-${cur}`} style={fieldStyle}>
              <label>{cur} Cap</label>
              <input type="number" step="any" {...register(`maximumWithdraw.${cur}.cap`)} />
              <label>{cur} Multiplier</label>
              <input type="number" step="any" {...register(`maximumWithdraw.${cur}.multiplier`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Config Fields */}
      <div style={sectionStyle}>
        <div style={fieldStyle}>
          <label>Provider</label>
          <input {...register('provider')} />
        </div>
        <div style={fieldStyle}>
          <label>Brand</label>
          <input {...register('brand')} />
        </div>
        <div style={fieldStyle}>
          <label>Category</label>
          <input {...register('category')} placeholder="games" />
        </div>
        <div style={fieldStyle}>
          <label>Bonus Type</label>
          <input {...register('bonusType')} defaultValue="free_bet" readOnly />
        </div>
      </div>

      {/* Games */}
      <fieldset>
        <legend><strong>Games</strong></legend>
        <div style={fieldStyle}>
          <label>Game Names (comma-separated)</label>
          <textarea {...register('games')} rows={3} placeholder="Big Bass Splash, ..." />
        </div>
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
