import React from 'react';
import { Link } from "react-router-dom";
import DataService from '../services/DataService'


export class TableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			labels: [],
			rows: [],
		};
		this.renderLabels = [
			'name','retailer','price'
		]
	}

	componentDidMount() {
		DataService.getAllData().then(
			data => console.log(data)
		).catch(error => console.error(error));
		DataService.getAllData(false).then(
			data => console.log(data)
		).catch(error => console.error(error));


		let url = 'http://localhost:3001/rows';
		fetch(url)
			.then(resp => resp.json())
			.then(data => {
				let [labels, rows] =  [
					 Object.keys(data[0]).map(label => (this.renderLabels.indexOf(label) > -1 ? <td>{label}</td> : '')
					),
					data.map((row, index) => {
						return (
							<tr key={index}>
								{
									this.renderLabels.map(label => <td>
										{ this.renderLabels.indexOf(label) === 0 ?
											(<Link to={`result/${index}`}>{row[label]}</Link>) : row[label]
										}

									</td>)
								}
							</tr>
						)
					})
				]
				this.setState({labels: labels, rows: rows});
			})
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
