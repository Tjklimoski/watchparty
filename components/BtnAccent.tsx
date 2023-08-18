interface BtnAccentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BtnAccent({
  children,
  className,
  ...props
}: BtnAccentProps) {
  return (
    <button className={`btn btn-accent ${className}`} {...props}>
      {children}
    </button>
  );
}
