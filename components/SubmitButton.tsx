import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-volt group mt-1 w-full py-4 text-base disabled:opacity-70"
    >
      {pending ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink-950/40 border-t-ink-950" />
      ) : (
        <>
          Send message
          <FaPaperPlane className="text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </>
      )}
    </button>
  );
}
