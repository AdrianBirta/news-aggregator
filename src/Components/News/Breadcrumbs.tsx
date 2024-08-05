import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

interface BreadcrumbsProps {
  selectedCategoriesFeed: string[];
  sources: string[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ selectedCategoriesFeed, sources }) => (
  <section className='d-flex justify-content-between'>
    <Breadcrumb className='font'>
      <Breadcrumb.Item href="#">Categories</Breadcrumb.Item>
      {!selectedCategoriesFeed.length ?
        <Breadcrumb.Item active>World</Breadcrumb.Item>
        : <Breadcrumb.Item active>{selectedCategoriesFeed.join(', ')}</Breadcrumb.Item>
      }
    </Breadcrumb>
    <Breadcrumb>
      <Breadcrumb.Item href="#">Sources</Breadcrumb.Item>
      {sources.length ?
        <Breadcrumb.Item active>{sources.join(', ')}</Breadcrumb.Item>
        : <Breadcrumb.Item active>No Source Selected</Breadcrumb.Item>
      }
    </Breadcrumb>
  </section>
);

export default Breadcrumbs;
