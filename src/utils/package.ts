import { readFileSync } from "node:fs";
import { join } from "node:path";

export function getPackageInfo() {
	const pathname = join(process.cwd(), "package.json");
	const packageJson = JSON.parse(readFileSync(pathname, "utf8"));

	return packageJson as { name: string; version: string };
}
