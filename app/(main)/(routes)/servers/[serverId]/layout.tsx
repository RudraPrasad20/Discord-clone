
import { ServerSidebar } from "@/components/server/server-sidebar";
import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await CurrentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  return (
    <div className="'h-fult">
      <div className="hidden md:flex h-full w-60 z-20 fixed flex-col inset-y-0">
        <ServerSidebar serverId={params.serverId}/>
      </div>
      <main className="h-full md: pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
