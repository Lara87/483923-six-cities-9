import { Offer } from '../../types/offer';
import { useParams } from 'react-router-dom';
import CommentSubmissionFormScreen from '../comment-submittion-form/comment-submission-form';
import ReviewCardList from '../review-card-list/review-card-list';
import MapCity from '../map/map';
import OfferCardListScreen from '../card-list/card-list';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import HeaderScreen from '../header/header';

function RoomPageScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const param = useParams();
  const paramId = Number(param.id);
  const offerItem: Offer = paramId ? offers.filter((currentOffer) => currentOffer.id === paramId)[0] : offers[0];
  const getCardMarkPremium = () => offerItem.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : '';
  const getUserStatus = () => offerItem.host.isPro ? 'Pro' : '';
  const [activeOffer, setActiveOffer] = useState(0);

  const handleHover = (id: number) => {
    const currentPoint = offers.find((offer) => offer.id === id);
    if (currentPoint) {
      setActiveOffer(currentPoint.id);
    }
  };
  return (
    <div className="page">
      <HeaderScreen />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offerItem.images.map((image) => (
                  <div key={offerItem.id} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {getCardMarkPremium()}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offerItem.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${offerItem.rating / 5 * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offerItem.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerItem.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offerItem.bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  {offerItem.maxAdults}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offerItem.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offerItem.goods.map((good) => (
                      <li key={good} className="property__inside-item">
                        {good}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offerItem.host.name}
                  </span>
                  <span className="property__user-status">
                    {getUserStatus()}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offerItem.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewCardList />
                <CommentSubmissionFormScreen />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <MapCity offers={offers.slice(0, 3)} activeOffer={activeOffer} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {<OfferCardListScreen offers={offers.slice(0, 3)} classNameCard='near-places__card place-card' onOfferHover={handleHover} />}
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
export default RoomPageScreen;
