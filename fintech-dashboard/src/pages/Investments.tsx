import React, { useState } from "react";
import {
  TrendingUp,
  Shield,
  Zap,
  BookOpen,
  Plus,
  PieChart,
} from "lucide-react";

type RiskId = "conservative" | "moderate" | "aggressive";

const riskProfiles: Array<{
  id: RiskId;
  name: string;
  icon: typeof Shield;
  description: string;
  expectedReturn: string;
  color: string;
  textColor: string;
}> = [
  {
    id: "conservative",
    name: "Conservative",
    icon: Shield,
    description: "Lower risk, steady returns",
    expectedReturn: "4-6%",
    color: "bg-green-500",
    textColor: "text-green-600",
  },
  {
    id: "moderate",
    name: "Moderate",
    icon: TrendingUp,
    description: "Balanced risk and growth",
    expectedReturn: "6-8%",
    color: "bg-blue-500",
    textColor: "text-blue-600",
  },
  {
    id: "aggressive",
    name: "Aggressive",
    icon: Zap,
    description: "Higher risk, higher potential",
    expectedReturn: "8-12%",
    color: "bg-red-500",
    textColor: "text-red-600",
  },
];

const investmentOptions: Record<
  RiskId,
  Array<{
    name: string;
    return: string;
    risk: string;
    minAmount: number;
    description: string;
  }>
> = {
  conservative: [
    {
      name: "High-Yield Savings",
      return: "4.5%",
      risk: "Very Low",
      minAmount: 100,
      description: "FDIC insured savings account with competitive rates",
    },
    {
      name: "Treasury Bonds",
      return: "5.2%",
      risk: "Low",
      minAmount: 500,
      description: "Government-backed bonds with fixed returns",
    },
    {
      name: "CDs (Certificates)",
      return: "5.8%",
      risk: "Very Low",
      minAmount: 1000,
      description: "Fixed-term deposits with guaranteed returns",
    },
  ],
  moderate: [
    {
      name: "Index Funds (S&P 500)",
      return: "7.2%",
      risk: "Medium",
      minAmount: 250,
      description: "Diversified fund tracking market performance",
    },
    {
      name: "Balanced Mutual Funds",
      return: "6.8%",
      risk: "Medium",
      minAmount: 500,
      description: "Mix of stocks and bonds for stability",
    },
    {
      name: "Target-Date Funds",
      return: "7.5%",
      risk: "Medium",
      minAmount: 100,
      description: "Automatically adjusts based on your age",
    },
  ],
  aggressive: [
    {
      name: "Growth Stocks",
      return: "10.5%",
      risk: "High",
      minAmount: 500,
      description: "Individual stocks with high growth potential",
    },
    {
      name: "Tech ETFs",
      return: "11.2%",
      risk: "High",
      minAmount: 200,
      description: "Technology sector exchange-traded funds",
    },
    {
      name: "Cryptocurrency",
      return: "15.8%",
      risk: "Very High",
      minAmount: 50,
      description: "Digital assets with high volatility",
    },
  ],
};

const currentInvestments: Array<{
  name: string;
  amount: number;
  return: string;
  value: number;
  type: RiskId;
}> = [
  {
    name: "S&P 500 Index Fund",
    amount: 5000,
    return: "+12.4%",
    value: 5620,
    type: "moderate",
  },
  {
    name: "High-Yield Savings",
    amount: 3000,
    return: "+4.5%",
    value: 3135,
    type: "conservative",
  },
  {
    name: "Tech Growth ETF",
    amount: 2000,
    return: "+18.2%",
    value: 2364,
    type: "aggressive",
  },
  {
    name: "Treasury Bonds",
    amount: 1500,
    return: "+5.2%",
    value: 1578,
    type: "conservative",
  },
];

const educationalContent = [
  {
    title: "What is Risk Tolerance?",
    content:
      "Risk tolerance is your ability to handle investment losses. It depends on your age, income, and financial goals.",
    icon: "🎯",
  },
  {
    title: "Diversification Basics",
    content:
      "Don't put all eggs in one basket. Spread investments across different asset classes to reduce risk.",
    icon: "🧺",
  },
  {
    title: "Dollar-Cost Averaging",
    content:
      "Invest a fixed amount regularly, regardless of market conditions. This helps reduce the impact of volatility.",
    icon: "📅",
  },
];

export default function Investments() {
  const [selectedRisk, setSelectedRisk] = useState<RiskId>("moderate");

  const totalInvested = currentInvestments.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );
  const totalValue = currentInvestments.reduce(
    (sum, inv) => sum + inv.value,
    0
  );
  const totalReturn = ((totalValue - totalInvested) / totalInvested) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investments</h1>
          <p className="text-gray-600">
            Build wealth with smart investment strategies
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Investment</span>
        </button>
      </div>

      {/* Current Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <PieChart className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Total Invested</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              ${totalInvested.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-600">Current Value</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ${totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <span className="text-purple-600 font-bold text-lg">%</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Return</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              +{totalReturn.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
              <span className="text-yellow-600 font-bold text-lg">$</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Gain</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">
              +${(totalValue - totalInvested).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Profile Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Choose Your Risk Profile
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riskProfiles.map((profile) => {
            const Icon = profile.icon;
            const isSelected = selectedRisk === profile.id;

            return (
              <button
                key={profile.id}
                onClick={() => setSelectedRisk(profile.id)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 ${profile.color} rounded-full mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4
                    className={`text-lg font-semibold ${
                      isSelected ? "text-blue-900" : "text-gray-900"
                    }`}
                  >
                    {profile.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {profile.description}
                  </p>
                  <p className={`text-lg font-bold mt-3 ${profile.textColor}`}>
                    {profile.expectedReturn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Investment Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Recommended Investments -{" "}
          {riskProfiles.find((p) => p.id === selectedRisk)?.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {investmentOptions[selectedRisk].map((option, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {option.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    option.risk === "Very Low"
                      ? "bg-green-100 text-green-800"
                      : option.risk === "Low"
                      ? "bg-blue-100 text-blue-800"
                      : option.risk === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : option.risk === "High"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {option.risk} Risk
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{option.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Expected Return:
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {option.return}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Minimum Amount:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${option.minAmount}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current Investments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Your Current Investments
        </h3>

        <div className="space-y-4">
          {currentInvestments.map((investment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    investment.type === "conservative"
                      ? "bg-green-100"
                      : investment.type === "moderate"
                      ? "bg-blue-100"
                      : "bg-red-100"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      investment.type === "conservative"
                        ? "text-green-600"
                        : investment.type === "moderate"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {investment.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {investment.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Invested: ${investment.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${investment.value.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {investment.return}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Investment Education
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationalContent.map((content, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{content.icon}</span>
                <h4 className="font-semibold text-gray-900">{content.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{content.content}</p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
