import React, { useState } from "react";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ShoppingBag,
} from "lucide-react";
import MyLogo from "../components/MyLogo";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Reset password for:", email);
    setIsSubmitted(true);
  };

  //   const MyLogo = () => (
  //     <div className="flex items-center justify-center gap-2 mb-6">
  //       <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
  //         <ShoppingBag className="w-7 h-7 text-white" />
  //       </div>
  //       <span className="text-2xl font-bold text-gray-900">ShopHub</span>
  //     </div>
  //   );

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Check Your Email
            </h2>
            <p className="text-gray-600">We've sent a password reset link to</p>
            <p className="text-gray-900 font-semibold">{email}</p>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-left">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Didn't receive the email?</span>
              <br />
              Check your spam folder or try again with a different email
              address.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Resend Email
          </button>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <div className="w-full flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <MyLogo />

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600">
              No worries! Enter your email and we'll send you reset instructions
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-colors duration-300 text-gray-900"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!email}
              className="w-full bg-green-600 text-white cursor-pointer font-semibold py-4 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg"
            >
              Send Reset Link
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 text-center">
              Remember your password?{" "}
              <Link to="/login" className="font-semibold text-green-600">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
