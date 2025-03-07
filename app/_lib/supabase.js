import { createClient } from "@supabase/supabase-js";
//we imstalled the npm i @supabase/supabase-js package to get access to the createclient

//using the environment varialbes to store the supbase url and the key.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
