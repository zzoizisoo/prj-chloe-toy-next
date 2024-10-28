// import { mongoClient } from "@/src/db/mongodb";
import { getUserByEmail, createUser } from "@/src/db/methods/users";

export async function POST(request) {
	const { email, password } = await request.json();
	// TODO: add server side form validation

	try {
		const user = await getUserByEmail(email);
		if (user) {
			return new Response(JSON.stringify({ message: "user already exist" }));
		}
		const userId = await createUser(email, password);
		if (userId) {
			return new Response(
				JSON.stringify({ message: "User created successfully" }),
				{
					status: 201,
				}
			);
		}
	} catch (e) {
		console.error(e);
		return new Response(e);
	}
}
