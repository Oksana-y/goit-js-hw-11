import axios from 'axios';
const API_KEY = '32800349-9138a81e452acda0408289a03';
function getPhoto(name, page) {
  return axios.get(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=40&safesearch=true&key=${API_KEY}`
  );
}
export default getPhoto;
