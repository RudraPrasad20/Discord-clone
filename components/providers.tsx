"use client"
import { RecoilRoot } from "recoil";
import { ModalProvider } from "./models/model-provider";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <ModalProvider/>
        {children}
    </RecoilRoot>
}