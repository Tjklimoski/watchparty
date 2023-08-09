interface AccentBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AccentBtn({ children, ...props }: AccentBtnProps) {
  return (
    <button className="btn btn-accent btn-outline" {...props}>
      {children}
    </button>
  );
}
