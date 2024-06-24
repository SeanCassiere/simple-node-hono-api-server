import type { HttpBindings } from "@hono/node-server";

type Bindings = HttpBindings & {};

type Variables = {};

export type ServerContext = {
	Bindings: Bindings;
	Variables: Variables;
};
