interface AccentBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AccentBtn({
  children,
  className,
  ...props
}: AccentBtnProps) {
  return (
    <button className={`${className} btn btn-accent btn-outline`} {...props}>
      {children}
    </button>
  );
}
