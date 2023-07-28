import Image from "next/image";

export default function NavbarLogo() {
  return (
    <div className="flex items-center gap-2 group/logo hover:cursor-pointer">
      <Image
        src="watchparty-logo.svg"
        alt="WatchParty Icon"
        height={40}
        width={40}
        priority
        className="object-contain bg-gradient-to-tr from-primary to-accent p-1 rounded-full transition rotate-0 scale-100 duration-500 group-hover/logo:rotate-12 group-hover/logo:scale-110"
      />
      <h1 className="text-4xl">
        Watch
        <span className="text-primary">Party</span>
      </h1>
    </div>
  );
}
