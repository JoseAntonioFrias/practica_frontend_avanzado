export const slideIn = (element) => {
  element.animate(
    [
      {
        transform: 'translateX(-100px)'
      },
      {
        transform: 'translateX(0)'
      }
    ], {
      duration: 1000,
      iterations: Infinity,
      easing: 'ease'
    }
  );
};

export default {
  slideIn
};
