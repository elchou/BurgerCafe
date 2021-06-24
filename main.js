const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');
let menuOpen = false;
menuBtn.addEventListener('click', ()=> {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navigation.classList.add('show')

        menuOpen=true;
    }
    else {
        menuBtn.classList.remove('open');
        navigation.classList.remove('show');

      
        menuOpen=false;
    }
})
