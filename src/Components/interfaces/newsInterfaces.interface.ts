export interface Article {
  category: string;
  content: string | null;
  imageUrl: string;
  publicationDate: string;
  source: string;
  title: string;
  url: string;
}

export interface NewsState {
  articles: Article[];
  isLoading: boolean;
  error: string;
}