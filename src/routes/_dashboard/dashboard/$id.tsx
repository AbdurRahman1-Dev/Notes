import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/$id")({
  component: () => <ViewNote></ViewNote>,
});

export default function ViewNote() {
  const { id } = useParams();
  console.log(id);

  return (
    <main>
      <h1>ViewNote: {id}</h1>
    </main>
  );
}
