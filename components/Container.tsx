interface ContainerProps {
  tag: keyof JSX.IntrinsicElements;
  styles?: string;
  children: React.ReactNode;
}

export default function Container({
  tag: Tag = "main",
  styles = "",
  children,
}: ContainerProps) {
  return (
    <Tag className={`px-6 py-2 md:px-12 md:py-4 ${styles}`}>
      <div className="max-w-[1440px] mx-auto">{children}</div>
    </Tag>
  );
}
