import { Reviews } from '../types/review';

export const reviews: Reviews = [
  {
    id: 1,
    user: {
      id: 13,
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://9.react.pages.academy/static/avatar/4.jpg',
    },
    rating: 3,
    comment: 'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
    date: '2022-01-31T15:13:26.370Z',
  },
  {
    id: 2,
    user: {
      id: 16,
      isPro: true,
      name: 'Mollie',
      avatarUrl: 'https://9.react.pages.academy/static/avatar/7.jpg',
    },
    rating: 4,
    comment: 'Home is amazing. Its like staying in a museum.The rooms, furnishings and artworks are incredible.The views of My Vesuvius',
    date: '2022-01-31T15:13:26.370Z',
  },
];


