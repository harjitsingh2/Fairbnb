import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createReview } from '../../store/reviews';
import StarRating from './StarRating';
import './ReviewForm.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ReviewsForm = ({ listingId, reservationId, closeModal }) => {
  const { register, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const formRef = useRef();

  const [cleanliness, setCleanliness] = useState(1);
  const [communication, setCommunication] = useState(1);
  const [checkin, setCheckin] = useState(1);
  const [accuracy, setAccuracy] = useState(1);
  const [location, setLocation] = useState(1);
  const [value, setValue] = useState(1);
  const [body, setBody] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { listingId, reservationId, cleanliness, communication, checkin, accuracy, location, value, body }
    dispatch(createReview(payload));
    closeModal();
  };

  // logic for closing form when clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleRatingChange = (name, value) => {
    switch (name) {
      case 'cleanliness':
        setCleanliness(value);
        break;
      case 'communication':
        setCommunication(value);
        break;
      case 'checkin':
        setCheckin(value);
        break;
      case 'accuracy':
        setAccuracy(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'value':
        setValue(value);
        break;
      default:
        break;
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef} className='reviewForm'>


        <div>
          {/* <label>Cleanliness:</label> */}
          {/* <StarRating name="cleanliness" register={register} required onChange={(value) => handleRatingChange('rating', value)} /> */}
          <StarRating
            type="number"
            name="cleanliness"
            rating={cleanliness}
            handleChange={handleRatingChange}
            min="1"
            max="5"
            onChange={(e) => setCleanliness(e.target.value)} required
          />
          {errors.cleanliness && <span>Please enter a rating between 1 and 5.</span>}
        </div>
        <div>
          {/* <label>Communication:</label> */}
          <StarRating
            type="number"
            name="communication"
            rating={communication}
            handleChange={handleRatingChange}
            min="1"
            max="5"
            onChange={(e) => setCommunication(e.target.value)} required
          />
          {errors.communication && <span>Please enter a rating between 1 and 5.</span>}
        </div>
        <div>
          {/* <label>Checkin:</label> */}
          <StarRating
            type="number"
            name="checkin"
            rating={checkin}
            handleChange={handleRatingChange}
            min="1"
            max="5"
            onChange={(e) => setCheckin(e.target.value)} required
          />
          {errors.checkin && <span>Please enter a rating between 1 and 5.</span>}
        </div>
        <div>
          {/* <label>Accuracy:</label> */}
          <StarRating
            type="number"
            name="accuracy"
            rating={accuracy}
            handleChange={handleRatingChange}
            min="1"
            max="5"
            onChange={(e) => setAccuracy(e.target.value)} required
          />
          {errors.accuracy && <span>Please enter a rating between 1 and 5.</span>}
        </div>
        <div>
          {/* <label>Location:</label> */}
          <StarRating
            type="number"
            name="location"
            rating={location}
            handleChange={handleRatingChange}
            min="1"
            max="5"
            onChange={(e) => setLocation(e.target.value)} required
          />
          {errors.location && <span>Please enter a rating between 1 and 5.</span>}
        </div>
        <div>
          {/* <label>Value:</label> */}
          <StarRating
            type="number"
            name="value"
            rating={value}
            handleChange={handleRatingChange}
            min="1"
            max="5"
            onChange={(e) => setValue(e.target.value)} required
          />
          {errors.value && <span>Please enter a rating between 1 and 5.</span>}
        </div>
        <div>
          <div className='comment-container'>
            <label>Comments:</label>
            <textarea name="body" onChange={(e) => setBody(e.target.value)} />
          </div>
        </div>
        <button type="submit" className='review-button'>Submit</button>
      </form>
    </div>
  );
};

export default ReviewsForm;
