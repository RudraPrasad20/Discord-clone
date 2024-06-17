"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
  interface TooltipActionProps {
    label: string
    children?: React.ReactNode
    align?: "start" | "end" | "center"
    side?: "top" | "bottom" | "right" | "left"
    
  }

  export const TooltipAction = ({
    children,
    label,
    align,
    side
  }: TooltipActionProps) => {
    return (
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
            <p className="font-semibold text-sm capitalize">
                {label.toLowerCase()}
            </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) 
  }