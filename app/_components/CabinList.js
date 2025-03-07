import { unstable_noStore as noStore } from "next/cache";

import { getCabins } from "../_lib/data-service";

// eslint-disable-next-line import/no-unresolved
import CabinCard from "@/app/_components/CabinCard";
//revalidation of the fetch request in this component is not possible since we
//are using the supabase to extract data as you can see below getCabins(), and we
//are not using the native fetch api
//we need to pass the revalidate  right on the fetch function and that native
//fetch function is not being used here

//so we need to opt out of caching for this component by using the nostore
//and this would make whole route dynamic

// https://chat.deepseek.com/a/chat/s/23a363f6-a28c-45ca-9c36-b63bb28c66ab
async function CabinList({ filter }) {
  // noStore();

  const revalidate = 1200;

  const cabins = await getCabins();

  let displayedCabins;

  if (filter === "all") displayedCabins = cabins;

  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity > 7);

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;

// Disclaimer:When we are data fetching from a server components it is always a
// good idea to do the data fetching as close as possible to the place  where that data is actually
// needed.Don't fetch data at one component while that data is actually being used
//  in another component.
//as  you can see above the data fetching and using that fetched data is done is the same component
//which is a good practice
//due to this we can do more granular data fetching strategies
