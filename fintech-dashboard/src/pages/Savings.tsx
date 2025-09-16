import React from 'react';
import { Target, TrendingUp, Calendar, Plus, Star } from 'lucide-react';

const savingsGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    target: 10000,
    current: 6800,
    deadline: '2025-06-01',
    category: 'Security',
    priority: 'High',
    color: 'bg-red-500'
  },
  {
    id: 2,
    name: 'New Laptop',
    target: 2500,
    current: 1750,
    deadline: '2025-03-15',
    category: 'Technology',
    priority: 'Medium',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    name: 'Vacation to Japan',
    target: 5000,
    current: 2100,
    deadline: '2025-08-20',
    category: 'Travel',
    priority: 'Low',
    color: 'bg-green-500'
  },
  {
    id: 4,
    name: 'Car Down Payment',
    target: 8000,
    current: 3200,
    deadline: '2025-12-01',
    category: 'Transportation',
    priority: 'High',
    color: 'bg-purple-500'
  }
];

const aiRecommendations = [
  {
    type: 'tip',
    message: 'Based on your spending patterns, you could save an extra $150/month by reducing dining out expenses.',
    icon: '💡'
  },
  {
    type: 'milestone',
    message: 'You\'re 68% of the way to your Emergency Fund goal! Keep up the great work.',
    icon: '🎯'
  },
  {
    type: 'suggestion',
    message: 'Consider setting up an automatic transfer of $200 weekly to boost your laptop fund.',
    icon: '🔄'
  }
];

export default function Savings() {
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Savings & Goals</h1>
          <p className="text-gray-600">Track your progress and achieve your financial dreams</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{overallProgress.toFixed(1)}%</p>
            <p className="text-gray-500 text-sm">of total savings goals</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Saved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">${totalSaved.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">across all goals</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{savingsGoals.length}</p>
            <p className="text-gray-500 text-sm">in progress</p>
          </div>
        </div>
      </div>

      {/* Savings Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {savingsGoals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${goal.color} rounded-lg flex items-center justify-center`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-500">{goal.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    goal.priority === 'High' ? 'bg-red-100 text-red-800' :
                    goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {goal.priority} Priority
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${goal.current.toLocaleString()}</span>
                  <span className="text-gray-500">of ${goal.target.toLocaleString()}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${goal.color}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{progress.toFixed(1)}% complete</span>
                  <span className="text-gray-600">${remaining.toLocaleString()} remaining</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{daysLeft} days left</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Star className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">AI Savings Recommendations</h3>
        </div>
        
        <div className="space-y-4">
          {aiRecommendations.map((recommendation, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              recommendation.type === 'tip' ? 'bg-blue-50 border-blue-400' :
              recommendation.type === 'milestone' ? 'bg-green-50 border-green-400' :
              'bg-purple-50 border-purple-400'
            }`}>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{recommendation.icon}</span>
                <div>
                  <p className="text-sm text-gray-700">{recommendation.message}</p>
                  <button className="text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Monthly Savings Rate</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">32.1%</p>
            <p className="text-xs text-green-600 mt-1">+5.2% from last month</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Average Monthly Savings</p>
            <p className="text-2xl font-bold text-green-600 mt-2">$1,350</p>
            <p className="text-xs text-green-600 mt-1">+8.7% from last month</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Goals on Track</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">3 of 4</p>
            <p className="text-xs text-green-600 mt-1">75% success rate</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Next Milestone</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">12 days</p>
            <p className="text-xs text-gray-600 mt-1">Laptop fund completion</p>
          </div>
        </div>
      </div>
    </div>
  );
}