
// // Import necessary Recoil functions
// import { atom, useRecoilState } from 'recoil'; 
// export type ModalType = "createServer";

// // Define an atom for the modal state
// export const modalState = atom<ModalType | null>({
//   key: 'modalState', // Unique ID (with respect to other atoms/selectors)
//   default: null, // Initial value
// });

// // Create a custom hook to manage the modal state
// export function useModal() {
//   const [modalType, setModalType] = useRecoilState(modalState);

//   const openModal = (type: ModalType) => {
//     setModalType(type);
//   };

// //   const closeModal = () => {
// //     setModalType(null);
// //   };

// const closeModal = (type?: ModalType) => {
//     if (type) {
//       setModalType(type);
//     } else {
//       setModalType(null);
//     }
//   };

//   return {
//     modalType,
//     isOpen: modalType !== null,
//     onOpen: openModal,
//     onClose: closeModal,
//   };
// }


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
| "deleteMessage";


interface ModelData {
  server?: Server,
  channel?: Channel,
  channelType?: channelType
}
interface ModalStore {
  type: ModalType | null;
  data: ModelData
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModelData) => void;
  onClose: () => void;
}

const modalState = atom<ModalStore>({
  key: 'modalState',
  default: {
    type: null,
    data: {},
    isOpen: false,
    onOpen: () => {},
    onClose: () => {}
  }
});

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const onOpen = (type: ModalType, data={}) => {
    setModal({ ...modal, isOpen: true, type, data });
  };

  const onClose = () => {
    setModal({ ...modal, type: null, isOpen: false });
  };

  return { ...modal, onOpen, onClose };
};
