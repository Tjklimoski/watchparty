import React, { useRef } from "react";
import Popup from "./Popup";
import { API } from "@/lib/APIFetcher";
import { useRouter } from "next/navigation";

interface DeleteAccountBtnProps {
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  setError: (value: React.SetStateAction<string | undefined>) => void;
}

export default function DeleteAccountBtn({
  loading,
  setLoading,
  setError,
}: DeleteAccountBtnProps) {
  const deletePopupRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  function openPopup() {
    if (!deletePopupRef.current) return;
    deletePopupRef.current.showModal();
  }

  function closePopup() {
    deletePopupRef.current!.close();
  }

  async function deleteUser() {
    try {
      setLoading(true);
      setError(undefined);
      await API.delete("/user").catch(err => {
        throw new Error(err.response.data);
      });
      router.push("/auth");
    } catch (err: Error | any) {
      setError(err?.message ?? "Error deleting user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-neutral w-full max-w-md block mx-auto mt-4"
        disabled={loading}
        onClick={openPopup}
      >
        Delete Account
      </button>

      {/* Popup must sit outside of a form element, or it will trigger handle submit on close */}
      <Popup title="Are you sure?" ref={deletePopupRef}>
        <p className="sm:text-lg">This action cannot be undone</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            className="btn btn-error grow"
            onClick={deleteUser}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner text-error" />
            ) : (
              "Delete"
            )}
          </button>
          <button
            className="btn btn-neutral grow"
            onClick={closePopup}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </Popup>
    </>
  );
}
