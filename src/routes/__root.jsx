import React from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HeaderBar from "../components/organisms/HeaderBar";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeaderBar />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
