"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Update profile
    </button>
  );
}

//useFormStatus hook can only be called inside the form context that means the hook can only be used in a component that is called inside the form.
//but the hook can't be called from the component that contains the  hook
//https://grok.com/chat/7e6e7314-5c95-4b71-a6ea-4717f25eea10?referrer=website
