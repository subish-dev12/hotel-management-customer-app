"use server";

import { auth, signIn, signOut } from "./auth";

//data sent from the form gets passed to this function as formData(we can give any name to this argument)
//its a common convention not to use try catch block on the server action instead throwing errors directly.

export async function updateGuest(formData) {
  console.log(formData);

  const session = await auth();

  if (!session) throw new Error("Please log in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationalID, nationality, countryFlag };

  console.log(updateData);
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
