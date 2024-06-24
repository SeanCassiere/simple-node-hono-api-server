import { serve } from "@hono/node-server";

import { getPackageInfo } from "@/utils/package";

const packageJson = getPackageInfo();

import server from "./server";

const PORT = 3000;
const HOST = process.env.NODE_ENV !== "production" ? "127.0.0.1" : "0.0.0.0";

serve(
	{
		fetch: server.fetch,
		port: PORT,
		hostname: HOST,
	},
	({ address, port }) => {
		console.log(
			`🚀 ${packageJson.name} (${process.env.NODE_ENV} - ${packageJson.version}) listening at http://${address}:${port}`
		);
	}
);
