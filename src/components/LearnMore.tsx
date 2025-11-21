import React from "react";

export const LearnMore: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6">Learn More</h1>
      <p className="max-w-2xl text-lg mb-8 text-center">
        Welcome to the Learn More page! Here you can find additional information about our platform, features, and how to get started as an employer or freelancer. More content coming soon.
      </p>
      {/* Add more sections or details as needed */}
    </div>
  );
};
