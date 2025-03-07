import Spinner from "@/app/_components/Spinner";
//this spinner will override the global loading.js indicator.

function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading Cabin data...</p>
    </div>
  );
}

export default loading;
