import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
