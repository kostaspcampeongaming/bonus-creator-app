import React from 'react';

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: '1rem',
    marginBottom: '2rem',
    background: '#f9f9f9',
  }}>
    <h3>{title}</h3>
    {children}
  </section>
);
