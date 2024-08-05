import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewsState, Article } from '../Components/interfaces';
import { fetchNewsAPIOrg, fetchGuardianAPI, fetchNYTAPI } from './api';
import { fetchNewsWithThrottle, shuffleArray } from '../utils/fetchUtils';

// Initial state of the news slice
const initialState: NewsState = {
  articles: [],
  isLoading: true,
  error: ''
};

// Types for category and category mapping
type Category = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';

interface CategoryMapping {
  newsAPIOrg: string;
  guardianAPI: string;
  nytAPI: string;
}

// Mapping for categories to API-specific strings
const categoryMappings: Record<Category, CategoryMapping> = {
  general: { newsAPIOrg: 'general', guardianAPI: 'news', nytAPI: 'general' },
  business: { newsAPIOrg: 'business', guardianAPI: 'business', nytAPI: 'business' },
  entertainment: { newsAPIOrg: 'entertainment', guardianAPI: 'arts', nytAPI: 'arts' },
  health: { newsAPIOrg: 'health', guardianAPI: 'health', nytAPI: 'health' },
  science: { newsAPIOrg: 'science', guardianAPI: 'science', nytAPI: 'science' },
  sports: { newsAPIOrg: 'sports', guardianAPI: 'sport', nytAPI: 'sports' },
  technology: { newsAPIOrg: 'technology', guardianAPI: 'technology', nytAPI: 'technology' }
};

// Create a utility type for the category mapping keys
type CategoryMappingKeys = 'newsAPIOrg' | 'guardianAPI' | 'nytAPI';

// Utility function to map source to the corresponding API key
const getCategoryMapping = (source: string, categoryFeed: Category): string => {
  const sourceToKey: Record<string, CategoryMappingKeys> = {
    'NewsAPI': 'newsAPIOrg',
    'The Guardian': 'guardianAPI',
    'NYT': 'nytAPI'
  };

  const key = sourceToKey[source];
  if (key) {
    return categoryMappings[categoryFeed][key] || 'general';
  }

  return 'general'; // Default value if source is not found
};

// Fetch articles from all selected sources
const fetchArticlesFromSources = async (
  sources: string[],
  selectedCategoriesFeed: Category[],
  searchTerm: string,
  authors: string[],
  rateLimitMs: number
): Promise<Article[]> => {
  const articles: Article[] = [];
  const fetchPromises: Promise<void>[] = [];

  const sourceToFetchFunc: Record<string, (searchTerm: string, category: string, authors: string[]) => Promise<Article[]>> = {
    'NewsAPI': fetchNewsAPIOrg,
    'The Guardian': fetchGuardianAPI,
    'NYT': fetchNYTAPI
  };

  for (const source of sources) {
    const fetchFunc = sourceToFetchFunc[source];
    if (fetchFunc) {
      selectedCategoriesFeed.forEach(categoryFeed => {
        const categoryMapping = getCategoryMapping(source, categoryFeed);

        fetchPromises.push(
          fetchNewsWithThrottle(
            fetchFunc,
            searchTerm,
            categoryMapping,
            authors,
            articles,
            rateLimitMs
          )
        );
      });
    }
  }

  await Promise.all(fetchPromises);

  return shuffleArray(articles);
};

// Define the parameters type for the thunk
interface FetchNewsParams {
  searchTerm: string;
  selectedCategoriesFeed: Category[];
  sources: string[];
  authors: string[];
}

// Thunk to get news articles based on provided parameters
export const getNewsArticles = createAsyncThunk(
  'news/getNewsArticles',
  async (params: FetchNewsParams, thunkAPI) => {
    try {
      const { searchTerm, selectedCategoriesFeed, sources, authors } = params;
      const rateLimitMs = 1500; // Adjust based on API rate limit

      const articles = await fetchArticlesFromSources(
        sources,
        selectedCategoriesFeed,
        searchTerm,
        authors,
        rateLimitMs
      );

      return articles;
    } catch (error) {
      // Provide a more descriptive error message if necessary
      return thunkAPI.rejectWithValue((error as Error).message || 'Something went wrong!');
    }
  }
);

// Slice for managing news state
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsArticles.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getNewsArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(getNewsArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default newsSlice.reducer;
