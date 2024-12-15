import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
  loginError?: string | null;
}

const LoginForm = ({ onSubmit, loginError }: LoginFormProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the parent onSubmit function with the form data
    onSubmit({ email, password });
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-700 mb-2">{t("login")}</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Email input field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            {t("email")}
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password input field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            {t("password")}
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Display error message if there is a login error */}
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
        {/* Submit button */}
        <Button type="submit" variant="default">
          {t("login")}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
