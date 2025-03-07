//from this route we can export one or more functions that corresponds to one of the http request verbs
// like get,post,put,patch,delete

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

//this is a route handler for performing get request to an api endpoint
//to check what respo
//we no longer need to create our own api end points for mutating data but
//we are doing it for the learning purposes since we do the same thing with the
//server actions.
//the name of this function should be the http request verbs like GET,PUT,OPTION ETCS
export async function GET(request, { params }) {
  const { cabinid } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinid),
      getBookedDatesByCabinId(cabinid),
    ]);
    // console.log("cabin", cabin);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin Could not be found" });
  }
}

//here response is a web standard implemented on the browser which has nth to do with next js
