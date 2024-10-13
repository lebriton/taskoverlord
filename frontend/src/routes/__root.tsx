import Layout from "@/components/layout/layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>

      <ReactQueryDevtools />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
