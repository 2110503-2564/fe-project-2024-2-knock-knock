export default async function userRegister(
    name: string,
    phone: string,
    email: string,
    password: string
  ) {
    const response = await fetch(
      "https://back-end-knock-knock.vercel.app/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
          role: "user",
        }),
      }
    );
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to register");
    }
  
    return await response.json();
  }
  