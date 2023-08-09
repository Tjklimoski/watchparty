interface PrimaryBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryBtn({
  children,
  className,
  ...props
}: PrimaryBtnProps) {
  return (
    <button className={`${className} btn btn-primary`} {...props}>
      {children}
    </button>
  );
}
