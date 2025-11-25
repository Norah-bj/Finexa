import React, { useState } from "react";
import {
  DollarSign,
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import { api } from "../api/axios";

interface RegisterPageProps {
  setCurrentPage: (page: string) => void;
  setIsAuthenticated: (auth: boolean) => void;
}

const financialFocusOptions = [
  { value: "savings", label: "Savings & Budgeting", icon: Target },
  { value: "investing", label: "Investing & Growth", icon: TrendingUp },
  { value: "tracking", label: "Expense Tracking", icon: DollarSign },
];

export default function RegisterPage({
  setCurrentPage,
  setIsAuthenticated,
}: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    financialGoals: "",
    financialFocus: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/users", {
        fullName: formData.name,
        age: Number(formData.age),
        email: formData.email,
        password: formData.password,
      });

      alert("Account created successfully. Please sign in.");
      setIsAuthenticated(false);
      setCurrentPage("login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      const message = Array.isArray(error.response?.data?.message)
        ? error.response.data.message[0]
        : error.response?.data?.message || "Unable to create account";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isStep1Valid =
    formData.name &&
    formData.age &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;
  const isStep2Valid = formData.financialGoals && formData.financialFocus;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() =>
            currentStep === 1 ? setCurrentPage("landing") : setCurrentStep(1)
          }
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">
            {currentStep === 1 ? "Back to home" : "Previous step"}
          </span>
        </button>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of 2
            </span>
            <span className="text-sm text-gray-500">
              {currentStep === 1 ? "Account Details" : "Financial Profile"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStep === 1
                ? "Create your account"
                : "Tell us about yourself"}
            </h1>
            <p className="text-gray-600">
              {currentStep === 1
                ? "Join thousands of users managing their finances smarter"
                : "Help us personalize your financial experience"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Full Name</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Age</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="16"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.password &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="financialGoals"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>What are your financial goals?</span>
                    </div>
                  </label>
                  <textarea
                    id="financialGoals"
                    name="financialGoals"
                    value={formData.financialGoals}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all resize-none"
                    placeholder="e.g., Save for emergency fund, buy a house, invest for retirement..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    What's your primary financial focus?
                  </label>
                  <div className="space-y-3">
                    {financialFocusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <label
                          key={option.value}
                          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.financialFocus === option.value
                              ? "border-secondary-500 bg-secondary-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="financialFocus"
                            value={option.value}
                            checked={formData.financialFocus === option.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                              formData.financialFocus === option.value
                                ? "bg-secondary-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span
                            className={`font-medium ${
                              formData.financialFocus === option.value
                                ? "text-secondary-700"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && (!isStep2Valid || isLoading))
              }
              className="w-full bg-secondary-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 1 ? (
                "Continue"
              ) : isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          {currentStep === 1 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-secondary-500 hover:text-secondary-600 font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
