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

const ManualForm = () => {
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
          <label>Expiry (e.g. 2d)</label>
          <input {...register('expiry')} required />
        </div>
      </div>

      {/* Cost per currency */}
      <fieldset>
        <legend><strong>Cost Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
            <div style={fieldStyle} key={`cost-${cur}`}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`cost.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Multiplier per currency */}
      <fieldset>
        <legend><strong>Multiplier Per Currency</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
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
          {currencies.map((cur) => (
            <div style={fieldStyle} key={`maximumBets-${cur}`}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`maximumBets.${cur}`)} />
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
          <textarea {...register('games')} rows={3} placeholder="The Dog House Megaways, Gates of Olympus" />
        </div>
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
          {currencies.map((cur) => (
            <div style={fieldStyle} key={`maximumWithdraw-${cur}`}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`maximumWithdraw.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ManualForm;
