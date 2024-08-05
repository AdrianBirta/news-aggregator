import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsArticles } from '../../store/newsSlice';
import { AppDispatch } from '../../store/store';
import NewsItem from './NewsItem';
import { Article } from '../interfaces/newsInterfaces.interface';
import CustomPagination from '../CustomPagination';
import Filters from './Filters';
import Breadcrumbs from './Breadcrumbs';

const NewsList: React.FC<{
  searchTerm: string;
  selectedCategoriesFeed: ('general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology')[];
  sources: string[];
  authors: string[];
}> = ({ searchTerm, selectedCategoriesFeed, sources, authors }) => {

  const { articles, isLoading, error } = useSelector((store: any) => store.news);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([...selectedCategoriesFeed]);
  const [selectedSources, setSelectedSources] = useState<string[]>([...sources]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    dispatch(getNewsArticles({ searchTerm, selectedCategoriesFeed, sources, authors }));
  }, [dispatch, searchTerm, selectedCategoriesFeed, sources, authors]);

  // Update selectedCategories when selectedCategoriesFeed changes
  useEffect(() => {
    setSelectedCategories([...selectedCategoriesFeed]);
  }, [selectedCategoriesFeed]);

  useEffect(() => {
    const updatedFilteredArticles = articles.filter((article: Article) => {
      const publicationDate = new Date(article.publicationDate);
      const isWithinDateRange = (!startDate || publicationDate >= new Date(startDate)) &&
        (!endDate || publicationDate <= new Date(endDate));
      return selectedCategories.includes(article.category as 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology') &&
        selectedSources.includes(article.source) &&
        isWithinDateRange;
    });

    setFilteredArticles(updatedFilteredArticles);
  }, [articles, selectedCategories, selectedSources, startDate, endDate]);

  const handleCategoryChange = (category: string) => {
    const lowerCaseCategory = category.toLowerCase() as 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';
    setSelectedCategories(prevCategories =>
      prevCategories.includes(lowerCaseCategory)
        ? prevCategories.filter(item => item !== lowerCaseCategory)
        : [...prevCategories, lowerCaseCategory]
    );
  };

  const handleSourceChange = (source: string) => {
    setSelectedSources(prevSources =>
      prevSources.includes(source)
        ? prevSources.filter(item => item !== source)
        : [...prevSources, source]
    );
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'startDate') {
      if (endDate && new Date(value) > new Date(endDate)) {
        setDateError('Start date cannot be later than end date.');
      } else {
        setStartDate(value);
        setDateError('');
      }
    }
    if (name === 'endDate') {
      if (startDate && new Date(value) < new Date(startDate)) {
        setDateError('End date cannot be earlier than start date.');
      } else {
        setEndDate(value);
        setDateError('');
      }
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      {searchTerm.length ? (
        <>
          <h5>Results</h5>
          <Breadcrumbs selectedCategoriesFeed={selectedCategoriesFeed} sources={sources} />
          {articles.length ? (
            <Filters
              categoriesList={[...selectedCategoriesFeed]}
              sourcesList={[...sources]}
              selectedCategories={selectedCategories}
              selectedSources={selectedSources}
              startDate={startDate}
              endDate={endDate}
              dateError={dateError}
              handleCategoryChange={handleCategoryChange}
              handleSourceChange={handleSourceChange}
              handleDateChange={handleDateChange}
            />
          ) : null}
        </>
      ) : (
        <>
          <h5 className='mb-3'>All News</h5>
          <Breadcrumbs selectedCategoriesFeed={selectedCategoriesFeed} sources={sources} />
        </>
      )}

      <CustomPagination articles={searchTerm ? filteredArticles : articles} pageSize={4}>
        {currentArticles => (
          <Row>
            {currentArticles.map((article: Article) => (
              <NewsItem key={article.url + article.title + article.publicationDate} article={article} />
            ))}
          </Row>
        )}
      </CustomPagination>
    </Container>
  );
};

export default NewsList;
