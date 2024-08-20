import axios from 'axios';
import {
  MESSAGES,
  MESSAGES_BG_COLORS,
  showInfoMessage,
} from './message-izi.js';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '45418693-8ae3627eda45814ae2d20cf49';

export async function getGalleryData(queryValue, page) {
  const searchParams = {
    key: API_KEY,
    q: queryValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  try {
    const response = await axios.get('', { params: searchParams });
    return response.data;
  } catch (err) {
    if (err.response) {
      showInfoMessage(MESSAGES.error, MESSAGES_BG_COLORS.orange);
    } else {
      showInfoMessage(
        `${MESSAGES.exception} ERROR:  ${err.message}`,
        MESSAGES_BG_COLORS.orange
      );
    }
    return null;
  }
}
