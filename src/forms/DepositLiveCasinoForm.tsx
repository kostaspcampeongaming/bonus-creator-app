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

const DepositLiveCasinoForm = ({ bonusType }: { bonusType: string }) => {
  const { register } = useFormContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* General Info */}
      <div style={sectionStyle}>
        <FormField label="Bonus Name (ID)">
          <input {...register('name')} required />
        </FormField>
        <FormField label="From (dd-mm-yyyy hh:mm)">
          <input {...register('from')} />
        </FormField>
        <FormField label="To (dd-mm-yyyy hh:mm)">
          <input {...register('to')} />
        </FormField>
      </div>

      {/* Trigger Info */}
      <div style={sectionStyle}>
        <FormField label="Trigger Name (EN)">
          <input {...register('triggerName')} required />
        </FormField>
        <FormField label="Trigger Description (EN)">
          <input {...register('triggerDescription')} required />
        </FormField>
        <FormField label="Iterations">
          <input type="number" {...register('iterations', { valueAsNumber: true })} required />
        </FormField>
        <FormField label="Segments (comma-separated)">
          <input {...register('segments')} required />
        </FormField>
      </div>

      {/* Minimum Amounts */}
      <fieldset>
        <legend><strong>Minimum Deposit Amounts</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
            <FormField key={`min-${cur}`} label={cur}>
              <input
                type="number"
                step="any"
                {...register(`minimumAmount.${cur}`, { valueAsNumber: true })}
              />
            </FormField>
          ))}
        </div>
      </fieldset>

      {/* Maximum Amounts */}
      <fieldset>
        <legend><strong>Maximum Bonus Amounts</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
            <FormField key={`max-${cur}`} label={cur}>
              <input
                type="number"
                step="any"
                {...register(`maximumAmount.${cur}`, { valueAsNumber: true })}
              />
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
        <FormField label="Expiry (e.g. 3d)">
          <input {...register('expiry')} required />
        </FormField>
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
        <FormField label="Bonus Category">
          <input {...register('category')} placeholder="games" required />
        </FormField>
      </div>

      {/* Maximum Withdraw */}
      <fieldset>
        <legend><strong>Maximum Withdraw Amounts</strong></legend>
        <div style={sectionStyle}>
          {currencies.map((cur) => (
            <FormField key={`withdraw-${cur}`} label={cur}>
              <input
                type="number"
                step="any"
                {...register(`maximumWithdraw.${cur}`, { valueAsNumber: true })}
              />
            </FormField>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default DepositLiveCasinoForm;
