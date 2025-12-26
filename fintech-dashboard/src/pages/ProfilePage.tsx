import React, { useEffect, useMemo, useState } from "react";
import {
  Edit3,
  Bell,
  Shield,
  Moon,
  Sun,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../api/axios";
import type { AuthUser as BaseAuthUser } from "../types";

// Extend the base AuthUser type with additional properties
interface AuthUser extends BaseAuthUser {
  age?: number;
  monthlyBudget?: number;
}

interface ProfilePageProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  age: number;
  monthlyBudget?: number;
  phoneNumber?: string;
  location?: string;
  profilePicture?: string;
  joinedAt?: string;
}

interface FinancialSummary {
  activeGoals: number;
  savingsRate: number | string;
  monthsActive: number;
  savingsGoal?: number;
  financialGoals?: string[];
  budget?: number;
}

type NotificationPrefs = {
  emailReports: boolean;
  pushNotifications: boolean;
  smsAlerts: boolean;
  budgetAlerts: boolean;
  goalReminders: boolean;
  investmentUpdates: boolean;
};



export default function ProfilePage({
  darkMode,
  setDarkMode,
  user,
  setUser,
}: ProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailReports: true,
    pushNotifications: true,
    smsAlerts: false,
    budgetAlerts: true,
    goalReminders: true,
    investmentUpdates: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    age: user?.age?.toString() || "",
    monthlyBudget: user?.monthlyBudget?.toString() || "",
    phoneNumber: "",
    location: "",
    profilePicture: null as File | null,
  });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const [profileRes, summaryRes] = await Promise.all([
          api.get<UserProfile>(`/users/${user.id}/profile`),
          api.get<FinancialSummary>(`/users/${user.id}/financial-summary`),
        ]);
        setProfile(profileRes.data);
        setSummary(summaryRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const displayProfile = useMemo(() => {
    const joinDate = profile?.joinedAt
      ? new Date(profile.joinedAt).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "your start date";

    return {
      name: profile?.fullName ?? user?.fullName ?? "Your name",
      email: profile?.email ?? user?.email ?? "Add your email",
      phone: profile?.phoneNumber || "Add a phone number",
      location: profile?.location || "Add a location",
      age: profile?.age ? `${profile.age}` : "Not specified",
      joinDate,
      monthlyBudget: profile?.monthlyBudget ?? summary?.budget ?? 0,
      savingsGoal: summary?.savingsGoal ?? 0,
      financialGoals:
        summary?.financialGoals?.length
          ? summary.financialGoals.join(", ")
          : "Create savings goals to personalize this section.",
      activeGoals: summary?.activeGoals ?? 0,
      savingsRate: summary?.savingsRate ?? "0%",
      monthsActive: summary?.monthsActive ?? 0,
      profilePicture: profile?.profilePicture || null,
    };
  }, [profile, summary, user]);

  const handleNotificationChange = (key: keyof NotificationPrefs) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openEditModal = () => {
    setEditForm({
      fullName: profile?.fullName ?? user?.fullName ?? "",
      email: profile?.email ?? user?.email ?? "",
      age: profile?.age?.toString() ?? "",
      monthlyBudget: profile?.monthlyBudget?.toString() ?? "",
      phoneNumber: profile?.phoneNumber ?? "",
      location: profile?.location ?? "",
      profilePicture: null,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setEditForm((prev) => ({ ...prev, profilePicture: file }));
  };



  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append('fullName', editForm.fullName);
      formData.append('email', editForm.email);
      if (editForm.age) formData.append('age', editForm.age);
      if (editForm.monthlyBudget) formData.append('monthlyBudget', editForm.monthlyBudget);
      if (editForm.phoneNumber) formData.append('phoneNumber', editForm.phoneNumber);
      if (editForm.location) formData.append('location', editForm.location);
      if (editForm.profilePicture) {
        formData.append('profilePicture', editForm.profilePicture);
      }

      const { data } = await api.patch<UserProfile>(
        `/users/${user.id}/profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfile(data);
      if (user) {
        const updatedUser = {
          ...user,
          fullName: data.fullName,
          profilePicture: data.profilePicture
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      toast.success("Profile updated successfully.");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to update your profile at the moment.");
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Profile unavailable
        </h2>
        <p className="text-gray-600">
          Please sign in again to view and edit your profile details.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={`space-y-6 ${
          isModalOpen ? "pointer-events-none blur-sm select-none" : ""
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-600">
              Manage your account and preferences
            </p>
          </div>
          <button
            onClick={openEditModal}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-primary-500 text-white hover:bg-primary-600"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
          {loading ? (
            <div className="flex items-center justify-center space-x-3 text-gray-500">
              <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span>Loading your profile...</span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                {displayProfile.profilePicture ? (
                  <img
                    src={`http://localhost:4000${displayProfile.profilePicture}`}
                    alt={displayProfile.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center text-4xl font-semibold">
                    {(displayProfile.name || "U").charAt(0)}
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {displayProfile.name}
                  </h2>
                  <p className="text-gray-600">{displayProfile.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{displayProfile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{displayProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>Member since {displayProfile.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-primary-600">
                    {displayProfile.activeGoals}
                  </p>
                  <p className="text-sm text-gray-500">Goals</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-primary-600">
                    {displayProfile.savingsRate}
                  </p>
                  <p className="text-sm text-gray-500">Savings Rate</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-primary-600">
                    {displayProfile.monthsActive}
                  </p>
                  <p className="text-sm text-gray-500">Months</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Financial Overview */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Financial Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Monthly Budget
              </h3>
              <p className="text-2xl font-bold">
                ${displayProfile.monthlyBudget.toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Savings Goal
              </h3>
              <p className="text-2xl font-bold">
                ${displayProfile.savingsGoal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Goals */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Financial Goals
            </h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          <p className="text-gray-600">{displayProfile.financialGoals}</p>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Email Reports</h4>
                  <p className="text-sm text-gray-600">
                    Receive weekly and monthly reports
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationChange("emailReports")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.emailReports ? "bg-primary-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.emailReports
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    Push Notifications
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get updates about your goals
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationChange("pushNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.pushNotifications
                    ? "bg-primary-500"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.pushNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                  <p className="text-sm text-gray-600">
                    Important account notifications
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationChange("smsAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.smsAlerts ? "bg-primary-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.smsAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
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

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveProfile}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={editForm.age}
                    onChange={handleEditChange}
                    min="18"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="monthlyBudget"
                      value={editForm.monthlyBudget}
                      onChange={handleEditChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editForm.phoneNumber}
                    onChange={handleEditChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center text-2xl font-semibold text-primary-600 overflow-hidden">
                      {editForm.profilePicture ? (
                        <img
                          src={URL.createObjectURL(editForm.profilePicture)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        (editForm.fullName || "U").charAt(0)
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG or GIF (max. 2MB)
                      </p>
                    </div>
                  </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}