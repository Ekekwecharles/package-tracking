import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { db, doc, getDoc } from "../firebase";
import { TrackingData } from "../types";
import "leaflet/dist/leaflet.css";

const Track: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const fetchTrackingData = async () => {
    if (!trackingCode) return;
    const docRef = doc(db, "tracking", trackingCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrackingData(docSnap.data() as TrackingData);
    } else {
      alert("Invalid Tracking Code");
    }
  };

  return (
    <div>
      <h2>Track Your Package</h2>
      <input
        type="text"
        placeholder="Enter Tracking Code"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
      />
      <button onClick={fetchTrackingData}>Track</button>

      {trackingData && (
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={3}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline
            positions={[
              [40.7128, -74.006],
              [
                trackingData.currentPosition.lat,
                trackingData.currentPosition.lng,
              ],
            ]}
          />
          <Marker
            position={[
              trackingData.currentPosition.lat,
              trackingData.currentPosition.lng,
            ]}
          />
        </MapContainer>
      )}
    </div>
  );
};

export default Track;
