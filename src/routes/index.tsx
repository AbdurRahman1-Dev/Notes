import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      home page comming soon
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
    </div>
  ),
});
