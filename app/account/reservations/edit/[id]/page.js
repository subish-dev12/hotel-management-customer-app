import { updateReservation } from "@/app/_lib/action";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  // const [numGuests, setNumGuests] = useState("");
  // CHANGE
  // console.log("params", params);
  // console.log("reservation id k hola ta sir", reservationId);
  const reservationId = params.id;
  const { numGuests, observations, cabinId } = await getBooking(reservationId);

  const { maxCapacity } = await getCabin(cabinId);

  console.log("k hola maxcapacity chai", maxCapacity);

  // console.log("reservationdata nai data", reservationData);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateReservation}
      >
        <input type="hidden" value={reservationId} name="reservationId" />
        {/* we are using a hidden input field to send a currnet reservationId that needed to be edited to the server action*/}
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={numGuests}
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
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button>
        </div>
      </form>
    </div>
  );
}
