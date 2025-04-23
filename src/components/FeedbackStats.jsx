import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  let average =
    feedback.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / feedback.length;
  average = average.toFixed(1).replace(/[.,]0$/, '');
  return (
    <div className="feedback-stats">
      <h4>
        {feedback.length} {feedback.length <= 1 ? 'análise' : 'análises'}
      </h4>
      <h4>Nota média {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

export default FeedbackStats;
