import {useState, ChangeEvent, FormEvent} from 'react';
import { Fragment } from 'react';
import { CommentLength, CommentRatingValue, RATINGS, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postComment } from '../../store/api-actions';
import { getPostCommentRequestStatus } from '../../store/comments/selectors';
import { getActiveRoomData } from '../../store/rooms/selectors';

type CommentState = {
  value: string
  error: boolean;
}
type RatingState = {
  value: number
  isChecked: boolean;
}

type CommentsStateProps = {
  comment: CommentState;
  rating: RatingState;
}

const initialFormState = {
  comment: {
    value: '',
    error: true,
  },
  rating: {
    value: 0,
    isChecked: false,
  },
};

export function CommentsForm(): JSX.Element {
  const currentRoom = useAppSelector(getActiveRoomData);
  const dispatch = useAppDispatch();
  const commentPostRequestStatus = useAppSelector(getPostCommentRequestStatus);

  const [formData, setFormData] = useState<CommentsStateProps>(initialFormState);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const rating = parseInt(value, 10);

    const isRatingValid = rating > CommentRatingValue.MinValue || rating <= CommentRatingValue.MaxValue;

    setFormData({
      ...formData,
      rating: {
        ...formData.rating,
        value: rating,
        isChecked: isRatingValid,
      }
    });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    const hasCommentEnoughLength = value.length >= CommentLength.MinLength && value.length <= CommentLength.MaxLength;

    setFormData({
      ...formData,
      comment: {
        ...formData.comment,
        value: value,
        error: !hasCommentEnoughLength,
      }
    });
  };

  const resetFormValue = () => setFormData(initialFormState);


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postComment({
      roomID: currentRoom?.id,
      rating: formData.rating.value,
      comment: formData.comment.value,
      onSuccess: resetFormValue
    }));
  };

  const isFormDisabled = commentPostRequestStatus === RequestStatus.Request;

  const isSubmitDisabled = !formData.rating.isChecked || formData.comment.error;

  const renderStars = RATINGS.map((rating) => (
    <Fragment key={`rating-${rating.rating}`}>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.rating}
        id={`${rating.rating}-stars`}
        type="radio"
        onChange={handleRatingChange}
        checked={rating.rating === formData.rating.value}
        disabled={isFormDisabled}
      />
      <label
        htmlFor={`${rating.rating}-stars`}
        className="reviews__rating-label form__rating-label"
        title={rating.title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </Fragment>
  ));


  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="comment">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderStars}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChange}
        value={formData.comment.value}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star"> rating </span> and describe your stay with at least
          <b className="reviews__text-amount"> 50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isFormDisabled}
        >
          {isFormDisabled ? 'Submiting...' : 'Submit'}
        </button>
      </div>
    </form>
  );

}
