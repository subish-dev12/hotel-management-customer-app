import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
//in this component we have two child components , both needed to be a client component. so we couldn't perform the data fetching there.
//so we needed to do data fetching at the parent server component and pass the data through prop.

async function Reservation({ cabin }) {
  const session = await auth();
  // console.log("session ko bare ma ho hai", session);
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          bookedDates={bookedDates}
          cabin={cabin}
          user={session?.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
export default Reservation;
