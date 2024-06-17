"use client";

import { useEffect, useState } from "react";
import { CreateServerModel } from "./create-server-model";
import { InviteModel } from "./invite-server";
import { EditServerModel } from "./edit-server-modal";
import { MembersModel } from "./members-model";
import { CreateChannelModel } from "./create-channel-model";
import LeaveServerModel from "./leave-server-model";
import DeleteServerModal from "./delete-server-model";
import DeleteChannelModal from "./delete-channel-model";
import EditChannelModal from "./edit-channel-model";



export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <CreateServerModel />
      <InviteModel/>
      <EditServerModel/>
  <MembersModel/>
  <CreateChannelModel/>
  <LeaveServerModel/>
  <DeleteServerModal/>
  <DeleteChannelModal/>
  <EditChannelModal/>
    </div>
  );
};
