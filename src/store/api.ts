import { Article } from "../Components/interfaces";

// Utility function to fetch and handle API responses
const fetchAPI = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch data from API');
    }
    return data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    throw error; // Rethrow error for handling in caller functions
  }
};

// Utility function to filter articles based on authors
const filterArticlesByAuthors = (articles: any[], authors: string[], authorField: string, category: string, source: string): Article[] => {
  return articles.filter((article: any) => {
    const authorList = article[authorField];
    return authors.some(author => authorList?.includes(author));
  }).map((article: any) => formatArticle(article, category, source));
};

// Utility function to format articles
const formatArticle = (article: any, category?: string, source?: string): Article => ({
  title: article.title || article.headline?.main || article.webTitle,
  content: article.content || article.abstract || article.fields?.trailText,
  imageUrl: article.urlToImage || article.fields?.thumbnail || article?.multimedia?.length && `https://www.nytimes.com/${article.multimedia[0].url}`,
  url: article.url || article.webUrl,
  category: category || article.category || article.sectionId,
  publicationDate: article.publicationDate || article.pub_date || article.fields?.firstPublicationDate,
  source: source || 'Unknown'
});

// Fetch articles from NewsAPI.org
export const fetchNewsAPIOrg = async (searchTerm: string, category: string, authors: string[]): Promise<Article[]> => {
  const apiKey = process.env.REACT_APP_NEWS_API_ORG_KEY;
  const url = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&category=${category}&apiKey=${apiKey}`;

  try {
    const data = await fetchAPI(url);
    const articles = data.articles;

    if (authors.length) {
      return filterArticlesByAuthors(articles, authors, 'author', category, 'NewsAPI');
    }

    return articles.map((article: any) => formatArticle(article, category, 'NewsAPI'));
  } catch (error: any) {
    console.error('Error fetching articles from NewsAPI.org:', error.message);
    return [];
  }
};

// Fetch articles from The Guardian API
export const fetchGuardianAPI = async (searchTerm: string, category: string, authors: string[]): Promise<Article[]> => {
  const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
  const url = `https://content.guardianapis.com/search?q=${searchTerm}&section=${category}&api-key=${apiKey}&show-fields=all`;

  try {
    const data = await fetchAPI(url);
    const articles = data.response.results;

    if (authors.length) {
      return filterArticlesByAuthors(articles, authors, 'fields.byline', category, 'The Guardian');
    }

    return articles.map((article: any) => formatArticle(article, category, 'The Guardian'));
  } catch (error: any) {
    console.error('Error fetching articles from The Guardian API:', error.message);
    return [];
  }
};

// Fetch articles from NYT API
export const fetchNYTAPI = async (searchTerm: string, category: string, authors: string[]): Promise<Article[]> => {
  const apiKey = process.env.REACT_APP_NYT_API_KEY;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&fq=news_desk:("${category}") ${authors.map(author => `byline:("${author}")`).join(' OR ')}&api-key=${apiKey}`;

  try {
    const data = await fetchAPI(url);
    const articles = data.response.docs;

    return articles.map((article: any) => formatArticle(article, category, 'NYT'));
  } catch (error: any) {
    console.error('Error fetching articles from The NYT API:', error.message);
    return [];
  }
};
