interface PrimaryBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryBtn({ children, ...props }: PrimaryBtnProps) {
  return (
    <button type="button" className="btn btn-primary" {...props}>
      {children}
    </button>
  );
}
