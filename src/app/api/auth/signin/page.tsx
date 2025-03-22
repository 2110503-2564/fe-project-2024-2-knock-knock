'use client';

import { getCsrfToken, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState<string | undefined>();

  useEffect(() => {
    getCsrfToken().then(token => setCsrfToken(token || undefined));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/', // redirect after login
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="csrfToken" value={csrfToken} />

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
