import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ReviewForm from './ReviewForm';
import './ReviewForm.css';
import { deleteReview, getReview, fetchReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIdContext from '../../context/ReviewIdContext';
import ReviewerIdContext from '../../context/ReviewerIdContext';

const ReviewsModal = ({ listingId, reservationId, reviewed, reviewProp }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    closeModal();
  };



  // Deleting review
//   const reviewId = useContext(ReviewIdContext)
//   const reviewerId = useContext(ReviewerIdContext)

// debugger

  const clickDelete = (e) => {
    // console.log(reviewProp)
    e.preventDefault();
    dispatch(deleteReview(reviewProp.id));
  }

  return (
    <div>
      { reviewed ? 
        (<div> 
            <button>Update Review</button>
            <br></br>
            <br></br>
            <button type='submit' onClick={clickDelete}>Delete Review</button>
        </div>) :

      (<div>
        <button onClick={openModal}>Leave a Review</button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='review-modal' ariaHideApp={false}>
            <ReviewForm listingId={listingId} reservationId={reservationId} closeModal={handleFormSubmit}/>
            <button onClick={closeModal} className='close-review'>X</button>
        </Modal>
      </div>)
      }
    </div>
  );

// return (
//     <div>
//       <button onClick={openModal}>Leave a Review</button>
//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='review-modal'>
//         {formSubmitted ? (
//           <div className="form-submitted-message">
//             <p>Review submitted successfully!</p>
//             <button onClick={closeModal} className='close-review'>X</button>
//           </div>
//         ) : (
//           <div>
//               <ReviewForm listingId={listingId} reservationId={reservationId} closeModal={handleFormSubmit} />
//               <button onClick={closeModal} className='close-review'>X</button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
};

export default ReviewsModal;
