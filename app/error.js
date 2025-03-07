"use client";
//error.js error boudary should always be a client component
//this component automatically has access to error object and reset.
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
//error.js boundary will not caught errors that occurs in root layout.
//create a file global-error.js
// errors might occur in root layout when we try to fetch some datas from an api
//  and these kind of errors are not caught by the error boundary
// that's why we need to create that global-error.js file but we won't go in deatail how that file is created at least for the current project.
// that global-error file  will  replace the entire layout even the root layout will be gone
//global error should also define its html and body tag like root layout.
