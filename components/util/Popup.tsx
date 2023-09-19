import { forwardRef } from "react";
import PopupHeader from "./PopupHeader";
import UserList from "./UserList";

interface PopupProps {
  title: string;
  userIds: string[] | undefined;
}

const Popup = forwardRef<HTMLDialogElement, PopupProps>(function Popup(
  { title, userIds },
  ref
) {
  // Opening the modal with the ref is handled by the parent

  function handleClose() {
    // Ref can be null, a function to assign the ref, or the ref object.
    if (!ref) return;
    if (typeof ref === "function") return;
    if (!ref.current) return;
    ref.current.close();
  }

  return (
    <dialog
      ref={ref}
      className="backdrop:bg-black/50 bg-transparent px-4 border-0 w-full h-full max-w-xl max-h-[clamp(400px,60dvh,1000px)] rounded-xl overflow-hidden"
      onClick={(e) => {
        // only close if user is clicking on the exposed dialog element (background)
        if (e.target === e.currentTarget) {
          e.currentTarget.close();
        }
      }}
    >
      <section className="h-full px-4 sm:px-6 py-2 sm:py-4 bg-primary rounded-lg sm:rounded-xl flex flex-col">
        <PopupHeader title={title} handleClose={handleClose} />
        <UserList userIds={userIds} />
      </section>
    </dialog>
  );
});

export default Popup;
