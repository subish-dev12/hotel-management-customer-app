import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update Profile",
};

export default async function Page() {
  const session = await auth();
  console.log("very much session", session);

  const guest = await getGuest(session.user.email);
  console.log("kun guest ho ", guest);

  const nationality = guest.nationality;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* we have used this trick here because the selectCountry component here require to be rendered on the client(updateprofileform) so we
          passed the server component as a children to that client component since server component can't be directly rendered on the client.
          since we are in server component here,
      */}

      <UpdateProfileForm guest={guest}>
        {/* we are importing a server component inside a server component and pass the instance of already exsecuted server component to the updateprifleform client component 
        which is legit because the SC HAS already done all t he fetching , ran through its jsx and already converted to the react element which can be legally passed to the client component.   */}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
