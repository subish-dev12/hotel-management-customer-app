"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/action";

// we could have done the data fetching in this component but since there's some interactivity here so we have to
// perform the data fetching on the parent component .

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { from: startDate, to: endDate } = range;

  const numNights = differenceInDays(startDate, endDate);

  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    cabinPrice,
    numNights,
    startDate,
    endDate,
    cabinId: id,
  };

  //
  const createBookingWithData = createBooking.bind(null, bookingData);
  //one thing to remember is that on the createBooking server action the first argument will always going to be the
  //the data that we attached using the bind function ie bookingData, so the formData should be the second argument.

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as: {user.name}</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>

        {/* React can only render strings, numbers, elements, or arrays of those. When range.from and range.to are Date objects, you need to
         convert them to strings before rendering. */}
      </div>
      {/* <p>
        {String(range.from)} to {String(range.to)}
      </p> */}
      <form
        action={async (formdata) => {
          await createBookingWithData(formdata);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
