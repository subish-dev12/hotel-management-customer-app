"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "./Button";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  //allows us to the programmatic navigation between routes in next js

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    // new URLSearchParams(searchParams) creates an editable copy of the current query string.
    params.set("capacity", filter);
    // You use .set() to add your filter data (e.g., category=books, price=low).
    //params.set internally builds the query string but dont actually add it the url yet,or it don't navigate to that, or it dont change it to the url

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    //scroll false allows us to stay on the page where they are without scolling all the way to the top .
  }
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        all{" "}
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash; 3guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash; 7guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash; 12guests
      </Button>
    </div>
  );
}

export default Filter;
