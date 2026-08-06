import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { companyService } from '../../../services/companyService';
import companiesData from '../../../mock/data/companies.json';
import problemsData from '../../../mock/data/problems.json';

export interface CompanyState {
  companies: typeof companiesData;
  selectedCompany: (typeof companiesData)[0] | null;
  companyProblems: typeof problemsData;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
  companyProblems: [],
  loading: false,
  error: null,
};

export const fetchCompanies = createAsyncThunk(
  'companies/fetchList',
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      const res = await companyService.getCompanies(search);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch companies');
    }
  }
);

export const fetchCompanyBySlug = createAsyncThunk(
  'companies/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await companyService.getCompanyBySlug(slug);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch company detail');
    }
  }
);

export const fetchCompanyProblems = createAsyncThunk(
  'companies/fetchProblems',
  async (companyName: string) => {
    const res = await companyService.getCompanyProblems(companyName);
    return res.data;
  }
);

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanyBySlug.fulfilled, (state, action) => {
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyProblems.fulfilled, (state, action) => {
        state.companyProblems = action.payload;
      });
  },
});

export default companySlice.reducer;
