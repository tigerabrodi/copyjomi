import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import Roboto400 from "@fontsource/roboto/400.css";
import Roboto500 from "@fontsource/roboto/500.css";
import Roboto700 from "@fontsource/roboto/700.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: Roboto400 },
  { rel: "stylesheet", href: Roboto500 },
  { rel: "stylesheet", href: Roboto700 },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Copyjomi",
  description: "",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-navy-dark">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
