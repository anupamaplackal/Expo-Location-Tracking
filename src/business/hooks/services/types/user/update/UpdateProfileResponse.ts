export interface UpdateProfileResponse {
  message: string;
  userProfile: UserProfile;
}
export interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  pin_code: string;
  email: string;
  license?: string[] | null;
  vehicle_images?: [];
  app_version: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  vehicle_type: string;
}
