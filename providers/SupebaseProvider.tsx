"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  /*
supabaseClient represents the state value, which is the Supabase client instance created by the createClientComponentClient function. The supabaseClient variable can be used in the component to access and manipulate the Supabase client and perform database operations.
If no update required, then we can use as const intsed of usestate
const supabaseClient = createClientComponentClient<Database>();

*/
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
