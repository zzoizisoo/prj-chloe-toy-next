import { auth, signOut } from "@/src/auth";
export default async function Header() {
	const session = await auth();

	return (
		<div>
			Header

			{session?.user && (
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<button type="submit">Sign Out</button>
				</form>
			)}
		</div>
	);
}
