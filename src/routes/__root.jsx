import React from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HeaderBar from "../components/organisms/HeaderBar";
import BottomBar from "../components/organisms/BottomBar";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <HeaderBar />
        <div className="flex-1">
          <Outlet />
        </div>
        <BottomBar />
      </div>
      <TanStackRouterDevtools position="top-left" />
      <ReactQueryDevtools buttonPosition="top-left" />
    </>
  );
}
