import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { TrackingData } from "../types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ship icons (for blinking effect)
const shipIcon1 = new L.Icon({
  iconUrl: "ship-icon1.png",
  iconSize: [40, 40],
});

const shipIcon2 = new L.Icon({
  iconUrl: "ship-icon2.png",
  iconSize: [40, 40],
});

// Starting position icon
const startIcon = new L.Icon({
  iconUrl: "start-icon2.png",
  iconSize: [40, 40],
});

// Destination icon
const destinationIcon = new L.Icon({
  iconUrl: "destination-icon.png",
  iconSize: [30, 30],
});

const Track: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shipIcon, setShipIcon] = useState(shipIcon1);

  // Shipping routes
  const shippingRoutes: { [key: string]: [number, number][] } = {
    "South Korea": [
      [40.7128, -74.006], // New York
      [9.1012, -79.6952], // Panama Canal
      [1.3521, 103.8198], // **Port of Singapore
      [-8.3405, 115.092], // Bali, Indonesia
      [33.5892, 130.4017], // Fukuoka, Japan
      [35.1796, 129.0756], // Busan, South Korea
      [37.5665, 126.978], // Seoul, South Korea
    ],
    "United Kingdom": [
      [40.7128, -74.006], // New York
      [42.3601, -71.0589], // Boston
      [51.5074, -0.1278], // London
    ],
  };

  // Toggle ship icon every second (for blinking effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setShipIcon((prevIcon) =>
        prevIcon === shipIcon1 ? shipIcon2 : shipIcon1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchTrackingData = async () => {
    if (!trackingCode) return;
    setLoading(true);

    try {
      const docRef = doc(db, "tracking", trackingCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as TrackingData;
        setTrackingData(data);
        setRoute(shippingRoutes[data.destination] || []);
      } else {
        alert("Invalid Tracking Code");
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      alert(
        "Unable to load data. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Track Your Package</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Tracking Code"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />
        <button onClick={fetchTrackingData}>Track</button>
      </div>

      {loading && <p className="loading">Loading map...</p>}

      {trackingData && (
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={3}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Shipping Route */}
          {route.length > 0 && <Polyline positions={route} color="blue" />}

          {/* Starting Position */}
          {trackingData.startPosition && (
            <Marker
              position={[
                trackingData.startPosition.lat,
                trackingData.startPosition.lng,
              ]}
              icon={startIcon}
            >
              <Popup>Starting Position</Popup>
            </Marker>
          )}

          {/* Current Position (Blinking Ship Icon) */}
          <Marker
            position={[
              trackingData.currentPosition.lat,
              trackingData.currentPosition.lng,
            ]}
            icon={shipIcon}
          >
            <Popup>Package is here!</Popup>
          </Marker>

          {/* Destination */}
          <Marker
            position={[
              trackingData.destinationCoords.lat,
              trackingData.destinationCoords.lng,
            ]}
            icon={destinationIcon}
          >
            <Popup>Final destination</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Track;

// Port Name	Country	Latitude	Longitude
// New York Port	USA	40.7128	-74.0060
// Panama Canal	Panama	9.1012	-79.6952
// Port of Los Angeles	USA	33.7406	-118.2500
// Port of Yokohama	Japan	35.4540	139.6490
// Port of Busan	South Korea	35.1796	129.0756
// Incheon Port	South Korea	37.4563	126.7052
