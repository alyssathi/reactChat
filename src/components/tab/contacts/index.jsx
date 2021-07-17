import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

export function Contacts() {
  const { currentUser } = useAuth();

  return (
    <div>
      CONTACTS
      <div>
        <p>Your User ID: {currentUser.uid} </p>
      </div>
    </div>
  );
}
