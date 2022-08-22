import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCommentsData } from '../../store/ comment-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getRating, humanizeDate } from '../../utils';
import { CommentsForm } from '../comments-form/comments-form';

export function Comments(): JSX.Element {
  const comments = useAppSelector(getCommentsData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const renderComments = () => comments?.map((comment) => (
    <li key={comment.id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRating(comment.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={comment.date}>{humanizeDate(comment.date)}</time>
      </div>
    </li>
  ));

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments?.length}</span></h2>
      <ul className="reviews__list">
        {renderComments()}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth ?
        <CommentsForm/> :
        ''}
    </section>
  );
}
