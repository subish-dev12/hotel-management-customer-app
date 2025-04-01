"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBooking, getBookings } from "./data-service";
import { redirect } from "next/navigation";

//data sent from the form gets passed to this function as formData(we can give any name to this argument)
//its a common convention not to use try catch block on the server action instead throwing errors directly.
export async function updateGuest(formData) {
  //authentication
  const session = await auth();
  if (!session) throw new Error("Please log in");

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

//one thing to remember is that on the createBooking server action the first argument will always going to be the
//the data that we attached using the bind function ie bookingData, so the formData should be the second argument.
export async function createBooking(bookingData, formdata) {
  // console.log("formdata k k k k hola ta sir", formdata, bookingData);

  //authentication
  const session = await auth();
  if (!session) throw new Error("Please login to your account");

  const newBooking = {
    ...bookingData,
    numGuests: formdata.get("numGuests"),
    observations: formdata.get("observations"),
    guestId: session.user.guestId,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakFast: false,
    isPaid: false,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);
  // So that the newly created object gets returned!

  if (error) {
    throw new Error("Booking could not be created");
  }
}

export default async function deleteBooking(bookingId) {
  //authentication
  const session = await auth();
  if (!session) throw new Error("Please login to your account");

  //hacker can delete any row of the bookings table so for extra protection let's check if the valid reservation of the user is getting deleted or not.
  //Prevents unauthorized deletion of other users' bookings
  //authorization
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
//server action don't have access to the URL (we can't use params prop) so sometimes we do need to send some data from the form through the hidden input field TRICK
export async function updateReservation(formData) {
  // console.log("formdata k raixa ta ", formData);
  const reservationId = Number(formData.get("reservationId"));
  //1) authentication
  const session = await auth();
  if (!session) throw new Error("Please login before updating the form");

  // 2) authorization
  const bookingGuest = await getBookings(session.user.guestId);
  const bookingIds = bookingGuest.map((booking) => booking.id);
  if (!bookingIds.includes(reservationId))
    throw new Error("You are not allowed to edit this form data");

  //console log garda ta reservationID string nikliyo so number ma convert.
  // 3)building the update data
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);
  //user could spam the observation text area field with thousands of words so we sliced only the first thousand characters.
  const updateData = { numGuests, observations };

  // 4) mutations
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId)
    .select()
    .single();
  //error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  //revalidating
  //revalidations must be done for two paths since the max guest number should be displayed at "/reservations" path
  // max guest and information on the /edit/id url
  //DISCLAIMER:REVALIDATION SHOULD ALWAYS BE DONE FIRST BEFORE REDIRECTING.
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations");

  //redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
