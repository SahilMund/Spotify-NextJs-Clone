import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContext";
import getSongs from "@/actions/getSongs";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";

// This page will not be cached, and the data will be always up-to-date
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const playlist = await getPlaylistByUserId();

 

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="">
        <div className="mb-2">
          <h1
            className="
          text-white
          text-3xl
          font-semibold    
        "
          >
            Welcome Back !!
          </h1>

          <div
            className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
        "
          >
            <ListItem
              name="Liked Songs"
              href="liked"
              image="/images/liked.png"
              data=""
            />

            {playlist.map((item: any) => (
              <ListItem
                key={item.id}
                name={item.Name}
                href={`playlist/${item.Name}`}
                image="N/A"
                data = {item}
              />
            ))}
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
