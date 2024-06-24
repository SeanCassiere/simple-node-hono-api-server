import { apiReference } from "@scalar/hono-api-reference";
import { Hono } from "hono";

import type { ServerContext } from "@/types/hono";

const app = new Hono<ServerContext>();

app.get(
	"/",
	apiReference({
		theme: "purple",
		spec: {
			url: "/openapi.v1.yaml",
		},
	})
);

export default app;
