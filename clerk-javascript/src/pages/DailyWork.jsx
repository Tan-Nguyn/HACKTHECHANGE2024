import { useState, useEffect } from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

const profileData = {
  avatar: "/images/cat-avatar.jpg",
  name: "Mochi",
  breed: "England Short Hair",
};

const DailyWork = () => {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskCompletion, setTaskCompletion] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState({ text: "", time: "" });
  const [showCongrats, setShowCongrats] = useState(false);

  const initialTasks = [
    { id: 1, text: "Feed the cat at 10 AM", time: "10:00 AM" },
    { id: 2, text: "Feed the cat at 4 PM", time: "4:00 PM" },
    { id: 3, text: "Play with the cat", time: "Flexible" },
    { id: 4, text: "Walk the cat", time: "Flexible" },
    { id: 5, text: "Keep the cat calm", time: "Ongoing" },
  ];

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  const handleCheckboxChange = (taskId) => {
    if (!taskCompletion[taskId]) {
      setTaskCompletion({ ...taskCompletion, [taskId]: true });
      setExperience((prev) => prev + 10);
      if (experience + 10 >= 100) {
        setLevel(level + 1);
        setExperience(0);
      }

      // Check if all tasks are completed
      if (Object.keys(taskCompletion).length + 1 === tasks.length) {
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 4000); // Hide after 4 seconds
      }
    }
  };

  const handleNewTask = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowPopup(false);
    setNewTask({ text: "", time: "" });
  };

  const experiencePercentage = (experience / 100) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10 relative">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={profileData.avatar}
          alt="Cat Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <div className="text-xl font-bold">{profileData.name}</div>
          <div className="text-lg text-gray-700">
            Breed: {profileData.breed}
          </div>
        </div>
      </div>

      <div className="level-progress-section mb-6 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Level: {level}</div>
          <div className="text-sm text-gray-500">
            Experience: {experience}/100
          </div>
        </div>
        <div className="relative w-full h-6 bg-gray-200 rounded-full mt-4">
          <div
            className="absolute h-full bg-yellow-500 rounded-full"
            style={{ width: `${experiencePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="task-container grid grid-cols-1 gap-4 mb-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 rounded-lg shadow-md flex justify-between items-center ${
              taskCompletion[task.id]
                ? "bg-green-100 line-through text-gray-500"
                : "bg-white"
            }`}
          >
            <span className="text-lg font-semibold">{task.text}</span>
            <span className="text-sm text-gray-500">{task.time}</span>
            <button onClick={() => handleCheckboxChange(task.id)}>
              <FaCheckCircle
                className={`text-2xl ${
                  taskCompletion[task.id] ? "text-green-500" : "text-gray-300"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowPopup(true)}
        className="flex items-center space-x-2 text-yellow-500"
      >
        <FaPlusCircle /> <span>Add New Task</span>
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Add New Task</h2>
            <input
              type="text"
              placeholder="Task"
              value={newTask.text}
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            />
            <input
              type="time"
              placeholder="Time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleNewTask}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <div className="bg-white text-center px-8 py-4 rounded-lg shadow-lg animate-fade">
            <h1 className="text-3xl font-bold text-yellow-500">You did it!</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyWork;
