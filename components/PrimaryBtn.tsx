interface PrimaryBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryBtn({ children, ...props }: PrimaryBtnProps) {
  return (
    <button className="btn btn-primary" {...props}>
      {children}
    </button>
  );
}
