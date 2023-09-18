import { IoClose } from "react-icons/io5";

interface PopupHeaderProps {
  title: string;
  handleClose: () => void;
}

export default function PopupHeader({ title, handleClose }: PopupHeaderProps) {
  return (
    <header className="flex flex-col-reverse xs:flex-row items-start mb-2 sm:mb-4">
      <h3 className="uppercase text-2xl sm:text-3xl font-semibold">{title}</h3>
      <div className="grow flex justify-end items-start self-stretch">
        <button onClick={handleClose}>
          <IoClose size={30} />
        </button>
      </div>
    </header>
  );
}
