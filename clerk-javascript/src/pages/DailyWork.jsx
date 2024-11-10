import { useState, useEffect } from "react";
import "../App.css";

// Simulated profile data and experience needed per level
const profileData = {
  avatar: "/images/cat-avatar.jpg", // Ensure this path is correct
  name: "Mochi",
  breed: "England Short Hair",
};

const DailyWork = () => {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0); // Track experience points
  const [tasks, setTasks] = useState([]);
  const [taskCompletion, setTaskCompletion] = useState({}); // To track which tasks have been completed

  // Simulated task data
  const initialTasks = [
    { id: 1, text: "Feed the cat at 10 AM", time: "10:00 AM" },
    { id: 2, text: "Feed the cat at 4 PM", time: "4:00 PM" },
    {
      id: 3,
      text: "Play with the cat at least two times a day",
      time: "Flexible",
    },
    { id: 4, text: "Walk the cat at least once a week", time: "Flexible" },
    { id: 5, text: "Keep the cat calm", time: "Ongoing" },
  ];

  // Handle task completion and experience progression
  const handleCheckboxChange = (taskId) => {
    // Mark the task as completed for today
    if (!taskCompletion[taskId]) {
      setTaskCompletion((prevCompletion) => ({
        ...prevCompletion,
        [taskId]: true,
      }));

      setExperience((prevExperience) => prevExperience + 10); // Each task gives 10 experience points
      if (experience >= 100) {
        setLevel(level + 1); // Level up when experience reaches 100
        setExperience(0); // Reset experience after leveling up
      }
    }
  };

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  // Calculate the percentage for the progress bar
  const experiencePercentage = (experience / 100) * 100; // 100 experience points per level

  return (
    <div className="daily-work-container bg-gray-100 min-h-screen p-6">
      {/* Profile Section (Avatar, Name, and Level) */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={profileData.avatar}
            alt="Cat Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-bold">{profileData.name}</div>
          <div className="text-lg text-gray-700">
            Breed: {profileData.breed}
          </div>
        </div>
      </div>

      {/* Level and Progress Section */}
      <div className="level-progress-section mb-6 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Level: {level}</div>
          <div className="text-sm text-gray-500">
            Experience: {experience}/100
          </div>
        </div>
        <div className="mt-4">
          <div className="text-lg font-medium mb-2">Progress</div>
          <div className="relative w-full h-4 bg-gray-200 rounded-full">
            <div
              className="absolute h-4 bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${experiencePercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {experiencePercentage}% to next level
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="task-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="task-text text-lg font-semibold">{task.text}</div>
            <div className="task-time text-sm text-gray-500">{task.time}</div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={taskCompletion[task.id] || false}
                onChange={() => handleCheckboxChange(task.id)}
                disabled={taskCompletion[task.id]}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWork;
