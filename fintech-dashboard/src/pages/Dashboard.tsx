import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PieChart, 
  BarChart3,
  Zap,
  Coffee,
  Car,
  Home as HomeIcon,
  Gamepad2
} from 'lucide-react';

const overviewCards = [
  {
    title: 'Total Balance',
    value: '$12,450.00',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-blue-600'
  },
  {
    title: 'Income (This Month)',
    value: '$4,200.00',
    change: '+8.2%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-green-600'
  },
  {
    title: 'Expenses (This Month)',
    value: '$2,850.00',
    change: '-3.1%',
    changeType: 'negative',
    icon: TrendingDown,
    color: 'bg-red-500'
  },
  {
    title: 'Savings Progress',
    value: '68%',
    change: 'On track',
    changeType: 'neutral',
    icon: Target,
    color: 'bg-purple-600'
  }
];

const spendingCategories = [
  { category: 'Food & Dining', amount: 850, percentage: 30, icon: Coffee, color: 'bg-orange-500' },
  { category: 'Transportation', amount: 420, percentage: 15, icon: Car, color: 'bg-blue-500' },
  { category: 'Bills & Utilities', amount: 650, percentage: 23, icon: Zap, color: 'bg-yellow-500' },
  { category: 'Housing', amount: 750, percentage: 26, icon: HomeIcon, color: 'bg-green-500' },
  { category: 'Entertainment', amount: 180, percentage: 6, icon: Gamepad2, color: 'bg-purple-500' }
];

const aiInsights = [
  {
    type: 'warning',
    message: 'You\'ve spent 23% more on dining out this week. Consider cooking at home to save $120.',
    icon: '🍔'
  },
  {
    type: 'success',
    message: 'Great job! You\'re 15% ahead of your savings goal for this month.',
    icon: '🎉'
  },
  {
    type: 'info',
    message: 'Your electricity bill is due in 3 days. Budget: $85 remaining.',
    icon: '⚡'
  }
];

const recentTransactions = [
  { id: 1, description: 'Starbucks Coffee', amount: -12.50, category: 'Food', date: '2024-12-28', type: 'expense' },
  { id: 2, description: 'Salary Deposit', amount: 3500.00, category: 'Income', date: '2024-12-27', type: 'income' },
  { id: 3, description: 'Uber Ride', amount: -18.75, category: 'Transport', date: '2024-12-27', type: 'expense' },
  { id: 4, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2024-12-26', type: 'expense' },
  { id: 5, description: 'Grocery Store', amount: -87.32, category: 'Food', date: '2024-12-26', type: 'expense' }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome back, Alex! Here's your financial overview.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors font-medium text-sm shadow-sm">
            Add Transaction
          </button>
          <button className="bg-secondary-500 text-white px-4 py-2 rounded-xl hover:bg-secondary-600 transition-colors font-medium text-sm shadow-sm">
            Set New Goal
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-card border border-gray-200 p-6 hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{card.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <p className={`text-xs mt-2 flex items-center ${
                    card.changeType === 'positive' ? 'text-green-600' : 
                    card.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {card.change}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900">Spending by Category</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {spendingCategories.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`${item.color} p-2 rounded-xl`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.category}</p>
                      <p className="text-xs text-gray-500">${item.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{item.percentage}%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className={`h-2 rounded-full ${item.color.replace('bg-', 'bg-')}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Income vs Expenses Trend */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900">Income vs Expenses</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Income Trend</span>
              <span className="text-sm text-green-600 font-semibold">+8.2%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="h-3 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expense Trend</span>
              <span className="text-sm text-red-500 font-semibold">-3.1%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="h-3 bg-red-500 rounded-full" style={{ width: '60%' }}></div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Savings Rate</span>
                <span className="text-sm text-blue-600 font-semibold">32.1%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                <div className="h-3 bg-blue-500 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-6">AI Insights</h3>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-xl border-l-4 ${
                insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                insight.type === 'success' ? 'bg-green-50 border-green-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">{insight.icon}</span>
                  <p className="text-xs text-gray-700">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-primary-600 hover:text-primary-800 font-medium text-xs">View All</button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-xs font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.category.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className={`text-right text-sm font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}