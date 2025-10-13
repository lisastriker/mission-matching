export interface Job {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  maxPeople: number;
  status: 'open' | 'closed';
  image: string;
  date: string;
  details: string;
  skills: string[];
  languages: string[];
  organizationName: string;
  organizerId?: string;
  applications?: JobApplication[];
}

export interface Organization {
  name: string;
  email: string;
  organizationName: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  name: string;
  email: string;
  age?: number;
  expertise: string[];
  phoneNumber?: string;
  details: string;
  timestamp: number;
}

export interface Application {
  name: string;
  email: string;
  message: string;
}

export type ExpertiseArea = 'Family' | 'Religion' | 'Education' | 'Government' | 'Media' | 'Arts & Entertainment' | 'Business' | 'Healthcare';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'harvest worker' | 'harvest organizer';
  age?: number;
  expertise: ExpertiseArea[];
  phoneNumber?: string;
  attendedMissions: string[]; // Job IDs
  postedMissions: string[]; // Job IDs
}
