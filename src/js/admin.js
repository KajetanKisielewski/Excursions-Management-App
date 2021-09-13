import './../css/admin.css';

import API from './API';

import Excursions from './Excursions';


const init = () => {

    const api = new API();
    const excursions = new Excursions(api);

    excursions.loadExcursions();
    excursions.delateExcursion();
    excursions.updateExcursions();
    excursions.addExcursions();
}

document.addEventListener('DOMContentLoaded' , init);