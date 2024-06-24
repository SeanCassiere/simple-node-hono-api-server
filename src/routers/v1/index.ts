import { Hono } from "hono";

import type { ServerContext } from "@/types/hono";

import v1UsersRouter from "./users";

const app = new Hono<ServerContext>();

app.route("/users", v1UsersRouter);

app.get("/", (c) => {
	return c.redirect("/docs/v1");
});

export default app;
