export interface TrackingData {
  code: string;
  destination: string;
  destinationCoords: { lat: number; lng: number };
  currentPosition: { lat: number; lng: number };
  startPosition: { lat: number; lng: number };
  progress: number;
}
