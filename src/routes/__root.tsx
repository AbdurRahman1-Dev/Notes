import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <ul>
          <li>
            {" "}
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/dashboard" className="[&.active]:font-bold">
              dashboard
            </Link>{" "}
          </li>
        </ul>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});
