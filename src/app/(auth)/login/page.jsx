"use client"
import { signIn } from "next-auth/react";
import bcrypt from 'bcryptjs'

export default function LoginPage() {
  const handleSubmit = async (e) => { 
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries());
    const hashed_password = await bcrypt.hash(data.password, 10)
    
    const result = await signIn("credentials", {
        email: data.email,
        password: hashed_password,
        redirectTo: '/'
      });
  
      if (result?.error) {
        console.log("Login failed:", result.error);
      } else {
        console.log("Login successful");
        // Redirect or perform any additional actions on successful login
      }
    }
 
  return (
    <form onSubmit={handleSubmit}> 
      <label htmlFor="credentials-email">
        Email
        <input type="email" id="credentials-email" name="email" />
      </label>
      <hr />

      <label htmlFor="credentials-password">
        Password
        <input type="password" id="credentials-password" name="password" />
      </label>
      <hr />

      <input type="submit" value="Sign In" />
    </form>
  )
}