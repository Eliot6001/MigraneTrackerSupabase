export interface Event {
  id?: string;
  created_at?: string; 
  updated_at?: string;
  user_id: string;
  date?: string | null; 
  duration?: number;
  Locations?: [number?];
  Symptoms?: [number?];
  Treatments?: [number?];
  count?: number;
}