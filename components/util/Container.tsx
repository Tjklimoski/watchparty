interface PageContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: PageContainerProps) {
  return (
    <div className="px-2 py-2 xs:px-4 sm:px-6 md:px-12 md:py-4 w-full h-full max-w-[1440px] mx-auto">
      {children}
    </div>
  );
}
