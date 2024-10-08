export interface CreateProfileResponse {
  first_name?: string;
  last_name?: string;
  email?: string;
  dob?: string;
  pin_code?: string;
  vehicle_type?: string;
  license?: string[] | null;
  vehicle_images?: string[];
  app_version?: string;
}
