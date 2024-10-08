export interface CreateProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  dob?: string;
  phone?: string;
  pin_code?: string;
  vehicle_type?: string;
  license?: Array<string>;
  vehicle_images?: Array<string>;
  app_version?: string;
}
