import Image from "next/image";
import { signInAction } from "../_lib/action";
//since this component needs to be server we can't directly attach event handler for performing signIn (with google)
//so we need to make use of server action to do the same.
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
export default SignInButton;
