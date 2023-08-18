interface AccentBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AccentBtn({
  children,
  className,
  ...props
}: AccentBtnProps) {
  return (
    <button className={`btn btn-accent btn-outline ${className}`} {...props}>
      {children}
    </button>
  );
}
