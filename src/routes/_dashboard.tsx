import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: Dashboard,
});

export default function Dashboard() {
  return (
    <div>
      _layout1
      <div>
        <Outlet />
      </div>
    </div>
  );
}
