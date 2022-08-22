import React, {useState, ChangeEvent, FormEvent} from 'react';
import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postComment } from '../../store/api-actions';
import { getActiveRoomData } from '../../store/room-process/selectors';

type Ratings = {
  rating: number;
  title: string;
}

type CommentState = {
  value: string
  error: boolean;
  minSize: number;
  maxSize: number;
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
    minSize: 50,
    maxSize: 300,
  },
  rating: {
    value: 0,
    isChecked: false,
  },
};

export function CommentsForm(): JSX.Element {
  const currentCity = useAppSelector(getActiveRoomData);
  const dispatch = useAppDispatch();
  const ratings: Ratings[] = [
    {
      rating: 5,
      title: 'perfect',
    },
    {
      rating: 4,
      title: 'good',
    },
    {
      rating: 3,
      title: 'not bad',
    },
    {
      rating: 2,
      title: 'badly',
    },
    {
      rating: 1,
      title: 'terribly',
    },
  ];

  const [formData, setFormData] = useState<CommentsStateProps>(initialFormState);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const rating = parseInt(value, 10);

    const isRatingValid = rating > 0 || rating <= 5;

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
    const hasCommentEnoughLength = value.length >= formData.comment.minSize && value.length <= formData.comment.maxSize;

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
      roomID: currentCity?.id,
      rating: formData.rating.value,
      comment: formData.comment.value,
      onSuccess: resetFormValue
    }));
  };

  const isSubmitDisabled = !formData.rating.isChecked || formData.comment.error;

  const renderStars = ratings.map((rating) => (
    <Fragment key={`rating-${rating.rating}`}>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.rating}
        id={`${rating.rating}-stars`}
        type="radio"
        onChange={handleRatingChange}
        checked={rating.rating === formData.rating.value}
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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star"> rating </span> and describe your stay with at least
          <b className="reviews__text-amount"> 50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );

}
