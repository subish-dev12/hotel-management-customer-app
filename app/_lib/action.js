"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

//data sent from the form gets passed to this function as formData(we can give any name to this argument)
//its a common convention not to use try catch block on the server action instead throwing errors directly.
export async function updateGuest(formData) {
  console.log(formData);
  const session = await auth();

  if (!session) throw new Error("Please log in");

  console.log("session id hai", session);

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationalID, nationality, countryFlag };

  //below is the code from the data-service updateGuest
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  //to immediately refresh the cache, without showing the stale data.
  revalidatePath("/account/profile");
  // https://grok.com/chat/7e6e7314-5c95-4b71-a6ea-4717f25eea10?referrer=website
  // return data;
  // console.log(updateData);
}

export default async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Please login to your account");

  //hacker can delete any row of the bookings table so for extra protection let's check if the valid reservation of the user is getting deleted or not.
  //Prevents unauthorized deletion of other users' bookings
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsID = guestBookings.map((booking) => booking.id);

  if (!guestBookingsID.includes(bookingId))
    throw new Error("You are not allowed to delete this row");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  //since we are not using the state to re-render UI we have to manually revalidate the cache to refetch so latest data gets displayed in UI
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
