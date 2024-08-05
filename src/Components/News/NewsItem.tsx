import { Card, Col } from "react-bootstrap";
import { Article } from "../interfaces";
import NoImageAvailable from '../../assets/No_Image_Available.jpg'; // Adjust the path as necessary

// Function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + '...'; // Truncate and add ellipsis
  }
  return text;
};

export default function NewsItem({ article }: { article: Article }) {
  const imageUrl = article.imageUrl || NoImageAvailable;

  return (
    <Col xs={6} className='mb-3'>
      <Card>
        <Card.Img
          src={imageUrl}
          variant='top'
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />

        <Card.Body>
          <Card.Title>{truncateText(article.title!!, 40)}</Card.Title>
          <Card.Text>{truncateText(article.content!!, 100)}</Card.Text>
          <Card.Link href={article.url} target="_blank" rel="noopener noreferrer">Read More</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  )
}
