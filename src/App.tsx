import { Row, Col, Navbar, Form, FormControl, Container, FormCheck, Accordion } from 'react-bootstrap';
import './App.css';
import NewsList from './Components/News/NewsList';
import { useState } from 'react';
import useDebounce from './hooks/useDebounce';
import useWindowSize from './hooks/useWindowSize';

const App = () => {
  const categoriesList = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];
  const sourcesList = ['NewsAPI', 'The Guardian', 'NYT'];
  const authorsList = ['David Pogue', 'Paul Krugman', 'Akriti Anand', 'infobae', 'Jason Rodrigues', 'Stephen Moss', 'Charlie Phillips'];

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [selectedSources, setSelectedSources] = useState<string[]>(['NewsAPI', 'The Guardian']); // Array to hold selected sources
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]); // Array to hold selected authors
  const [selectedCategoriesFeed, setSelectedCategoriesFeed] = useState<('general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology')[]>(['general']);

  const windowSize = useWindowSize();

  const handleCategoryChange = (category: string) => {
    const lowerCaseCategory = category.toLowerCase() as 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';
    setSelectedCategoriesFeed((prevCategories) =>
      prevCategories.includes(lowerCaseCategory)
        ? prevCategories.filter((item) => item !== lowerCaseCategory)
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

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors(prevAuthors =>
      prevAuthors.includes(author)
        ? prevAuthors.filter(item => item !== author)
        : [...prevAuthors, author]
    );
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <Navbar bg='light' expand='lg' className='mb-4'>
        <Container>
          <Navbar.Brand href='/' className='fw-bold fs-4'>
            News App
          </Navbar.Brand>

          <Form onSubmit={handleSearch} className='d-flex w-100'>
            <FormControl
              type='text'
              placeholder='Search'
              className='me-2'
              name='search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={3} className='mb-4'>
            {windowSize.width <= 768 ? (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Personalize Your Feed</Accordion.Header>
                  <Accordion.Body>
                    <Form className='d-flex flex-column'>
                      <h6>Categories</h6>
                      <section className='d-flex flex-wrap'>
                        {categoriesList.map(category => (
                          <FormCheck
                            type='checkbox'
                            key={category}
                            className='me-2 mb-2'
                            label={category.charAt(0).toUpperCase() + category.slice(1)}
                            checked={selectedCategoriesFeed.includes(category as 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology')}
                            onChange={() => handleCategoryChange(category as 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology')}
                          />
                        ))}
                      </section>

                      <h6 className='mt-4'>Sources</h6>
                      <section className='d-flex flex-wrap'>
                        {sourcesList.map(source => (
                          <FormCheck
                            type='checkbox'
                            key={source}
                            label={source}
                            className='me-2 mb-2'
                            checked={selectedSources.includes(source)}
                            onChange={() => handleSourceChange(source)}
                          />
                        ))}
                      </section>

                      <h6 className='mt-4'>Authors</h6>
                      <section className='d-flex flex-wrap'>
                        {authorsList.map(author => (
                          <FormCheck
                            type='checkbox'
                            key={author}
                            label={author}
                            className='me-2 mb-2'
                            checked={selectedAuthors.includes(author)}
                            onChange={() => handleAuthorChange(author)}
                          />
                        ))}
                      </section>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ) : (
              <>
                <h5>Personalize Your Feed</h5>
                <Form className='d-flex flex-column'>
                  <h6>Categories</h6>
                  <section className='d-flex flex-wrap'>
                    {categoriesList.map(category => (
                      <FormCheck
                        type='checkbox'
                        key={category}
                        className='me-2 mb-2'
                        label={category.charAt(0).toUpperCase() + category.slice(1)}
                        checked={selectedCategoriesFeed.includes(category as 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology')}
                        onChange={() => handleCategoryChange(category as 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology')}
                      />
                    ))}
                  </section>

                  <h6 className='mt-4'>Sources</h6>
                  <section className='d-flex flex-wrap'>
                    {sourcesList.map(source => (
                      <FormCheck
                        type='checkbox'
                        key={source}
                        label={source}
                        className='me-2 mb-2'
                        checked={selectedSources.includes(source)}
                        onChange={() => handleSourceChange(source)}
                      />
                    ))}
                  </section>

                  <h6 className='mt-4'>Authors</h6>
                  <section className='d-flex flex-wrap'>
                    {authorsList.map(author => (
                      <FormCheck
                        type='checkbox'
                        key={author}
                        label={author}
                        className='me-2 mb-2'
                        checked={selectedAuthors.includes(author)}
                        onChange={() => handleAuthorChange(author)}
                      />
                    ))}
                  </section>
                </Form>
              </>
            )}
          </Col>

          <Col xs={12} md={9}>
            <NewsList
              searchTerm={debouncedSearchTerm}
              selectedCategoriesFeed={selectedCategoriesFeed}
              sources={selectedSources}
              authors={selectedAuthors}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
