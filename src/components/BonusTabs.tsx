import React from 'react';

type Tab = {
  label: string;
  key: string;
};

interface BonusTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const BonusTabs: React.FC<BonusTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 6,
            border: activeTab === tab.key ? '2px solid #007bff' : '1px solid #ccc',
            background: activeTab === tab.key ? '#e7f1ff' : '#f0f0f0',
            cursor: 'pointer',
            fontWeight: activeTab === tab.key ? 'bold' : 'normal',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default BonusTabs;
