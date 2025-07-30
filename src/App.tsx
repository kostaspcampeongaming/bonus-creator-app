import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DepositCasinoForm from './forms/DepositCasinoForm';
import DepositLiveCasinoForm from './forms/DepositLiveCasinoForm';
import DepositOpenForm from './forms/DepositOpenForm';
import ExternalCreditForm from './forms/ExternalCreditForm';
import ManualForm from './forms/ManualForm';
import { buildBonusJson } from './utils/buildJson';

const formTabs = [
  { label: 'Deposit Casino', key: 'deposit_casino', type: 'deposit' },
  { label: 'Deposit Live Casino', key: 'deposit_live_casino', type: 'deposit' },
  { label: 'Deposit Open (FS Package)', key: 'deposit_open', type: 'open' },
  { label: 'External (Bonus Credit)', key: 'external_credit', type: 'external' },
  { label: 'Manual', key: 'manual', type: 'manual' }
] as const;

type FormKey = typeof formTabs[number]['key'];

function App() {
  const [activeForm, setActiveForm] = useState<FormKey>('deposit_casino');

  const methods = useForm();
  const { handleSubmit } = methods;

  const activeTab = formTabs.find(tab => tab.key === activeForm)!;

  const onSubmit = (data: any) => {
  const formType =
    activeForm === 'deposit_casino' ? 'casino'
    : activeForm === 'deposit_live_casino' ? 'liveCasino'
    : undefined;

  const finalJson = buildBonusJson({
    ...data,
    type: activeTab.type,
    formType, // ✅ pass this along
  });

  console.log('Generated JSON:', finalJson);
  downloadJson(finalJson);
};


  const renderActiveForm = () => {
    const props = { bonusType: activeTab.type };
    switch (activeForm) {
      case 'deposit_casino':
        return <DepositCasinoForm {...props} />;
      case 'deposit_live_casino':
        return <DepositLiveCasinoForm {...props} />;
      case 'deposit_open':
        return <DepositOpenForm />;
      case 'external_credit':
        return <ExternalCreditForm />;
      case 'manual':
        return <ManualForm />;
      default:
        return null;
    }
  };

  return (
<div style={{
  fontFamily: 'var(--font-family)',
  padding: '2rem',
  maxWidth: 1200,
  margin: '0 auto',
  backgroundColor: 'var(--bg-color)',
  color: 'var(--text-color)'
}}>
  <img
  src="/logo.png"
  alt="Campeón Gaming"
  style={{
    display: 'block',
    margin: '0 auto 1rem',
    maxHeight: 50,
  }}
/>


  <h1 style={{ color: 'var(--accent-color)', textAlign: 'center' }}>🎁 Bonus Creator</h1>


      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {formTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveForm(tab.key)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 6,
              border: activeForm === tab.key ? '2px solid #007bff' : '1px solid #ccc',
              background: activeForm === tab.key ? '#e7f1ff' : '#f0f0f0',
              cursor: 'pointer',
              fontWeight: activeForm === tab.key ? 'bold' : 'normal',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Rendering */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderActiveForm()}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              type="submit"
              style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 5 }}
            >
              Export ➡️
            </button>
          </div>
          
        </form>
      </FormProvider>
    </div>
  );
}

function downloadJson(json: object, filename: string = 'bonus.json') {
  const jsonStr = JSON.stringify(json, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default App;
