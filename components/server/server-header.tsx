"use client"


import { MemberRole } from "@prisma/client"

import { ChevronDown, LogOut, PlusCircle, Settings, Trash, User, UserPlus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ServerWithMembersWithProfiles } from "@/types/types";
import { useModal } from "@/hooks/use-model-store";


interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles
    role?: MemberRole
}

export function ServerHeader({server, role}: ServerHeaderProps) {
    const {onOpen} = useModal()

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
        <DropdownMenuTrigger
        className="focus: outline-none"
        asChild
        >
            <button
            className="w-full text-d font-semibold px-3 flex items-center h-12 border-neutral-200
            dark:border-neutral-800 border-b-2 Dhover:bg-zinc-700/10
            dark:hover:bg-zinc-700/50 transition"
            >
                {server.name}
                <ChevronDown className=" h-5 w-5 ml-auto"/>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent
        className="w-56 text-xs font-medium
        text-black dark:text-neutral-400 space-y-[2px]"
        >
            {isModerator && (
                <DropdownMenuItem
                // server from our interface
                onClick={()=> onOpen("invite", {server, query: {}})}
                className=" text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                >
                    Invite
                    <UserPlus className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem
                onClick={()=> onOpen("editServer", {server, query: {}})}
                className=" px-3 py-2 text-sm cursor-pointer"
                >
                    Settings
                    <Settings className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem
                onClick={()=> onOpen("members", {server, query: {}})}
                className=" px-3 py-2 text-sm cursor-pointer"
                >
                    Manage
                    <User className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuItem
                onClick={()=> onOpen("createChannel", {server, query: {}})}
                className=" px-3 py-2 text-sm cursor-pointer"
                >
                    Create Channel
                    <PlusCircle className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuSeparator />
            )}
             {isModerator && (
                <DropdownMenuItem
                onClick={()=> onOpen("deleteServer", {server, query:{}})}
                className=" text-red-500 px-3 py-2 text-sm cursor-pointer"
                >
                    Delete
                    <Trash className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
             {!isAdmin && (
                <DropdownMenuItem
                onClick={()=> onOpen("leaveServer", {server, query: {}})}
                className=" text-red-500 px-3 py-2 text-sm cursor-pointer"
                >
                    Leave
                    <LogOut className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
