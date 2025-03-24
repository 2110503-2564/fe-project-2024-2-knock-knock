export default async function userRegister(
    name: string,
    phone: string,
    email: string,
    password: string
  ) {
    const response = await fetch(
      "http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/auth/register",
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
  