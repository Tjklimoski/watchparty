import Image from "next/image";

export default function ProfileIcon() {
  return (
    <div className="avatar">
      <div className="rounded-full group-focus:ring group-hover:ring ring-primary ring-offset-base-100 ring-offset-2 hover:cursor-pointer transition">
        <Image
          width={40}
          height={40}
          src="/img/profile/avatar.jpg"
          alt="profile image"
        />
      </div>
    </div>
  );
}
