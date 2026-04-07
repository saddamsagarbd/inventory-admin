import React, { useContext, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MyLogo from "../components/MyLogo";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const navigat = useNavigate();
  const { login, loading, error, clearError } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');

  const handleLogin = async (e) => {
    console.log("Login:", { username, password, rememberMe });

    e.preventDefault();

    if (username == "" || password == "") {
      setFormError("Credential does not match");
      return;
    }

    try {
      const result = await login({
        username, password
      });

      console.log(result.data);

      if(result.token){
        // Simulate successful login and navigate to dashboard
        navigat("/admin/dashboard");
      }
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* HEADER MUST BE OUTSIDE FLEX */}

      {/* PAGE BODY */}
      <div className="w-full flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo + Title */}
          <div className="text-center">
            <MyLogo />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          {/* LOGIN FORM */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your email/phone number"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-(--color-primary)"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-green-600"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full cursor-pointer bg-(--color-primary) text-white font-semibold py-4 rounded-xl hover:bg-(--color-primary-hover) transition flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Sign Up */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-green-600">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
