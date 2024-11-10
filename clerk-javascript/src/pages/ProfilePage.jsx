import React, { useState, useEffect } from "react";
import "../App.css";

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

  // Calculate completion percentage
  useEffect(() => {
    const totalFields = Object.keys(profileData).length - 1; // Exclude avatar
    const filledFields = Object.values(profileData).filter(Boolean).length;
    setCompletionPercentage(Math.round((filledFields / totalFields) * 100));
  }, [profileData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newData) => {
    setProfileData(newData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="avatar-section">
        <div className="avatar-container">
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${
                profileData.avatar || "default-avatar.png"
              })`,
            }}
          ></div>
        </div>
        <div className="basic-info">
          <h2>{profileData.name || "Unnamed"}</h2>
          <p>{profileData.breed || "Breed not specified"}</p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${completionPercentage}%` }}>
          {completionPercentage}%{" "}
          {completionPercentage === 100 ? "Complete" : ""}
        </div>
      </div>

      {!isEditing ? (
        <div className="profile-info">
          <div className="info-column">
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
          <div className="info-column">
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
          <button onClick={handleEdit}>Edit Profile</button>
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
    <div className="edit-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Avatar</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Breed</label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <label>Weight</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />

        <label>Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />

        <label>Dietary Needs</label>
        <input
          type="text"
          name="dietaryNeeds"
          value={formData.dietaryNeeds}
          onChange={handleChange}
        />

        <label>Medical Conditions</label>
        <input
          type="text"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
        />

        <label>Vaccination Status</label>
        <select
          name="vaccinationStatus"
          value={formData.vaccinationStatus}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          <option value="Up-to-date">Up-to-date</option>
          <option value="Due Soon">Due Soon</option>
          <option value="Overdue">Overdue</option>
        </select>

        <label>Spayed/Neutered</label>
        <select
          name="spayedNeutered"
          value={formData.spayedNeutered}
          onChange={handleChange}
        >
          <option value="">Select option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
