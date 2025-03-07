import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

//this generateMetadata function is a inbuild function provided by next.
//this function returns a metadata.
//this function is specially useful when we want to genereate the meta data for the dynamic route
//like this one.
export async function generateMetadata({ params }) {
  console.log(params);
  //params is an object that contains the dynamic segments of a route.
  //this  function is working on a asychronous task so it is a async function.

  const { name } = await getCabin(params.cabinid);
  return {
    title: `cabin ${name}`,
  };
}

//so this function allows us to tell the next js which cabinid exists for this page
// so it can prerender those pages ahead
export async function generateStaticParams() {
  const cabins = await getCabins();
  // console.log(cabins);

  const ids = cabins.map((cabin) => ({
    cabinid: String(cabin.id),
  }));
  return ids;
}

//simultaneous data fetching (blocking waterfall) would block one data fetching to the other.
// so one approach for efficient data fetching would be to use the promise.all method
// but if one of the promises takes longer time then no promise gets resolved until the late one finishes

//DISCLAIMER:--PLEASE READ THE DATA FETCHING STRATEGIES from the notes to know more.
export default async function Page({ params }) {
  //please read the note title Dynamic Route Segment for more details
  //cabinid here is the dynamic route segment as you can see which is the child route of cabins.

  const cabin = await getCabin(params.cabinid);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinid);

  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinid),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinid),
  // ]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
