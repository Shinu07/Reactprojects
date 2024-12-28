import { GoStarFill } from "react-icons/go";
import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function App({ noOfStars = 10 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

// behaviour / interaction of mouse with stars
  const handleStarInteraction=(index,type)=>{
    if(isSubmitted) return;
  if(type === "enter") setHover(index)
  if(type === "leave") setRating(hover)
  }


//handle user action for "reset" and "submit"
  const handleAction = (type) =>{
    if(type === "reset"){
      setRating(0);
      setHover(0);
      setIsSubmitted(false);
    }else if (type === "submit"){
      setIsSubmitted(true)
      alert(`You rated: ${rating} stars`);
    }
  };
  return (
    <div className="star-rating">
      <div className="stars-container">
        {[...Array(noOfStars)].map((_, idx) => (
          <GoStarFill
            key={idx + 1}
            className={idx + 1 <= (hover || rating) ? 'active' : 'inactive'}
            onClick={() => handleStarInteraction(idx + 1, 'click')}
            onMouseEnter={() => handleStarInteraction(idx + 1, 'enter')}
            onMouseLeave={() => handleStarInteraction(idx + 1, 'leave')}
            size={50}
          />
        ))}
      </div>

      <div className="button-container">
        <button onClick={() => handleAction('reset')}>Reset</button>
        <button onClick={() => handleAction('submit')}>Submit</button>
      </div>
      
      {isSubmitted && <div className="rating-message">Your submitted rating: {rating} stars</div>}
    </div>
  );
}

App.propTypes = {
  noOfStars: PropTypes.number
};

export default App;
