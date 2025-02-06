import { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Update: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");

  const updateCoordinates = async () => {
    if (!trackingCode || !lat || !lng) {
      alert("Please enter a tracking code and valid coordinates.");
      return;
    }

    try {
      const docRef = doc(db, "tracking", trackingCode);
      await updateDoc(docRef, {
        currentPosition: { lat: parseFloat(lat), lng: parseFloat(lng) },
      });

      alert("Coordinates updated successfully!");
      setTrackingCode("");
      setLat("");
      setLng("");
    } catch (error) {
      console.error("Error updating coordinates:", error);
      alert("Failed to update coordinates.");
    }
  };

  return (
    <div>
      <h2>Update Package Coordinates</h2>
      <input
        type="text"
        placeholder="Tracking Code"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />
      <button onClick={updateCoordinates}>Update</button>
    </div>
  );
};

export default Update;
