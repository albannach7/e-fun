import React from 'react';
import DataService from "../services/DataService";
import {Bar} from 'react-chartjs-2';

/**
 * Header component, displaying utility menu if user is signed in.
 */
export class ResultComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		DataService.getAllData(true).then(
			data => {
				const dataSet = data[this.props.match.params.id];
				this.setState(dataSet)
			}
		).catch(error => console.error(error));
	}

	render() {
		let data = [];
		const chartOptions = {
			scales: {
				fill: false,
				yAxes: [
					{
						labelString: 'tst',
						display: true,
						fill: false,
						gridLines: {
							display: true
						},
						ticks: {
							min: 0,
							max: 100,
							autoSkip: false
						}
					}
				],
				xAxes: [
					{
						gridLines: {
							borderDash: [15],
						},
						display: true,
						ticks: {
							autoSkip: false
						}
					}
				]
			}
		};

		if (this.state.compliance && this.state.compliance.tests) {
			const tests = this.state.compliance.tests;
			const [labels, percentages] = Object.keys(tests[0]).map(p => tests.map(i => i[p]));
			data = {
				labels: labels.map(label => label.replace(/([A-Z])/g, ' $1').replace(/^./, str =>str.toUpperCase())),
				datasets: [
					{
						label: 'Score',
						backgroundColor: 'rgba(105, 231, 105, 0.36)',
						borderColor: 'rgba(105, 231, 105, 0.5)',
						borderWidth: 1,
						hoverBackgroundColor: 'rgba(105, 231, 105, 0.7)',
						hoverBorderColor: 'rgba(105, 231, 105, 0.8)',
						data: percentages
					}
				]
			};
		}


		return <div>
			<h1>{this.state.name}</h1>
			{this.state.compliance && this.state.compliance.tests ?
				<Bar data={data} options={chartOptions}/> : 'No Test available'
			}
		</div>
	}
}
