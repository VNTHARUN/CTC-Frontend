import { apiClient } from '../core/api/apiClient';
import { API_ENDPOINTS } from '../core/api/endpoints';
import { mockDelay } from '../mock/mockAdapter';
import companiesData from '../mock/data/companies.json';
import problemsData from '../mock/data/problems.json';
import { ApiResponse } from '../core/types/api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const companyService = {
  async getCompanies(search?: string): Promise<ApiResponse<typeof companiesData>> {
    if (USE_MOCK) {
      let filtered = [...companiesData];
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter((c) => c.name.toLowerCase().includes(query) || c.industry.toLowerCase().includes(query));
      }
      return mockDelay(filtered, 'Companies list retrieved');
    }
    return apiClient.get(API_ENDPOINTS.COMPANIES.LIST, { params: { search } });
  },

  async getCompanyBySlug(slug: string): Promise<ApiResponse<typeof companiesData[0] | null>> {
    if (USE_MOCK) {
      const company = companiesData.find((c) => c.slug === slug || c.id === slug) || null;
      return mockDelay(company, company ? 'Company detail retrieved' : 'Company not found');
    }
    return apiClient.get(API_ENDPOINTS.COMPANIES.DETAILS(slug));
  },

  async getCompanyProblems(companyName: string): Promise<ApiResponse<typeof problemsData>> {
    if (USE_MOCK) {
      const companyProblems = problemsData.filter((p) =>
        p.companies.some((c) => c.toLowerCase() === companyName.toLowerCase())
      );
      return mockDelay(companyProblems, 'Company problems retrieved');
    }
    return apiClient.get(API_ENDPOINTS.COMPANIES.PROBLEMS(companyName));
  },
};
