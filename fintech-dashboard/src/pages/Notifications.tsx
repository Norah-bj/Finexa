import React, { useState } from 'react';
import { Bell, Clock, Check, X, Filter, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Bill Due Soon',
    message: 'Your electricity bill of $125.00 is due in 2 days',
    timestamp: '2 hours ago',
    read: false,
    category: 'bills'
  },
  {
    id: 2,
    type: 'success',
    title: 'Savings Goal Milestone',
    message: 'Congratulations! You\'ve reached 75% of your Emergency Fund goal',
    timestamp: '5 hours ago',
    read: false,
    category: 'goals'
  },
  {
    id: 3,
    type: 'info',
    title: 'Weekly Spending Report',
    message: 'You spent $285 this week, which is 15% less than last week',
    timestamp: '1 day ago',
    read: true,
    category: 'insights'
  },
  {
    id: 4,
    type: 'warning',
    title: 'High Spending Alert',
    message: 'You\'ve spent $95 on dining out today, exceeding your daily limit',
    timestamp: '1 day ago',
    read: true,
    category: 'spending'
  },
  {
    id: 5,
    type: 'info',
    title: 'Investment Update',
    message: 'Your S&P 500 fund gained 2.3% this month',
    timestamp: '2 days ago',
    read: true,
    category: 'investments'
  },
  {
    id: 6,
    type: 'success',
    title: 'Budget Achievement',
    message: 'You stayed within your monthly food budget! Saved $45.',
    timestamp: '3 days ago',
    read: true,
    category: 'budget'
  },
  {
    id: 7,
    type: 'warning',
    title: 'Subscription Renewal',
    message: 'Your Netflix subscription will auto-renew tomorrow for $15.99',
    timestamp: '3 days ago',
    read: false,
    category: 'bills'
  },
  {
    id: 8,
    type: 'info',
    title: 'Market Update',
    message: 'Tech stocks are performing well. Consider reviewing your portfolio.',
    timestamp: '4 days ago',
    read: true,
    category: 'investments'
  }
];

const categories = [
  { id: 'all', name: 'All', count: notifications.length },
  { id: 'bills', name: 'Bills', count: notifications.filter(n => n.category === 'bills').length },
  { id: 'goals', name: 'Goals', count: notifications.filter(n => n.category === 'goals').length },
  { id: 'spending', name: 'Spending', count: notifications.filter(n => n.category === 'spending').length },
  { id: 'investments', name: 'Investments', count: notifications.filter(n => n.category === 'investments').length },
  { id: 'insights', name: 'Insights', count: notifications.filter(n => n.category === 'insights').length }
];

export default function Notifications() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const categoryMatch = selectedCategory === 'all' || notification.category === selectedCategory;
    const readMatch = !showUnreadOnly || !notification.read;
    return categoryMatch && readMatch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = (type: string, read: boolean) => {
    const opacity = read ? '50' : '100';
    switch (type) {
      case 'warning':
        return `bg-yellow-${opacity}`;
      case 'success':
        return `bg-green-${opacity}`;
      case 'info':
        return `bg-blue-${opacity}`;
      default:
        return `bg-gray-${opacity}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your financial activities</p>
        </div>
        <div className="flex items-center space-x-4">
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {unreadCount} unread
            </span>
          )}
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Total Notifications</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">{notifications.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Unread</p>
            <p className="text-2xl font-bold text-red-600 mt-2">{unreadCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Bills Due</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">2</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Goals Achieved</p>
            <p className="text-2xl font-bold text-green-600 mt-2">1</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="unread-only"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="unread-only" className="text-sm text-gray-700">
              Show unread only
            </label>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications found matching your filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      notification.type === 'success' ? 'bg-green-100' :
                      'bg-blue-100'
                    }`}>
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-lg font-semibold ${
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      
                      <p className={`text-sm mt-1 ${
                        notification.read ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-xs text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {notification.timestamp}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          notification.category === 'bills' ? 'bg-red-100 text-red-800' :
                          notification.category === 'goals' ? 'bg-green-100 text-green-800' :
                          notification.category === 'spending' ? 'bg-yellow-100 text-yellow-800' :
                          notification.category === 'investments' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notification.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}