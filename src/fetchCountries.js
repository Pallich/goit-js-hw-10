export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    // return response.json();
    if (response.ok) {
      return response.json();
    } else return 'error';
  });

  // .then(data => console.log(data));
}
