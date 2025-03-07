import "@/app/_styles/globals.css";
//step1: for applyin font
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

//step2:
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

//this console log would give me the className that gets applied to the div.
console.log(josefin.className);

//meta data variable
// Exporting metadata means you are providing information (like the title and description) that Next.js will inject into the <head>
//  section of the page.
//you can see now in the page source the title is being shown

export const metadata = {
  //  title: "The Wild Oasis",
  title: {
    template: "%s: The Wild Oasis",
    default: "Welcome To The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian DOlomites, surrounded by beautful mountsins and dark forest",
};

//since we are in global layout this metadata will be applied to all the pages
//we can overwrite it by wrriting metadata for other pages.
//also its necessary to export that metadata.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        //step3: apply class name
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
        suppressHydrationWarning
      >
        <Header />
        <div className="flex-1  px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

{
  /* here children is whatever the page that we are visiting
            so wrapping the context provider to this children will provide the context to all the pages throughout the app  
            and here reservation provider is the client comp. while the children(page.js) is the server one, then how come client can render server ?
            but this current layout.js is the server component so the children too gets executed in the server and the react element produced from it 
            is only sent to the client or the provider components as a childre prop
            now after this all the CLIENT only components will be able to consume the contexts throught the Custom hook that we exported from the
            context provider component. */
}

//The RootLayout is the topmost layout in the app directory (e.g., app/layout.js).
// Next.js automatically passes the content of your pages (or nested layouts) as the children prop to this layout.

//its common convention to call this component
//rootlayout
//if we don't use the children prop here, this comoponent
//would only return the navigation only without
//the content  because navigation is the only thing
//that it would return.

//  The children prop represents the content of the
//  page that is being rendered.
// so if we are currently in the account page then
//children prop task is to display the content of the
//account page.

// If you dont use  the children prop, the layout will not render the content of the pages that use this layout.
// The Navigation component will still be rendered,
//  but the main content of the page (which should be passed as children) will be missing.

//we can export some page meta data from this layout.
//like page title

// we can influence some of the stuffs that goes into the
//head tag

//next js is really all about conventions
//convention for exporting some variable from the page/layout
//convention for defining routes by creating folders.
//convention for naming files like page.js or layout.js

//steps for adding font mainy 3 steps:
//1. importing the font from the google like this "next/font/google" if from google
//or if you're importing it from your local pc then "next/font/[local-directory]"
//2. configure that font with the appropriate subsets : for english usually subsets is set to "latin"
//3. figure out the classname and apply that classname to wherever you wanna apply that font.
