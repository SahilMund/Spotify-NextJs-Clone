import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupebaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";
import { AddToPlaylistContextProvider } from "@/hooks/useAddToPlaylist";

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
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();
  const playlist = await getPlaylistByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <SupabaseProvider>
          <UserProvider>
            <AddToPlaylistContextProvider>
              {/* eslint-disable-next-line */}
              <ModalProvider products={products} playlist={playlist} />

              <Sidebar songs={userSongs}>{children}</Sidebar>
              <Player />
            </AddToPlaylistContextProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
