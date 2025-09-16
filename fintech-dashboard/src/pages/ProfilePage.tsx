import React, { useState } from "react";
import {
  User,
  Camera,
  Edit3,
  Bell,
  Shield,
  Target,
  Moon,
  Sun,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

interface ProfilePageProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function ProfilePage({
  darkMode,
  setDarkMode,
}: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    age: "28",
    joinDate: "January 2024",
    financialGoals:
      "Save for emergency fund, invest for retirement, buy a house",
    monthlyBudget: "3500",
    savingsGoal: "15000",
  });

  type NotificationPrefs = {
    emailReports: boolean;
    pushNotifications: boolean;
    smsAlerts: boolean;
    budgetAlerts: boolean;
    goalReminders: boolean;
    investmentUpdates: boolean;
  };

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailReports: true,
    pushNotifications: true,
    smsAlerts: false,
    budgetAlerts: true,
    goalReminders: true,
    investmentUpdates: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: keyof NotificationPrefs) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600">
            Manage your account and preferences
          </p>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isEditing
              ? "bg-accent-500 text-white hover:bg-accent-600"
              : "bg-primary-500 text-white hover:bg-primary-600"
          }`}
        >
          {isEditing ? (
            <Save className="w-4 h-4" />
          ) : (
            <Edit3 className="w-4 h-4" />
          )}
          <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop"
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover"
            />
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-primary-500 focus:outline-none mb-2"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {profileData.name}
              </h2>
            )}
            <p className="text-gray-600 mb-4">
              Premium Member since {profileData.joinDate}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{profileData.age} years old</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-lg font-bold text-primary-600">4</p>
              <p className="text-xs text-gray-600">Active Goals</p>
            </div>
            <div className="bg-secondary-50 rounded-xl p-4">
              <p className="text-lg font-bold text-secondary-600">68%</p>
              <p className="text-xs text-gray-600">Savings Rate</p>
            </div>
            <div className="bg-accent-50 rounded-xl p-4">
              <p className="text-lg font-bold text-accent-600">12</p>
              <p className="text-xs text-gray-600">Months Active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                  {profileData.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                  {profileData.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                  {profileData.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Financial Profile */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Financial Profile
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Financial Goals
              </label>
              {isEditing ? (
                <textarea
                  name="financialGoals"
                  value={profileData.financialGoals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                  {profileData.financialGoals}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Budget
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="monthlyBudget"
                    value={profileData.monthlyBudget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                    ${profileData.monthlyBudget}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Savings Goal
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="savingsGoal"
                    value={profileData.savingsGoal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                    ${profileData.savingsGoal}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-accent-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Notification Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(notifications).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === "emailReports" &&
                    "Weekly and monthly financial summaries"}
                  {key === "pushNotifications" &&
                    "Real-time alerts and updates"}
                  {key === "smsAlerts" && "Important notifications via SMS"}
                  {key === "budgetAlerts" && "Spending limit notifications"}
                  {key === "goalReminders" && "Progress updates on your goals"}
                  {key === "investmentUpdates" &&
                    "Portfolio performance updates"}
                </p>
              </div>
              <button
                onClick={() =>
                  handleNotificationChange(key as keyof NotificationPrefs)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? "bg-primary-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            App Preferences
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
              <div>
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-600">
                  Toggle between light and dark themes
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-primary-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
