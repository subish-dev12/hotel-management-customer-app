// import Counter from "@/app/_components/counter";
import { Suspense } from "react";

import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
//please refer to the "caching in next js" sticky notes for more info about everyting related with ISR and caching.

export const metadata = {
  title: "Cabins",
};
//  export const revalidate applies to the entire route (/cabins). This means all data
//  fetching on the page (including in nested components) will follow this revalidation interval.

// export const revalidate = 1200;
//since we have used the searchparams on this page, it will be dynamically rendered so using revalidate in this case is meaningless.
// export const revalidate = 5;

// why we are exporting revaidate to 0 ?
// https://chat.deepseek.com/a/chat/s/599ccf4d-03e6-4a45-be81-05d303fe118c

//we grabbed the filtered cabins from the url through searchParams.
// In a Server Component (like a page.tsx file), Next.js provides searchParams as a prop.
//  It’s a plain JavaScript object where keys are the parameter names, and values are either strings,
//  arrays (for repeated keys), or undefined (if the key isn’t present).
export default function Page({ searchParams }) {
  console.log(searchParams);
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {/* everything regarding why key prop is needed in suspense compoentn : https://grok.com/chat/2752b3dc-7d5c-4c47-b4ea-ead107fe4dfb?referrer=website */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

// Key Takeaways
// Setting revalidate = 0 at the page level is fine even if data fetching occurs in nested components like CabinList.

// It ensures that all data fetching on the page opts out of caching and always fetches fresh data.

// This approach is simple and consistent, but it might not be ideal if:

// You have mixed caching needs on the same page.

// You’re concerned about performance due to frequent data fetching.

// If you’re confident that the entire page (including CabinList) should always fetch fresh data, then using export const revalidate = 0; is a great choice!
