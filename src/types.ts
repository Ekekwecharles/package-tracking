export interface TrackingData {
  code: string;
  destination: string;
  currentPosition: {
    lat: number;
    lng: number;
  };
  progress: number;
}
