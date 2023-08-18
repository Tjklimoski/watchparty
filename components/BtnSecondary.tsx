interface BtnSecondaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BtnSecondary({
  children,
  className,
  ...props
}: BtnSecondaryProps) {
  return (
    <button className={`btn btn-secondary ${className}`} {...props}>
      {children}
    </button>
  );
}
