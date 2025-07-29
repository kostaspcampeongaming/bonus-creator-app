import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const FormSection: React.FC<Props> = ({ children }) => (
  <div className="form-section">{children}</div>
);
