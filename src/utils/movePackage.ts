// import { db, doc, getDoc, updateDoc } from "../firebase";
// import { TrackingData } from "../types";

// export const movePackage = async (trackingCode: string) => {
//   const docRef = doc(db, "tracking", trackingCode);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) return;

//   const data = docSnap.data() as TrackingData;
//   const shippingRoutes: { [key: string]: [number, number][] } = {
//     "South Korea": [
//       [40.7128, -74.006], // New York
//       [9.1012, -79.6952], // Panama Canal
//       [-8.3405, 115.092], // Bali, Indonesia (for Pacific stop)
//       [33.5892, 130.4017], // Fukuoka, Japan
//       [35.1796, 129.0756], // Busan, South Korea
//       [37.5665, 126.978], // Seoul, South Korea
//     ],
//     "United Kingdom": [
//       [40.7128, -74.006],
//       [42.3601, -71.0589],
//       [51.5074, -0.1278],
//     ],
//   };

//   const route = shippingRoutes[data.destination] || [];
//   if (!route.length) return;

//   const currentIndex = Math.floor(data.progress * (route.length - 1));
//   if (currentIndex >= route.length - 1) return;

//   const nextIndex = currentIndex + 1;
//   const newProgress = data.progress + 0.02;
//   const newLat = route[nextIndex][0];
//   const newLng = route[nextIndex][1];

//   await updateDoc(docRef, {
//     currentPosition: { lat: newLat, lng: newLng },
//     progress: newProgress > 1 ? 1 : newProgress,
//   });
// };

import { db, doc, getDoc, updateDoc } from "../firebase";
import { TrackingData } from "../types";

export const movePackage = async (trackingCode: string) => {
  const docRef = doc(db, "tracking", trackingCode);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  const data = docSnap.data() as TrackingData;
  const shippingRoutes: { [key: string]: [number, number][] } = {
    "South Korea": [
      [40.7128, -74.006], // New York
      [9.1012, -79.6952], // Panama Canal
      [-8.3405, 115.092], // Bali, Indonesia
      [33.5892, 130.4017], // Fukuoka, Japan
      [35.1796, 129.0756], // Busan, South Korea
      [37.5665, 126.978], // Seoul, South Korea
    ],
    "United Kingdom": [
      [40.7128, -74.006],
      [42.3601, -71.0589],
      [51.5074, -0.1278],
    ],
  };

  const route = shippingRoutes[data.destination] || [];
  if (!route.length) return;

  const currentIndex = Math.floor(data.progress * (route.length - 1));
  if (currentIndex >= route.length - 1) return;

  const nextIndex = currentIndex + 1;
  const newProgress = data.progress + 0.02;
  const newLat = route[nextIndex][0];
  const newLng = route[nextIndex][1];

  await updateDoc(docRef, {
    currentPosition: { lat: newLat, lng: newLng },
    progress: newProgress > 1 ? 1 : newProgress,
  });
};
