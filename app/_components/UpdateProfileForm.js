"use client";
import { useState } from "react";
import { updateGuest } from "../_lib/action";
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
        <SubmitButton />
        {/* as you can see the useFormStatus hook is not directly called inside this comopnent rather it is called inside the component that is 
        present in the form or in other words THAT HOOK CAN ONLY USED INSIDE THE DIRECT CHILD OF THE FORM  */}
      </div>
    </form>
  );
}
import SubmitButton from "./SubmitButton";
export default UpdateProfileForm;
