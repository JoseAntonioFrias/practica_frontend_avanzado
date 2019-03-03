
export const scrollTop = () => {
    document.getElementById('scroll-top').addEventListener('click', function () {
        document.documentElement.scrollTop = 0;
    })
};


export default {
    scrollTop
};