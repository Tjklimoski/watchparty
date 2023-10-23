export default function UserPageHeading({ title }: { title: string }) {
  return (
    <header className="flex justify-center xs:justify-start sm:mt-2 mb-4 sm:mb-8">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold">{title}</h2>
    </header>
  );
}
