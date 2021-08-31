import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';


const init = () => {
    console.log('admin');
    addExcursions()
}

const addExcursions = () => {

    const form = document.querySelector('.form');
    console.log(form);

    form.addEventListener('submit' , e => {
        e.preventDefault();

        console.log(e.currentTarget.elements)

        const { name , description , adultPrice , childrenPrice } = e.target.elements;

        const data = {
            name: name.value,
            description: description.value,
            adultPrice: adultPrice.value,
            childrenPrice: childrenPrice.value
        };

        console.log(data)
    })
}




document.addEventListener('DOMContentLoaded' , init)