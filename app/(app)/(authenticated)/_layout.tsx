import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Slot } from "expo-router";
import React from "react";

const Layout = () => {
  const {authState} = useAuth();
 
  if (!authState?.authenticated) {
    return <Redirect href="./login" />;
  }

  return <Slot />;
};

export default  Layout;
