class ExcursionsAPI {

    constructor() {
        this.url = 'http://localhost:3000/excursions'
    }

    _fetch(options, additionalPath = '') {

        const url = this.url + additionalPath;

        return fetch( url , options )
            .then( resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp)
            })
    }

    loadData() {
        return this._fetch();
    }

    addData(data) {

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };

       return this._fetch(options);
    }

    delateData(id) {

        const options = { method: 'DELETE' };
        return this._fetch(options, `/${id}`);
    }

    updateData(data, id) {

        const options = {
            method: 'PUT',
            body: JSON.stringify( data ),
            headers: { 'Content-Type': 'application/json' }
        };

        return this._fetch(options, `/${id}`);
    }
}

export default ExcursionsAPI;