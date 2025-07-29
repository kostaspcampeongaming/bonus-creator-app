import React from 'react';

export const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ flex: '1 1 300px', marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
    {children}
  </div>
);
