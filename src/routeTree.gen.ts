/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as ProfileImport } from "./routes/profile";
import { Route as DashboardImport } from "./routes/_dashboard";
import { Route as IndexImport } from "./routes/index";
import { Route as DashboardDashboardRouteImport } from "./routes/_dashboard/dashboard/route";
z;
// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  path: "/profile",
  getParentRoute: () => rootRoute,
} as any);

const DashboardRoute = DashboardImport.update({
  id: "/_dashboard",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const DashboardDashboardRouteRoute = DashboardDashboardRouteImport.update({
  path: "/dashboard",
  getParentRoute: () => DashboardRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_dashboard": {
      preLoaderRoute: typeof DashboardImport;
      parentRoute: typeof rootRoute;
    };
    "/profile": {
      preLoaderRoute: typeof ProfileImport;
      parentRoute: typeof rootRoute;
    };
    "/_dashboard/dashboard": {
      preLoaderRoute: typeof DashboardDashboardRouteImport;
      parentRoute: typeof DashboardImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  DashboardRoute.addChildren([DashboardDashboardRouteRoute]),
  ProfileRoute,
]);

/* prettier-ignore-end */
