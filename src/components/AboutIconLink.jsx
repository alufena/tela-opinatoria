import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AboutIconLink({ text }) {
  return (
    <div className="about-link">
      <Link
        to={{
          pathname: '/about',
        }}
        style={{ textDecoration: 'none' }}
      >
        <span style={{ marginRight: '1px', cursor: 'pointer' }}>{text}</span>
        <FaQuestion size={30} />
      </Link>
    </div>
  );
}

export default AboutIconLink;
