import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { FormSection } from '../components/FormSection';
const formData = {
  // other fields
  formType: 'liveCasino',
};

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

const DepositLiveCasinoForm = ({ bonusType }: { bonusType: string }) => {
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
          <label>From (dd-mm-yyyy hh:mm)</label>
          <input {...register('from')} />
        </div>
        <div style={fieldStyle}>
          <label>To (dd-mm-yyyy hh:mm)</label>
          <input {...register('to')} />
        </div>
      </div>

      {/* Trigger Info */}
      <div style={sectionStyle}>
        <div style={fieldStyle}>
          <label>Trigger Name (EN)</label>
          <input {...register('triggerName')} required />
        </div>
        <div style={fieldStyle}>
          <label>Trigger Description (EN)</label>
          <input {...register('triggerDescription')} required />
        </div>
        <div style={fieldStyle}>
          <label>Iterations</label>
          <input type="number" {...register('iterations')} required />
        </div>
        <div style={fieldStyle}>
          <label>Segments (comma-separated)</label>
          <input {...register('segments')} required />
        </div>
      </div>

      {/* Minimum Amounts */}
      <fieldset>
        <legend><strong>Minimum Deposit Amounts</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
            <div style={fieldStyle} key={cur}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`minimumAmount.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Maximum Amounts */}
      <fieldset>
        <legend><strong>Maximum Bonus Amounts</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
            <div style={fieldStyle} key={cur}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`maximumAmount.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Core Config */}
      <div style={sectionStyle}>
        <div style={fieldStyle}>
          <label>Bonus Percentage</label>
          <input type="number" {...register('percentage')} required />
        </div>
        <div style={fieldStyle}>
          <label>Wagering Multiplier</label>
          <input type="number" {...register('wageringMultiplier')} required />
        </div>
        <div style={fieldStyle}>
          <label>Expiry (e.g. 3d)</label>
          <input {...register('expiry')} required />
        </div>
      </div>

      {/* Boolean Toggles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <label>
          <input type="checkbox" {...register('includeAmountOnTargetWagerCalculation')} />
          &nbsp; Include Amount on Wager Target
        </label>
        <label>
          <input type="checkbox" {...register('capCalculationAmountToMaximumBonus')} />
          &nbsp; Cap to Max Bonus
        </label>
        <label>
          <input type="checkbox" {...register('compensateOverspending')} />
          &nbsp; Compensate Overspending
        </label>
        <label>
          <input type="checkbox" {...register('withdrawActive')} />
          &nbsp; Withdraw Active
        </label>
      </div>

      {/* Misc */}
      <div style={sectionStyle}>
        <div style={fieldStyle}>
          <label>Bonus Category</label>
          <input {...register('category')} placeholder="games" required />
        </div>
      </div>

      {/* Maximum Withdraw */}
      <fieldset>
        <legend><strong>Maximum Withdraw Amounts</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
            <div style={fieldStyle} key={cur}>
              <label>{cur}</label>
              <input type="number" step="any" {...register(`maximumWithdraw.${cur}`)} />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default DepositLiveCasinoForm;
