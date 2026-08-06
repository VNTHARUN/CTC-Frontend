import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '../../../services/dashboardService';
import dashboardData from '../../../mock/data/dashboard.json';

export interface DashboardState {
  data: typeof dashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: dashboardData,
  loading: false,
  error: null,
};

export const fetchDashboardOverview = createAsyncThunk(
  'dashboard/fetchOverview',
  async (_, { rejectWithValue }) => {
    try {
      const res = await dashboardService.getDashboardOverview();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch dashboard data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
