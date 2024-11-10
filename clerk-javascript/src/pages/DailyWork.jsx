import React from "react";

export default function DailyWork({ profileData }) {
  const generateRoutine = () => {
    const { age, weight, breed, dietaryNeeds, medicalConditions } = profileData;
    return {
      feeding: `Best feeding time: ${
        age < 1 ? "3 times a day" : "twice a day"
      }`,
      attention: "Your pet needs at least 1-2 hours of playtime",
      behavior: `${breed} is known to be friendly and needs regular training.`,
    };
  };

  const routine = generateRoutine();

  return (
    <div className="daily-work">
      <h2>Daily Work for Your Pet</h2>
      <ul>
        <li>
          <strong>Feeding:</strong> {routine.feeding}
        </li>
        <li>
          <strong>Attention:</strong> {routine.attention}
        </li>
        <li>
          <strong>Behavior:</strong> {routine.behavior}
        </li>
      </ul>
    </div>
  );
}
