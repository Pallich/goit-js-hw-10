import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', debounce(getData, DEBOUNCE_DELAY));

function getData(e) {
  const inputValue = e.target.value.trim();
  fetchCountries(inputValue).then(data => console.log(data));
}
