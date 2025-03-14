"use client";
import { useState } from "react";
import { updateGuest } from "../_lib/action";
import { useFormStatus } from "react-dom";

// https://chat.deepseek.com/a/chat/s/64dcce27-2836-4739-9241-5828b689343b
function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState("");
  //its quite necessary to provide the "name" attribute for all the input fields so we can specify the name of the insert data in the fields
  //so that when we submit the input data to the server action function
  //we'll get the object like {name:..... , value:......}
  //so name will be the name we provide in the input field and value would be the entered data.
  //IT IS NECESSARY TO MATCH THE INPUT NAME WITH THE TABLE FIELDS IN DB.
  //
  // CHANGE
  // const countryFlag = "pt.jpg";
  // const nationality = "portugal";
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateGuest}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={guest.fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          disabled
          defaultValue={guest.email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={guest.countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest.nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
        {/* as you can see the useFormStatus hook is not directly called inside this comopnent rather it is called inside the component that is 
        present in the form or in other words THAT HOOK CAN ONLY USED INSIDE THE DIRECT CHILD OF THE FORM  */}
      </div>
    </form>
  );
}
export default UpdateProfileForm;

function Button() {
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
