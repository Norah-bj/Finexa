import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
//   Check,
  Moon,
  Sun
} from 'lucide-react';

const settingSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    items: [
      { name: 'Personal Information', description: 'Update your basic details' },
      { name: 'Profile Picture', description: 'Change your avatar' },
      { name: 'Financial Goals', description: 'Set and modify your objectives' }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    items: [
      { name: 'Push Notifications', description: 'Real-time alerts and updates' },
      { name: 'Email Reports', description: 'Weekly and monthly summaries' },
      { name: 'SMS Alerts', description: 'Important bill and goal reminders' }
    ]
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: Shield,
    items: [
      { name: 'Password', description: 'Change your account password' },
      { name: 'Two-Factor Authentication', description: 'Add extra security' },
      { name: 'Data Privacy', description: 'Control your data sharing' }
    ]
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Palette,
    items: [
      { name: 'Theme', description: 'Light, dark, or auto mode' },
      { name: 'Currency Display', description: 'Format and denomination' },
      { name: 'Date Format', description: 'Regional preferences' }
    ]
  }
];

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function Settings({ darkMode, setDarkMode }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop"
            alt="Profile"
            className="w-16 h-16 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Alex Johnson</h3>
            <p className="text-sm text-gray-600">alex.johnson@email.com</p>
            <p className="text-xs text-green-600 mt-1">Premium Member since Jan 2024</p>
          </div>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors text-sm">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-6 h-6 text-gray-600" /> : <Sun className="w-6 h-6 text-yellow-500" />}
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Dark Mode</h4>
                <p className="text-xs text-gray-600">Toggle theme appearance</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-primary-600" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Notifications</h4>
                <p className="text-xs text-gray-600">Manage alert preferences</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Security</h4>
                <p className="text-xs text-gray-600">Account protection</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-white rounded-2xl shadow-card border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-xl">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {section.items.map((item, index) => (
                  <div key={index} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">Account Management</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          <div className="p-5 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Billing & Subscription</h4>
                  <p className="text-xs text-gray-600">Manage your premium plan</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="p-5 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Help & Support</h4>
                  <p className="text-xs text-gray-600">Get assistance and documentation</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="p-5 hover:bg-red-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-600" />
                <div>
                  <h4 className="text-sm font-medium text-red-900">Sign Out</h4>
                  <p className="text-xs text-red-600">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
        <div className="text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-4">App Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-gray-600">Version:</span>
              <span className="ml-2 text-xs font-medium text-gray-900">2.1.0</span>
            </div>
            <div>
              <span className="text-xs text-gray-600">Last Updated:</span>
              <span className="ml-2 text-xs font-medium text-gray-900">Dec 25, 2024</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © 2024 FinTech AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}