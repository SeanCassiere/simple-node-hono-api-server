import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { etag } from "hono/etag";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";

import type { ServerContext } from "@/types/hono";

import docsRouter from "@/routers/docs";
import v1Router from "@/routers/v1";

const app = new Hono<ServerContext>();
app.use(cors({ origin: "*" }));
app.use(compress());
app.use(csrf());
app.use(etag());
app.use(logger());
app.use(secureHeaders());

app.use("/api/", timeout(5000));

app.route("/api/v1", v1Router);

app.route("/docs", docsRouter);

app.get(
	"/*",
	serveStatic({
		root: "./public",
	})
);

app.get("/health", (c) => {
	return c.json({ message: "OK", uptime: process.uptime() });
});
app.get("/", (c) => {
	return c.redirect("/docs");
});

app.onError(function handleError(err, c) {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	c.status(500);
	return c.json({ success: false, message: "Unknown Internal Server Error" });
});

export default app;
