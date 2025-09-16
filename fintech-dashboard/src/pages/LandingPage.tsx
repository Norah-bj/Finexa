import React from 'react';
import { DollarSign, TrendingUp, Shield, Zap, ArrowRight, Star } from 'lucide-react';

interface LandingPageProps {
  setCurrentPage: (page: string) => void;
}

const features = [
  {
    icon: TrendingUp,
    title: 'Smart Analytics',
    description: 'AI-powered insights to track your spending patterns and optimize your finances'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-level security with end-to-end encryption to protect your financial data'
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Get instant notifications and alerts for all your financial activities'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    content: 'FinTech AI helped me save 30% more each month with personalized recommendations.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    content: 'The investment suggestions are spot-on. I\'ve grown my portfolio by 15% this year.',
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Student',
    content: 'Perfect for tracking expenses and saving for my goals. The AI insights are amazing!',
    rating: 5
  }
];

export default function LandingPage({ setCurrentPage }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinTech AI</h1>
                <p className="text-xs text-gray-500">Smart Finance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your AI-Powered
            <span className="text-primary-500 block">Financial Assistant</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take control of your finances with intelligent insights, automated savings, 
            and personalized investment recommendations. Built for the modern financial lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('register')}
              className="px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-xl hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className="px-8 py-4 bg-secondary-500 text-white text-lg font-semibold rounded-xl hover:bg-secondary-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90">Total Balance</h3>
                  <p className="text-2xl font-bold mt-2">$12,450.00</p>
                  <p className="text-sm opacity-90 mt-1">+12.5% this month</p>
                </div>
                <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90">Monthly Savings</h3>
                  <p className="text-2xl font-bold mt-2">$1,350.00</p>
                  <p className="text-sm opacity-90 mt-1">68% of goal</p>
                </div>
                <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90">Investments</h3>
                  <p className="text-2xl font-bold mt-2">$8,200.00</p>
                  <p className="text-sm opacity-90 mt-1">+18.2% return</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">AI Insight</h4>
                </div>
                <p className="text-sm text-gray-700">
                  You've spent 23% more on dining out this week. Consider cooking at home to save $120 monthly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage your finances
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you save more, spend smarter, and invest better.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by thousands of users
            </h2>
            <p className="text-lg text-gray-600">
              See what our users say about their financial transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-card border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your finances?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already saving more and investing smarter with AI.
          </p>
          <button
            onClick={() => setCurrentPage('register')}
            className="px-8 py-4 bg-white text-primary-500 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">FinTech AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 FinTech AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}