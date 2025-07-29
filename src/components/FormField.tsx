type Props = { label: string; children: React.ReactNode };
export const FormField = ({ label, children }: Props) => (
  <div className="form-field">
    <label>{label}</label>
    {children}
  </div>
);
