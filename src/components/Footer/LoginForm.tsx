import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

interface LoginFormProps {
    onSubmit: (credentials: { email: string; password: string }) => void;
    loginError?: string | null;
}

const LoginForm = ({onSubmit, loginError} : LoginFormProps) => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the parent onSubmit function with the form data
    onSubmit({ email, password });
  };

  return (
    <div>
                    <h2 className="text-lg font-medium text-gray-700 mb-2">
                      Login
                    </h2>
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {loginError && (
                        <p className="text-red-500 mb-4">{loginError}</p>
                      )}
                      <Button type="submit" variant="default">
                        Login
                      </Button>
                    </form>
                  </div>
  )


}

export default LoginForm;