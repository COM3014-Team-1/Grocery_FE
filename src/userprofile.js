import React, { useState, useEffect } from "react";
import "./userprofile.css";

const UserProfile = () => {
  const [user] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  /* Uncomment when backend is connected
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/user/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching the user data:", error);
      }
    };

    fetchUser();
  }, []);
  */

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-left">
          <div style={{ position: "relative" }}>
            <img src="https://via.placeholder.com/64" alt="Profile" />
            <span className="edit-icon" title="Edit Photo">
              <i className="fas fa-pen"></i>
            </span>
          </div>
          <div className="profile-info">
            <h2>Username</h2>
            <p>User email</p>
          </div>
        </div>
        <div className="back-arrow" title="Go Back">&#8592;</div>
      </div>

      <div className="form">
        <label><i className="fas fa-user"></i> Name</label>
        <div className="value">{user.name}</div>

        <label><i className="fas fa-envelope"></i> Email</label>
        <div className="value">{user.email}</div>

        <label><i className="fas fa-phone"></i> Phone</label>
        <div className="value">{user.phone}</div>

        <label><i className="fas fa-map-marker-alt"></i> Address</label>
        <div className="value">{user.address}</div>

        <label><i className="fas fa-city"></i> City</label>
        <div className="value">{user.city}</div>

        <label><i className="fas fa-mail-bulk"></i> Zip Code</label>
        <div className="value">{user.zip_code}</div>
      </div>

      <button className="save-btn">Save Change</button>
    </div>
  );
};

export default UserProfile;
