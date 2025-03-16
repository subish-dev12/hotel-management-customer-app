import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
//auth() reads the session from cookies, which are only available at request time (when the server processes an incoming request).
//so any component that calls auth automatically makes the route DYNAMIC.
//this would eventually make all the routes of this app dynamic since this component is used in all the routes.
export default async function Navigation() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors flex items-center gap-4"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={session?.user?.image}
                className="h-8 rounded-full "
                alt={session?.user?.name}
                referrerPolicy="no-referrer"
                //referrrerpolicy should be set to no-referrrer for correctly displaying the image from google
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
