'use client'
import bcrypt from 'bcryptjs'

export default function SignUpPage() {

    const handleSubmit = async (e) => { 
        e.preventDefault()
        const formData = new FormData(e.target)
        const {email, password, passwordConfirm} = Object.fromEntries(formData.entries());
        if(password !== passwordConfirm) return;

        const hashed_password = await bcrypt.hash(password, 10)
        let response = await fetch('/api/auth/signup', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({email, password: hashed_password})
          });
        let result = await response.json();
        console.log(result)
    }

	return (
		<>
			<h1> Sign Up</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email">
					Email
					<input name="email" type="email" />
				</label>
				<hr />
				<label htmlFor="password">
					Password
					<input name="password" type="password" />
				</label>
				<hr />
				<label htmlFor="passwordConfirm">
					Confirm Password
					<input name="passwordConfirm" type="password" />
				</label>
				<hr />
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
