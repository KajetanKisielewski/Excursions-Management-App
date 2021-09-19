import './../css/client.css';

import API from './API';
import Excursions from './Excursions';

const init = () => {

    const api = new API();
    const excursions = new Excursions(api);

    excursions.loadExcursions();
    excursions.addExcursionsToOrder();
    excursions.delateExcursionFromOrder();
    excursions.orderExcursion();
}

document.addEventListener('DOMContentLoaded' , init)