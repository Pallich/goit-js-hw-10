import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(getData, DEBOUNCE_DELAY));

function getData(e) {
  if (refs.input.value === '') {
    clearResults();
    return;
  }

  const inputValue = e.target.value.trim();
  fetchCountries(inputValue).then(data => {
    if (data === 'error') {
      Notify.failure('Oops, there is no country with that name');
    } else if (data.length > 10) {
      console.log(data);
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length >= 2 && data.length < 10) {
      markupList(data);
    } else if (data.length == 1) {
      markupCard(data);
    }
  });
}

function markupList(data) {
  clearResults();

  const list = data
    .map(el => {
      return `<li class="coutry-item"><img src="${el.flags.svg}" alt="flag of ${el.name.official}" class="country-flag" width = "50px"><p class="country-name">${el.name.official}</p></li>`;
    })
    .join(' ');

  refs.list.innerHTML = list;
}

function markupCard(data) {
  clearResults();
  const dataCard = data[0];
  //   console.log(Object.values(dataCard.languages).join(', '));

  const card = `
  <div class="card-name">
    <img src="${dataCard.flags.svg}" alt="flag of ${
    dataCard.name.official
  }" class="card-flag" width = "80px"/>
      <p class="card-country">${dataCard.name.official}</p></div>
      <p class="card-capital"><span class="card-titles">Capital:</span> ${
        dataCard.capital
      }</p>
      <p class="card-popilation"><span class="card-titles">Population:</span> ${
        dataCard.population
      }</p>
      <p class="card-languages"><span class="card-titles">Languages:</span> ${Object.values(
        dataCard.languages
      ).join(', ')}</p>`;
  refs.card.innerHTML = card;
  //   console.log(card);
}

function clearResults() {
  refs.list.innerHTML = '';
  refs.card.innerHTML = '';
}
