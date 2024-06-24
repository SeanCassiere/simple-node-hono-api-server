import { Hono } from "hono";

import type { ServerContext } from "@/types/hono";

import v1DocsRouter from "./v1";

const app = new Hono<ServerContext>();

app.route("/v1", v1DocsRouter);

app.get("/", (c) => {
	return c.redirect("/docs/v1");
});

export default app;
