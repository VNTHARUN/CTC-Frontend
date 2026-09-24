import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { companyService } from '../../../services/companyService';
import problemsData from '../../../mock/data/problems.json';
import { CreateCompanyPayload, CreatedCompany } from '../companyTypes';
import { getCompanyErrorMessage } from '../utils/companyFeedback';

export interface CompanyState {
  companies: CreatedCompany[];
  selectedCompany: CreatedCompany | null;
  companyProblems: typeof problemsData;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
  detailError: string | null;
}

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
  companyProblems: [],
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
};

export const fetchCompanies = createAsyncThunk(
  'companies/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      return await companyService.getCompanies();
    } catch (err: unknown) {
      return rejectWithValue(getCompanyErrorMessage(err, 'Unable to load companies. Please try again.'));
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  'companies/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await companyService.getCompanyById(id);
    } catch (err: unknown) {
      return rejectWithValue(getCompanyErrorMessage(err, 'Unable to load this company. Please try again.'));
    }
  }
);

export const createCompany = createAsyncThunk(
  'companies/create',
  async (payload: CreateCompanyPayload, { rejectWithValue }) => {
    try {
      return await companyService.createCompany(payload);
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  }
);

function upsertDirectoryCompany(
  companies: CreatedCompany[],
  company: CreatedCompany
): CreatedCompany[] {
  const match = (item: CreatedCompany) =>
    String(item.id) === String(company.id) || item.name.toLowerCase() === company.name.toLowerCase();
  if (companies.some(match)) {
    return companies.map((item) => (match(item) ? { ...item, ...company } : item));
  }
  return [company, ...companies];
}

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    upsertCompany(state, action: PayloadAction<CreatedCompany>) {
      state.companies = upsertDirectoryCompany(state.companies, action.payload);
    },
    clearSelectedCompany(state) {
      state.selectedCompany = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        if (state.companies.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Unable to load companies. Please try again.';
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.detailLoading = false;
        state.selectedCompany = null;
        state.detailError = typeof action.payload === 'string' ? action.payload : 'Unable to load this company. Please try again.';
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies = upsertDirectoryCompany(state.companies, action.payload.company);
      });
  },
});

export const { upsertCompany, clearSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
