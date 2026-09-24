import { apiClient } from '../core/api/apiClient';
import { API_ENDPOINTS } from '../core/api/endpoints';
import { mockDelay } from '../mock/mockAdapter';
import companiesData from '../mock/data/companies.json';
import { BackendEnvelope } from '../core/types/api';
import { CreateCompanyPayload, CreateCompanyResult, CreatedCompany } from '../features/companies/companyTypes';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const inFlightRequests = new Map<string, Promise<unknown>>();

function shareInFlight<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const existing = inFlightRequests.get(key);
  if (existing) return existing as Promise<T>;
  const request = factory().finally(() => {
    if (inFlightRequests.get(key) === request) {
      inFlightRequests.delete(key);
    }
  });
  inFlightRequests.set(key, request);
  return request;
}

export const companyService = {
  async getCompanies(): Promise<CreatedCompany[]> {
    return shareInFlight('company-list', async () => {
      if (USE_MOCK) {
        const mapped = companiesData.map((company) => mapCreatedCompany(company));
        await mockDelay(mapped, 'Companies list retrieved');
        return mapped;
      }

      const envelope = await apiClient.get<unknown, BackendEnvelope<unknown>>(
        API_ENDPOINTS.PRACTICE_COMPANY.LIST
      );
      return extractCompanyList(unwrapCompanyData(envelope)).map((item) => mapCreatedCompany(item));
    });
  },

  async getCompanyById(id: string): Promise<CreatedCompany> {
    return shareInFlight(`company:${id}`, async () => {
      if (USE_MOCK) {
        const company = companiesData.find((item) => item.slug === id || item.id === id);
        if (!company) {
          throw { statusCode: 404, message: 'That company could not be found.', data: null, errors: null };
        }
        await mockDelay(company, 'Company detail retrieved');
        return mapCreatedCompany(company);
      }

      const envelope = await apiClient.get<unknown, BackendEnvelope<unknown>>(
        API_ENDPOINTS.PRACTICE_COMPANY.DETAILS(id)
      );
      const data = unwrapCompanyData(envelope);
      if (!data) {
        throw { statusCode: 404, message: 'That company could not be found.', data: null, errors: null };
      }
      return mapCreatedCompany(data);
    });
  },

  async createCompany(payload: CreateCompanyPayload): Promise<CreateCompanyResult> {
    return shareInFlight(`company-create:${payload.name.toLowerCase()}`, async () => {
      if (USE_MOCK) {
        const company = mapCreatedCompany({
          id: `company-${Date.now()}`,
          name: payload.name,
          websiteUrl: payload.websiteUrl,
          logoUrl: payload.logoUrl,
          description: payload.description,
          isActive: payload.isActive,
        });
        await mockDelay(company, 'Company created successfully');
        return { company, message: 'Company created successfully' };
      }

      const envelope = await apiClient.post<CreateCompanyPayload, BackendEnvelope<unknown>>(
        API_ENDPOINTS.PRACTICE_COMPANY.CREATE,
        payload
      );
      const data = unwrapCompanyData(envelope);
      const record = asRecord(envelope);
      return {
        company: mapCreatedCompany(data, payload),
        message: typeof record?.message === 'string' && record.message.trim()
          ? record.message.trim()
          : 'Company created successfully',
      };
    });
  },
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(value: unknown, fallback = ''): string {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function unwrapCompanyData(envelope: BackendEnvelope<unknown> | unknown): unknown {
  const record = asRecord(envelope);
  if (record && typeof record.statusCode === 'number' && record.statusCode >= 400) {
    throw envelope;
  }
  if (record && 'data' in record) {
    return record.data;
  }
  return envelope;
}

function extractCompanyList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const record = asRecord(payload);
  if (!record) return [];
  if (Array.isArray(record.data)) return record.data;
  if (Array.isArray(record.content)) return record.content;
  if (Array.isArray(record.companies)) return record.companies;
  return [];
}

function mapCreatedCompany(raw: unknown, fallback?: CreateCompanyPayload): CreatedCompany {
  const record = asRecord(raw) ?? {};
  const name = readString(record.name, fallback?.name ?? 'Company');
  const slug = readString(record.slug) || toSlug(name);
  const rounds = Array.isArray(record.rounds)
    ? record.rounds
        .map((round) => {
          const item = asRecord(round);
          if (!item) return null;
          const roundName = readString(item.name);
          if (!roundName) return null;
          return { name: roundName, description: readString(item.description) };
        })
        .filter((round): round is { name: string; description: string } => Boolean(round))
    : undefined;

  return {
    id: String(record.id ?? record.companyId ?? (slug || `company-${Date.now()}`)),
    name,
    slug,
    logo: readString(record.logoUrl ?? record.logo, fallback?.logoUrl ?? '') || undefined,
    description: readString(record.description, fallback?.description ?? '') || undefined,
    website: readString(record.websiteUrl ?? record.website, fallback?.websiteUrl ?? '') || undefined,
    industry: readString(record.industry) || undefined,
    isActive: record.isActive !== false,
    headquarters: readString(record.headquarters) || undefined,
    problemCount: typeof record.problemCount === 'number' ? record.problemCount : undefined,
    questionCount: typeof record.questionCount === 'number' ? record.questionCount : undefined,
    rounds,
  };
}
