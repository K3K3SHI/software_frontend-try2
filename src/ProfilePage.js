import React from "react";
import Header from "./Header";

function ProfilePage() {
  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>👤 Your Profile</h2>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            maxWidth: "400px",
          }}
        >
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Member since:</strong> 2025</p>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
