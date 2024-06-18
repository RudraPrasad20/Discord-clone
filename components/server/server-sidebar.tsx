import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { channelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [channelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [channelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [channelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.USER]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await CurrentProfile();

  if (!profile) {
    return redirect("/");
  }
  if (!serverId) {
    console.error("Server ID is missing");
    return null; // or handle the error accordingly
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  const textChannels = server?.channels.filter(
    (channel) => channel.type === channelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === channelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === channelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }
  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader role={role} server={server} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className=" dark:bg-zinc-700 my-2 bg-zinc-200 rounded-md" />
        {!!textChannels?.length && (
          <div className=" mb-2">
            <ServerSection
              sectionType="channels"
              channelType={channelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
            {textChannels.map((channel)=>(
            <ServerChannel 
              key={server.id}
              channel={channel}
              server={server}
              role={role}
            />
            ))}
          </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className=" mb-2">
            <ServerSection
              sectionType="channels"
              channelType={channelType.AUDIO}
              role={role}
              label="Audio Channels"
            />
            <div className="space-y-[2px]">
            {audioChannels.map((channel)=>(
            <ServerChannel 
              key={server.id}
              channel={channel}
              server={server}
              role={role}
            />
            ))}
          </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className=" mb-2">
            <ServerSection
              sectionType="channels"
              channelType={channelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
            {videoChannels.map((channel)=>(
            <ServerChannel 
              key={server.id}
              channel={channel}
              server={server}
              role={role}
            />
            ))}
          </div>
          </div>
        )}
         {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Memebers"
              server={server}
            />
            {members.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
