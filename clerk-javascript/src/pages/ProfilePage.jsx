import React, { useState } from "react";
import "../App.css";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Buddy",
    breed: "Golden Retriever",
    age: "3",
    weight: "30",
    size: "Medium",
    dietaryNeeds: "Low-fat diet",
    medicalConditions: "None",
    vaccinationStatus: "Up-to-date",
    spayedNeutered: "Yes",
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      <div className="avatar-container">
        <input
          type="file"
          id="avatar"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar">
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${avatar || "default-avatar.png"})`,
            }}
          ></div>
        </label>
      </div>

      {!isEditing ? (
        <div className="profile-info">
          <h2>Pet Profile</h2>
          <p>
            <strong>Name:</strong> {profileData.name}
          </p>
          <p>
            <strong>Breed:</strong> {profileData.breed}
          </p>
          <p>
            <strong>Age:</strong> {profileData.age}
          </p>
          <p>
            <strong>Weight:</strong> {profileData.weight}
          </p>
          <p>
            <strong>Size:</strong> {profileData.size}
          </p>
          <p>
            <strong>Dietary Needs:</strong> {profileData.dietaryNeeds}
          </p>
          <p>
            <strong>Medical Conditions:</strong> {profileData.medicalConditions}
          </p>
          <p>
            <strong>Vaccination Status:</strong> {profileData.vaccinationStatus}
          </p>
          <p>
            <strong>Spayed/Neutered:</strong> {profileData.spayedNeutered}
          </p>
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="edit-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
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
          required
        />

        <label>Weight</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <label>Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        />

        <label>Dietary Needs</label>
        <input
          type="text"
          name="dietaryNeeds"
          value={formData.dietaryNeeds}
          onChange={handleChange}
          required
        />

        <label>Medical Conditions</label>
        <input
          type="text"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          required
        />

        <label>Vaccination Status</label>
        <select
          name="vaccinationStatus"
          value={formData.vaccinationStatus}
          onChange={handleChange}
          required
        >
          <option value="Up-to-date">Up-to-date</option>
          <option value="Due Soon">Due Soon</option>
          <option value="Overdue">Overdue</option>
        </select>

        <label>Spayed/Neutered</label>
        <select
          name="spayedNeutered"
          value={formData.spayedNeutered}
          onChange={handleChange}
          required
        >
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
