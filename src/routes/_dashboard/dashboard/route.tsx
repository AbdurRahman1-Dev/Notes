import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard")({
  component: User,
});

export default function User() {
  return <div>User route is here</div>;
}
