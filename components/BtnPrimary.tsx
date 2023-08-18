interface BtnPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BtnPrimary({
  children,
  className,
  ...props
}: BtnPrimaryProps) {
  return (
    <button className={`btn btn-primary ${className}`} {...props}>
      {children}
    </button>
  );
}
