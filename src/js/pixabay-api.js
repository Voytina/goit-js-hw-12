import axios from 'axios';

export async function getImages(q, p = 1) {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: '43216493-c3660c641d44e8d68813e69e4',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: p,
    per_page: 15,
  });

  const url = `${BASE_URL}?${params}`;
  try {
    const response = await axios(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
