import { useState } from "react";
import { db, addDoc, collection } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Admin: React.FC = () => {
  const [destination, setDestination] = useState<string>("");
  const [trackingCode, setTrackingCode] = useState<string>("");

  const generateTrackingCode = async () => {
    try {
      const newCode =
        "TRK" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setTrackingCode(newCode);

      await setDoc(doc(db, "tracking", newCode), {
        code: newCode,
        destination,
        currentPosition: { lat: 40.7128, lng: -74.006 },
        progress: 0,
      });

      alert("Tracking Code Generated: " + newCode);
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to save to Firebase. Check console.");
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        type="text"
        placeholder="Destination (e.g. South Korea)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={generateTrackingCode}>Generate Tracking Code</button>
      {trackingCode && <p>Tracking Code: {trackingCode}</p>}
    </div>
  );
};

export default Admin;
