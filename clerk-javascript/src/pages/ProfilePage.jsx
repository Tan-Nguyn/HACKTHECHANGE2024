import { useState, useEffect } from "react";
import profileIcon from "../assets/profile.svg"; // Use profile.svg as default avatar

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar: null,
    name: "Mochi",
    breed: "England Short hair",
    age: "",
    weight: "",
    size: "",
    dietaryNeeds: "",
    medicalConditions: "",
    vaccinationStatus: "",
    spayedNeutered: "",
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfileData = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfileData) {
      setProfileData(savedProfileData);
    }
  }, []);

  // Update completion percentage based on filled fields
  useEffect(() => {
    const totalFields = Object.keys(profileData).length - 1;
    const filledFields = Object.values(profileData).filter(Boolean).length;
    const percentage = Math.min(
      Math.round((filledFields / totalFields) * 100),
      100
    );
    setCompletionPercentage(percentage);
  }, [profileData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newData) => {
    setProfileData(newData);
    setIsEditing(false);
    localStorage.setItem("userProfile", JSON.stringify(newData));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-yellow-500 overflow-hidden">
          <img
            src={profileData.avatar || profileIcon} // Use profile.svg as default avatar
            alt="Cat Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{profileData.name || "Unnamed"}</h2>
          <p className="text-gray-600">
            {profileData.breed || "Breed not specified"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-600">
          Profile Completion
        </div>
        <div className="relative w-full h-4 bg-gray-300 rounded-full mt-1">
          <div
            className="absolute h-full bg-yellow-500 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {completionPercentage}% Complete
        </p>
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            {profileData.age && (
              <p>
                <strong>Age:</strong> {profileData.age}
              </p>
            )}
            {profileData.weight && (
              <p>
                <strong>Weight:</strong> {profileData.weight}
              </p>
            )}
            {profileData.size && (
              <p>
                <strong>Size:</strong> {profileData.size}
              </p>
            )}
          </div>
          <div>
            {profileData.dietaryNeeds && (
              <p>
                <strong>Dietary Needs:</strong> {profileData.dietaryNeeds}
              </p>
            )}
            {profileData.medicalConditions && (
              <p>
                <strong>Medical Conditions:</strong>{" "}
                {profileData.medicalConditions}
              </p>
            )}
            {profileData.vaccinationStatus && (
              <p>
                <strong>Vaccination Status:</strong>{" "}
                {profileData.vaccinationStatus}
              </p>
            )}
            {profileData.spayedNeutered && (
              <p>
                <strong>Spayed/Neutered:</strong> {profileData.spayedNeutered}
              </p>
            )}
          </div>
          <button
            onClick={handleEdit}
            className="col-span-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mt-4"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <EditForm
          profileData={profileData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

function EditForm({ profileData, onSave, onCancel }) {
  const [formData, setFormData] = useState(profileData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Avatar
        </label>
        <input
          type="file"
          className="mt-1 w-full"
          onChange={handleAvatarChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Breed</label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Weight
        </label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dietary Needs
        </label>
        <input
          type="text"
          name="dietaryNeeds"
          value={formData.dietaryNeeds}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Medical Conditions
        </label>
        <input
          type="text"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Vaccination Status
        </label>
        <select
          name="vaccinationStatus"
          value={formData.vaccinationStatus}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select status</option>
          <option value="Up-to-date">Up-to-date</option>
          <option value="Due Soon">Due Soon</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Spayed/Neutered
        </label>
        <select
          name="spayedNeutered"
          value={formData.spayedNeutered}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
