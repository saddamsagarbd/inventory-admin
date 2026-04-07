import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ShoppingBag,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import MyLogo from "../components/MyLogo";

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    newsletter: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full flex items-center justify-center p-6 sm:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Logo & Title */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <MyLogo />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Sign up to start shopping fresh organic products
            </p>
          </div>

          {/* Registration Form */}
          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--color-primary) focus:outline-none transition-colors duration-300 text-gray-900"
                />
              </div>
            </div>

            {/* Email Input */}
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
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--color-primary) focus:outline-none transition-colors duration-300 text-gray-900"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--color-primary) focus:outline-none transition-colors duration-300 text-gray-900"
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter your delivery address"
                  rows="2"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--color-primary) focus:outline-none transition-colors duration-300 text-gray-900 resize-none"
                />
              </div>
            </div>

            {/* Password Input */}
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
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-(--color-primary) focus:outline-none transition-colors duration-300 text-gray-900"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-(--color-primary) focus:outline-none transition-colors duration-300 text-gray-900"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleChange("agreeToTerms", e.target.checked)
                  }
                  className="w-4 h-4 mt-0.5 text-green-500 border-gray-300 rounded focus:ring-(--color-primary)"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-(--color-primary) hover:text-(--color-primary-hover) font-semibold"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-(--color-primary) hover:text-(--color-primary-hover) font-semibold"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => handleChange("newsletter", e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-(--color-primary) border-gray-300 rounded focus:ring-(--color-primary)"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Subscribe to our newsletter for exclusive offers and updates
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-(--color-primary) to-(--color-primary-hover) text-white font-semibold py-4 rounded-xl hover:from-(--color-primary-hover) hover:to-(--color-primary) transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Divider */}

            {/* Sign In Link */}
            <p className="text-center text-sm text-black pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary-hover)"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
