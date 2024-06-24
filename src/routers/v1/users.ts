import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { randomBytes } from "node:crypto";

import type { ServerContext } from "@/types/hono";

const app = new Hono<ServerContext>();

const users = [
	{
		id: "user_live_3c261d01550a4e28907b9edb02527cc6",
		name: "Alfref Rosberg",
		age: 32,
	},
	{
		id: "user_live_83aef08140a94181aff6c19ca27cb739",
		name: "Ruth Riley",
		age: 18,
	},
	{
		id: "user_live_a50f3828783d4b29be0ca60142377497",
		name: "Tobi Chase",
		age: 40,
	},
	{
		id: "user_live_24fa0feaf6fe4084974ffc65d56137c2",
		name: "Jeremy Kent",
		age: 27,
	},
	{
		id: "user_live_7c408fe799ca41c4a98d03564e42da16",
		name: "Abigail Walker",
		age: 28,
	},
];

app.get("/", (c) => {
	const name = c.req.query("name");

	const list = users.filter((user) => {
		if (name) {
			return user.name.toLowerCase().includes(name.trim().toLowerCase());
		}

		return true;
	});

	return c.json(list);
});

app.post("/", async (c) => {
	const body = await c.req.json();

	const input = validateUser(body);

	const user = {
		id: generateId("user"),
		name: input.name,
		age: input.age,
	};

	users.push(user);

	return c.json(user);
});

app.get("/:id", (c) => {
	const id = c.req.param("id");

	const user = users.find((u) => u.id === id);

	if (!user) {
		throw new HTTPException(404, { message: "User not found" });
	}

	return c.json(user);
});

app.put("/:id", async (c) => {
	const id = c.req.param("id");

	const user = users.find((u) => u.id === id);

	if (!user) {
		throw new HTTPException(404, { message: "User not found" });
	}

	const body = await c.req.json();

	const input = validateUser(body);

	user.name = input.name;
	user.age = input.age;

	users[users.findIndex((u) => u.id === id)] = user;

	return c.json(user);
});

app.delete("/:id", (c) => {
	const id = c.req.param("id");

	const user = users.find((u) => u.id === id);

	if (!user) {
		throw new HTTPException(404, { message: "User not found" });
	}

	users.splice(
		users.findIndex((u) => u.id === id),
		1
	);

	return c.json(user);
});

export default app;

function generateId(tag: string) {
	return `${tag}_live_${randomBytes(16).toString("hex")}`;
}

function validateUser(user: any) {
	if (!user) {
		throw new HTTPException(400, { message: "Invalid user" });
	}

	if (!("name" in user) || typeof user.name !== "string") {
		throw new HTTPException(400, { message: "Invalid name" });
	}

	if (!("age" in user) || typeof user.age !== "number") {
		throw new HTTPException(400, { message: "Invalid age" });
	}

	if (user.age < 0) {
		throw new HTTPException(400, { message: "Invalid age" });
	}

	return user as { name: string; age: number };
}
