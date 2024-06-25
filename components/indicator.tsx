"use client";

import React from "react";

import { Badge } from "./ui/badge";
import { useSocket } from "./socket-provider";

const Indicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="text-white border-none bg-yellow-600">
        Pinging
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Live
    </Badge>
  );
};

export default Indicator;