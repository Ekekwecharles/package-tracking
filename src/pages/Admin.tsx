import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const destinations: { [key: string]: { lat: number; lng: number } } = {
  "South Korea": { lat: 37.5665, lng: 126.978 },
  "United Kingdom": { lat: 51.5074, lng: -0.1278 },
  Japan: { lat: 35.682839, lng: 139.759455 },
  Germany: { lat: 52.520008, lng: 13.404954 },
  Iraq: { lat: 30.0534, lng: 47.9376 },
  Peru: { lat: -12.05, lng: -77.15 },
};

const Admin: React.FC = () => {
  const [destination, setDestination] = useState<string>("");
  const [trackingCode, setTrackingCode] = useState<string>("");

  const generateTrackingCode = async () => {
    if (!destination || !destinations[destination]) {
      alert("Select a valid destination");
      return;
    }

    const newCode =
      "TRK" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setTrackingCode(newCode);

    await setDoc(doc(db, "tracking", newCode), {
      code: newCode,
      destination,
      destinationCoords: destinations[destination],
      currentPosition: { lat: 40.7128, lng: -74.006 },
      startPosition: { lat: 40.7128, lng: -74.006 }, // New York
      progress: 0,
    });

    alert("Tracking Code Generated: " + newCode);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <option value="">Select Destination</option>
        {Object.keys(destinations).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button onClick={generateTrackingCode}>Generate Tracking Code</button>
      {trackingCode && <p>Tracking Code: {trackingCode}</p>}
    </div>
  );
};

export default Admin;
