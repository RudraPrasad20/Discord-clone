"use client";

import { Plus } from "lucide-react";
import { TooltipAction } from "../tooltip-action";
import { useModal } from "@/hooks/use-model-store";


export const NavigationAction = ()=>{
    const {onOpen} = useModal();
    return(
        <div className="group flex items-center">
            <TooltipAction
             side="right"
             align="center"
             label="Add a server"
             >
                <button onClick={()=>onOpen("createServer")}
                 className="flex mx-3 h-[48px] w-[49px] rounded-[24px] group-hover:rounded-[16px] transition-all
                overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 "
                >
                    <Plus className="group-hover:text-white transition text-emerald-500"
                    size={25} 
                    />

                </button>
            </TooltipAction>
        </div>
    )
}