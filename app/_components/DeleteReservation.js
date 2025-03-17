"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import deleteReservation from "../_lib/action";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
//we converted this component to client so we can use the interactivity by adding onclick prop for invoking the server action
//since this component uses the standalone button without any form it's not ideal to use the Useformstatus hook since
// the pending property would return false without any form.
//so in this case it's ideal to use the usetransition hook.
// https://grok.com/chat/7e6e7314-5c95-4b71-a6ea-4717f25eea10?referrer=website
//read last part of above article to know more
function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  function handleDeletion() {
    startTransition(() => deleteReservation(bookingId));
  }
  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={handleDeletion}
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}
export default DeleteReservation;
