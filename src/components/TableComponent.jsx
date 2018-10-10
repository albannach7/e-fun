import React from 'react';
import {Link} from "react-router-dom";
import DataService from '../services/DataService'


/** Assets **/
import Sainsburys from '../assets/sainsburys.jpg';
import Asda from '../assets/asda.png';
import Wilko from '../assets/wilko.png';
import Morrisons from '../assets/morrisons.png';

export class TableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			labels: [],
			rows: [],
		};
		this.renderLabels = [
			'name', 'retailer', 'netQuantity', 'price'
		];
		this.logos = {
			'Sainsburys': Sainsburys,
			'Asda': Asda,
			'Wilko': Wilko,
			'Morrisons': Morrisons
		};

		this.filterResults = this.filterResults.bind(this);
	}

	componentDidMount() {
		DataService.getAllData().then(
			data => {
				let [labels, rows] = [
					Object.keys(data[0]).map(label => (this.renderLabels.indexOf(label) > -1 ?
						<th key={label}>{label}</th> : false)
					), this.generateTableBody(data)
				];
				this.setState({labels: labels, rows: rows, data: data});
			}).catch(error => console.error(error));
	}

	generateTableBody(data){
		return data.map((row, index) => {
			return (
				<tr key={index}>
					{
						this.renderLabels.map(label => <td key={label} data-mobile-header={label}>
							{
								this.processValues(label, row[label], index)
							}

						</td>)
					}
				</tr>
			)
		})
	}

	processValues(label, value, index) {
		switch (label) {
			case 'name':
				return <Link to={`result/${index}`}>{value}</Link>;
			case 'retailer':
				return this.logos[value] ? <img className="retailer-logo" src={this.logos[value]} alt={value}/> :
					<b>{value}</b>;
			case 'netQuantity':
				return <span className={'weight'}><span className="fas fa-weight-hanging"></span>{value}</span>;
			default:
				return value
		}
	}

	filterResults(event){
		const filtered = this.state.data.filter(entry => {
			let found = 0;
			this.renderLabels.map(label => {
				if (entry && entry[label] && entry[label].toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
					found++
				}
				return true;
			});
			return found > 0;
		});
		const result = this.generateTableBody(filtered);
		this.setState({rows : result});
	}

	render() {
		return <div className={'data-table'}>
			<label htmlFor="search">Filter Results</label>
			<input type={'text'} id={'search'} className={'data-filer'} onChange={this.filterResults}/>
			<table>{this.state.labels ? (<thead>
				<tr>{this.state.labels}</tr>
				</thead>)
				: ''}
				<tbody>
				{this.state.rows}
				</tbody>
			</table>
		</div>;
	}
}
