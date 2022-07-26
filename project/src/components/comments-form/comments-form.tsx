import React, {useState, ChangeEvent} from 'react';
import { Fragment } from 'react';

type CommentFormType = {
  comment: string;
  rating: string;
}

type Ratings = {
  rating: number;
  title: string;
}

export function CommentsForm(): JSX.Element {
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

  const [formData, setFormData] = useState<CommentFormType>({
    comment: '',
    rating: '',
  });

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({...formData, [name]: value});
  };

  const hasCommentEnoughLength = formData.comment.length >= 50 && formData.comment.length <= 300;
  const isSubmitDisabled = hasCommentEnoughLength || formData.rating === '';

  const renderStars = ratings.map((rating, index) => (
    <Fragment key={`rating-${rating.rating}`}>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.rating}
        id={`${rating.rating}-stars`}
        type="radio"
        onChange={handleFormChange}
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


  return(
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="comment">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderStars}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormChange}
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
