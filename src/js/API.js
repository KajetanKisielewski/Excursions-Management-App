class API {

    constructor() {
        this.excursionUrl = 'http://localhost:3000/excursions';
        this.orderUrl = 'http://localhost:3000/orders';
    }

    _fetch(options, path , additionalPath = '') {

        const url = path + additionalPath;

        return fetch( url , options )
            .then( resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp)
            })
    }

    loadData() {
        const options = { method: 'GET' };
        return this._fetch(options , this.excursionUrl);
    }

    addData(data) {

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };

       return this._fetch(options , this.excursionUrl);
    }

    delateData(id) {
        const options = { method: 'DELETE' };
        return this._fetch(options, this.excursionUrl , `/${id}`);
    }

    updateData(data, id) {

        const options = {
            method: 'PUT',
            body: JSON.stringify( data ),
            headers: { 'Content-Type': 'application/json' }
        };

        return this._fetch(options, this.excursionUrl , `/${id}`);
    }

    updateOrder(data) {

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };

        return this._fetch(options, this.orderUrl);
    }
}

export default API;