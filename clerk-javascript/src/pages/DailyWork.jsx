import React, { useState, useEffect } from "react";

export default function DailyWork() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("userProfile");
    if (data) {
      setProfileData(JSON.parse(data));
    }
  }, []);

  const generateDailyTasks = () => {
    if (!profileData) return [];
    const { age, breed, weight, dietaryNeeds } = profileData;

    const tasks = [
      `Feed ${profileData.name} based on dietary needs: ${
        dietaryNeeds || "Regular diet"
      }.`,
      `Ensure a proper walk schedule for a ${
        breed || "dog"
      } weighing ${weight} kg.`,
      age > 5
        ? "Consider a health check-up."
        : "Play with them to keep them active.",
    ];

    return tasks;
  };

  return (
    <div className="daily-work">
      <h2>Daily Routine Suggestions</h2>
      {profileData ? (
        <div>
          <h3>Suggestions for {profileData.name}</h3>
          <ul>
            {generateDailyTasks().map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No profile data available. Please create a profile first.</p>
      )}
    </div>
  );
}
