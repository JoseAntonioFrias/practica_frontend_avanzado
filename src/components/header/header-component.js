const updateTitle = (title) => {
  document.title=title;
};

export const updateHeader = ({ title, active }) => {
  updateTitle(title);
};

export default {
  updateHeader
};
