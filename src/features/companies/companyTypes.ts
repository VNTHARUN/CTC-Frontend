export interface CreateCompanyPayload {
  id: null;
  name: string;
  websiteUrl: string | null;
  logoUrl: string | null;
  description: string | null;
  isActive: boolean;
}

export interface CreatedCompany {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  website?: string;
  industry?: string;
  isActive?: boolean;
  headquarters?: string;
  problemCount?: number;
  questionCount?: number;
  rounds?: Array<{ name: string; description: string }>;
}

export interface CreateCompanyResult {
  company: CreatedCompany;
  message: string;
}
