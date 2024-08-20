import iziToast from 'izitoast';

const MESSAGES = {
  info: 'Please enter a value in the search field!',
  // endOfSearch: `We're sorry, but you've reached the end of search results.`,
  warning:
    'Sorry, there are no images matching your search query. Please try again!',
  error:
    'Sorry, there are no connection to the server. Please try again later! ',
  exception:
    'Exception: We have some issue with connection. Please try again later! ',
};

const MESSAGES_BG_COLORS = {
  green: '#59a10d',
  orange: '#ffa000',
  red: '#ef4040',
};

function showInfoMessage(message, color) {
  iziToast.info({
    position: 'topRight',
    backgroundColor: `${color}`,
    message: `${message}`,
  });
}

export { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage };