class DataService {
	constructor() {
		this.data = [];
		this.baseUrl = 'http://localhost:3001';
	}

	getAllData(cached) {
		if (!cached || this.data.length === 0) {
			console.log('fresh');
			let url = `${this.baseUrl}/rows`;
			const base = this;
			return fetch(url)
				.then((resp) => resp.json())
				.then((data) => {base.data = data; return Promise.resolve(data)}, (error) => { return Promise.reject(error)})
		}
		else if(this.data.length > 0){
			return Promise.resolve(this.data)
		} else {
			return Promise.reject('No data present, use refresh to fetch');
		}
	}
}

export default new DataService();