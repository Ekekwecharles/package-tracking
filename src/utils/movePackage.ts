import { db, doc, getDoc, updateDoc } from "../firebase";
import { TrackingData } from "../types";

export const movePackage = async (trackingCode: string) => {
  const docRef = doc(db, "tracking", trackingCode);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  const data = docSnap.data() as TrackingData;
  const newProgress = data.progress + 0.01;
  if (newProgress > 1) return;

  const newLat = 40.7128 + (data.currentPosition.lat - 40.7128) * newProgress;
  const newLng = -74.006 + (data.currentPosition.lng - -74.006) * newProgress;

  await updateDoc(docRef, {
    currentPosition: { lat: newLat, lng: newLng },
    progress: newProgress,
  });
};
