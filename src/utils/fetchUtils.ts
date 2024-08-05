import { Article } from '../Components/interfaces';

export const shuffleArray = (array: Article[]): Article[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const fetchNewsWithThrottle = async (
  fetchFunc: (searchTerm: string, category: string, authors: string[]) => Promise<Article[]>,
  searchTerm: string,
  category: string,
  authors: string[],
  articles: Article[],
  rateLimitMs: number
): Promise<void> => {
  try {
    const response = await fetchFunc(searchTerm, category, authors);
    articles.push(...response);
    await delay(rateLimitMs); // Delay to respect rate limit
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};
