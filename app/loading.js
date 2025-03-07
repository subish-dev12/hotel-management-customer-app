import Spinner from "./_components/Spinner";
//this spinner will override the global loading.js indicator.

function loading() {
  return <Spinner />;
}

export default loading;
