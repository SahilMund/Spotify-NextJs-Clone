import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupebaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from '@/components/Player'


const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to Music",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
      <ToasterProvider />

        <SupabaseProvider>
          <UserProvider>

            <ModalProvider products={[]}/>

            <Sidebar songs={userSongs}>{children}</Sidebar>
         <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
