import { Channel, channelType, Server } from "@prisma/client";
import { atom, useRecoilState } from "recoil";

export type ModalType =  
| "createServer"
| "invite"
| "editServer"
| "members"
| "createChannel"
| "leaveServer"
| "deleteServer"
| "deleteChannel"
| "editChannel"
| "messageFile"
| "deleteMessage"
| "messageFile";

interface ModelData {
  server?: Server;
  channel?: Channel;
  channelType?: channelType;
  apiUrl?: string;
  query: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModelData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModelData) => void;
  onClose: () => void;
}

// Default ModelData value including the required 'query' property
const defaultModelData: ModelData = {
  query: {}
};

const modalState = atom<ModalStore>({
  key: 'modalState',
  default: {
    type: null,
    data: defaultModelData, // Use the default ModelData value
    isOpen: false,
    onOpen: () => {},
    onClose: () => {}
  }
});

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const onOpen = (type: ModalType, data: ModelData = defaultModelData) => {
    setModal({ ...modal, isOpen: true, type, data });
  };

  const onClose = () => {
    setModal({ ...modal, type: null, isOpen: false });
  };

  return { ...modal, onOpen, onClose };
};
