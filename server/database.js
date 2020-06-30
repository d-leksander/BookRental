const books = [
  { id: 1, bname: 'Pan Tadeusz', author: 'Adam Mickiewicz', photo: 'https://cdn.bonito.pl/zdjecia/9/257774aedb99f4a0-pan-tadeusz.jpg', type: 'novel', count: 10, location: { lat: 50.062346, lng: 19.938464 }, reservations: [], rates: [], rate: 0 },
  { id: 2, bname: 'Hobbit', author: 'J.R.R. Tolkien', photo: 'https://a.allegroimg.com/s1024/0ccb2f/e71c694e4085b9abf5418dca4f1a', type: 'other', count: 6, location: { lat: 50.062346, lng: 19.938464 }, reservations: [], rates: [], rate: 0 },
  { id: 3, bname: 'Dzieje Polski', author: 'Andrzej Nowak', photo: 'https://image.ceneostatic.pl/data/products/30259460/i-dzieje-polski-tom-1-skad-nasz-rod.jpg', type: 'humanistic', count: 14, location: { lat: 50.062346, lng: 19.938464 }, reservations: [], rates: [], rate: 0 }
];

const users = [
  { name: 'admin', password: 'admin', role: 'manager', reservations: [] },
  { name: 'user', password: 'user', role: 'user', reservations: [] }
];

module.exports = { books, users };