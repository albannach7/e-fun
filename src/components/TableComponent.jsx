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
			'name', 'retailer', 'price'
		];
		this.logos = {
			'Sainsburys' : Sainsburys,
			'Asda' : Asda,
			'Wilko' : Wilko,
			'Morrisons': Morrisons
		}
	}

	componentDidMount() {
		DataService.getAllData().then(
			data => {
				let [labels, rows] = [
					Object.keys(data[0]).map(label => (this.renderLabels.indexOf(label) > -1 ? <th>{label}</th> : '')
					),
					data.map((row, index) => {
						return (
							<tr key={index}>
								{
									this.renderLabels.map(label => <td key={label} data-mobile-header={label}>
										{
											this.renderLabels.indexOf(label) === 0 ?
											(
												<Link to={`result/${index}`}>{row[label]}</Link>) : this.logos[row[label]] ? <img className="retailer-logo" src={this.logos[row[label]]} alt={row[label]}/> : row[label]
										}

									</td>)
								}
							</tr>
						)
					})
				];
				this.setState({labels: labels, rows: rows});
			}).catch(error => console.error(error));
	}

	render() {
		return <table>
			{this.state.labels ? (
					<thead>
					<tr>
						{this.state.labels}
					</tr>
					</thead>
				)
				: ''}
			<tbody>
			{this.state.rows}
			</tbody>
		</table>;
	}
}
