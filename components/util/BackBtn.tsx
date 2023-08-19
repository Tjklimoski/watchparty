import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function BackBtn() {
  const router = useRouter();

  return (
    <button
      className="btn btn-neutral hover:btn-active focus:btn-active btn-outline border-2 rounded-full aspect-square grid place-items-center tooltip normal-case transition duration-300"
      data-tip="Back"
      aria-label="Back"
      onClick={() => router.back()}
    >
      <FaChevronLeft size={25} />
    </button>
  );
}
