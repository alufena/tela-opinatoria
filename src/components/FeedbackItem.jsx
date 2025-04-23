import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import Card from './shared/Card';
import PropTypes from 'prop-types';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close">
        <FaTimes onClick={() => deleteFeedback(item.id)} color="red" />
      </button>
      <button onClick={() => editFeedback(item)} className="edit">
        <FaEdit color="red" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

Card.defaultProps = {
  reverse: false,
};

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
