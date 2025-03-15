import React from "react";

const features = [
  {
    title: "Track Expenses",
    description: "Easily monitor where your money goes and keep your budget in check.",
  },
  {
    title: "Categorize Expenses",
    description: "Sort your expenses into different categories for better financial management.",
  },
  {
    title: "Total Spending Insights",
    description: "Get a breakdown of your spending per category and manage your budget effectively.",
  },
  {
    title: "Set Budget Limits",
    description: "Set monthly budget limits and receive alerts when you're close to overspending.",
  },
  {
    title: "Export Reports",
    description: "Download and share expense reports in PDF or Excel for better tracking.",
  },
];

function FeatureSection() {
  return (
    <div className="bg-purple-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
          App Features
        </h2>

        {/* Scrollable Feature Cards with Hidden Scrollbar */}
        <div className="overflow-x-auto scrollbar-hide hide-scrollbar">
          <div className="flex space-x-6 px-2 w-max">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md w-64 min-w-[250px] hover:bg-purple-200 transition-all"
              >
                <h3 className="text-xl font-semibold text-purple-700">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;

  
