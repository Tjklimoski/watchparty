interface BtnNeutralProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BtnNeutral({
  children,
  className,
  ...props
}: BtnNeutralProps) {
  return (
    <button className={`btn btn-neutral ${className}`} {...props}>
      {children}
    </button>
  );
}
