import Layout from "@/components/layout/layout";
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

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
