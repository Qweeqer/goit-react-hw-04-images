const key = '28612573-96fa08825695f2b47097a163d';

export function requestFetch(name, page) {
  return fetch(
    `https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  ).then(respons => respons.json());
}
