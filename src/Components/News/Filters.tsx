import React from 'react';
import { Accordion, Form } from 'react-bootstrap';

interface FiltersProps {
  categoriesList: string[];
  sourcesList: string[];
  selectedCategories: string[];
  selectedSources: string[];
  startDate: string;
  endDate: string;
  dateError: string;
  handleCategoryChange: (category: string) => void;
  handleSourceChange: (source: string) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categoriesList,
  sourcesList,
  selectedCategories,
  selectedSources,
  startDate,
  endDate,
  dateError,
  handleCategoryChange,
  handleSourceChange,
  handleDateChange
}) => (
  <Accordion defaultActiveKey="1" className='mb-3 outline-none'>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Filters</Accordion.Header>
      <Accordion.Body>
        <h5>Categories</h5>
        <Form className='d-flex flex-wrap mb-3'>
          {categoriesList.map(category => (
            <Form.Check
              key={category}
              type='checkbox'
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              className='mx-3'
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
          ))}
        </Form>

        <hr />

        <h5>Sources</h5>
        <Form className='d-flex flex-wrap mb-3'>
          {sourcesList.map(source => (
            <Form.Check
              key={source}
              type='checkbox'
              label={source}
              className='mx-3'
              checked={selectedSources.includes(source)}
              onChange={() => handleSourceChange(source)}
            />
          ))}
        </Form>

        <hr />

        <h5>Date Range</h5>
        <Form.Group className='d-flex flex-wrap mb-3'>
          <Form className='mx-3'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type='date'
              name='startDate'
              value={startDate}
              min="2010-01-01"
              onChange={handleDateChange}
            />
          </Form>
          <Form className='mx-3'>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type='date'
              name='endDate'
              value={endDate}
              min="2010-01-01"
              onChange={handleDateChange}
            />
          </Form>
          {dateError && <p className='text-danger'>{dateError}</p>}
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
);

export default Filters;
