import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPracticeApiErrorMessage, practiceService } from '../../../services/practiceService';
import {
  PracticeCompanyItem,
  PracticeFilterKey,
  PracticeFilterOption,
  QuestionSearchPayload,
  ReferenceLibraryItem,
} from '../practiceTypes';

export interface PracticeFilterState {
  topicOptions: PracticeFilterOption[];
  difficultyOptions: PracticeFilterOption[];
  companyOptions: PracticeFilterOption[];
  qpfOptions: PracticeFilterOption[];
  optionLabels: Record<string, string>;
  dropdownLoading: Record<PracticeFilterKey, boolean>;
  searching: boolean;
  error: string | null;
}

const initialDropdownLoading: Record<PracticeFilterKey, boolean> = {
  topic: false,
  difficulty: false,
  company: false,
  qpf: false,
};

const initialState: PracticeFilterState = {
  topicOptions: [],
  difficultyOptions: [],
  companyOptions: [],
  qpfOptions: [],
  optionLabels: {},
  dropdownLoading: initialDropdownLoading,
  searching: false,
  error: null,
};

const optionKey = (group: PracticeFilterKey, id: string) => `${group}:${id}`;

function mapReferenceOptions(items: ReferenceLibraryItem[]): PracticeFilterOption[] {
  return items
    .filter((item) => item.id !== undefined && item.id !== null && item.refCode)
    .map((item) => ({
      value: String(item.id),
      label: item.refCode,
    }));
}

function mapCompanyOptions(items: PracticeCompanyItem[]): PracticeFilterOption[] {
  return items
    .filter((item) => item.id !== undefined && item.id !== null && item.name)
    .map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
}

function mergeOptionLabels(
  current: Record<string, string>,
  group: PracticeFilterKey,
  options: PracticeFilterOption[]
) {
  const next = { ...current };
  options.forEach((option) => {
    next[optionKey(group, option.value)] = option.label;
  });
  return next;
}

export const fetchPracticeTopics = createAsyncThunk(
  'practice/fetchTopics',
  async (_, { rejectWithValue }) => {
    try {
      return mapReferenceOptions(await practiceService.getReferenceLibrary('TOPIC'));
    } catch (error) {
      return rejectWithValue(getPracticeApiErrorMessage(error, 'Failed to load topics'));
    }
  }
);

export const fetchPracticeDifficulties = createAsyncThunk(
  'practice/fetchDifficulties',
  async (_, { rejectWithValue }) => {
    try {
      return mapReferenceOptions(await practiceService.getReferenceLibrary('DIFF'));
    } catch (error) {
      return rejectWithValue(getPracticeApiErrorMessage(error, 'Failed to load difficulties'));
    }
  }
);

export const fetchPracticeCompanies = createAsyncThunk(
  'practice/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      return mapCompanyOptions(await practiceService.getCompanies());
    } catch (error) {
      return rejectWithValue(getPracticeApiErrorMessage(error, 'Failed to load companies'));
    }
  }
);

export const fetchPracticeQpf = createAsyncThunk(
  'practice/fetchQpf',
  async (_, { rejectWithValue }) => {
    try {
      return mapReferenceOptions(await practiceService.getReferenceLibrary('QPF'));
    } catch (error) {
      return rejectWithValue(getPracticeApiErrorMessage(error, 'Failed to load QPF options'));
    }
  }
);

export const searchPracticeQuestions = createAsyncThunk(
  'practice/searchQuestions',
  async (payload: QuestionSearchPayload, { rejectWithValue }) => {
    try {
      return await practiceService.searchQuestions(payload);
    } catch (error) {
      return rejectWithValue(getPracticeApiErrorMessage(error, 'Failed to load questions'));
    }
  }
);

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPracticeTopics.pending, (state) => {
        state.dropdownLoading.topic = true;
        state.error = null;
      })
      .addCase(fetchPracticeTopics.fulfilled, (state, action) => {
        state.dropdownLoading.topic = false;
        state.topicOptions = action.payload;
        state.optionLabels = mergeOptionLabels(state.optionLabels, 'topic', action.payload);
      })
      .addCase(fetchPracticeTopics.rejected, (state, action) => {
        state.dropdownLoading.topic = false;
        state.topicOptions = [];
        state.error = (action.payload as string) || 'Failed to load topics';
      })
      .addCase(fetchPracticeDifficulties.pending, (state) => {
        state.dropdownLoading.difficulty = true;
        state.error = null;
      })
      .addCase(fetchPracticeDifficulties.fulfilled, (state, action) => {
        state.dropdownLoading.difficulty = false;
        state.difficultyOptions = action.payload;
        state.optionLabels = mergeOptionLabels(state.optionLabels, 'difficulty', action.payload);
      })
      .addCase(fetchPracticeDifficulties.rejected, (state, action) => {
        state.dropdownLoading.difficulty = false;
        state.difficultyOptions = [];
        state.error = (action.payload as string) || 'Failed to load difficulties';
      })
      .addCase(fetchPracticeCompanies.pending, (state) => {
        state.dropdownLoading.company = true;
        state.error = null;
      })
      .addCase(fetchPracticeCompanies.fulfilled, (state, action) => {
        state.dropdownLoading.company = false;
        state.companyOptions = action.payload;
        state.optionLabels = mergeOptionLabels(state.optionLabels, 'company', action.payload);
      })
      .addCase(fetchPracticeCompanies.rejected, (state, action) => {
        state.dropdownLoading.company = false;
        state.companyOptions = [];
        state.error = (action.payload as string) || 'Failed to load companies';
      })
      .addCase(fetchPracticeQpf.pending, (state) => {
        state.dropdownLoading.qpf = true;
        state.error = null;
      })
      .addCase(fetchPracticeQpf.fulfilled, (state, action) => {
        state.dropdownLoading.qpf = false;
        state.qpfOptions = action.payload;
        state.optionLabels = mergeOptionLabels(state.optionLabels, 'qpf', action.payload);
      })
      .addCase(fetchPracticeQpf.rejected, (state, action) => {
        state.dropdownLoading.qpf = false;
        state.qpfOptions = [];
        state.error = (action.payload as string) || 'Failed to load QPF options';
      })
      .addCase(searchPracticeQuestions.pending, (state) => {
        state.searching = true;
        state.error = null;
      })
      .addCase(searchPracticeQuestions.fulfilled, (state) => {
        state.searching = false;
      })
      .addCase(searchPracticeQuestions.rejected, (state, action) => {
        state.searching = false;
        state.error = (action.payload as string) || 'Failed to load questions';
      });
  },
});


export const getPracticeOptionLabel = (
  labels: Record<string, string>,
  group: PracticeFilterKey,
  id: string,
  fallback = id
) => labels[optionKey(group, id)] || fallback;

export default practiceSlice.reducer;
