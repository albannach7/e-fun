import React from 'react';
import DataService from "../services/DataService";
import {Bar,Doughnut} from 'react-chartjs-2';

/**
 * Header component, displaying utility menu if user is signed in.
 */
export class ResultComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.chartStyles = {
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

		if (this.state.compliance && this.state.compliance.tests) {
			const tests = this.state.compliance.tests;
			const [labels, percentages] = Object.keys(tests[0]).map(p => tests.map(i => i[p]));
			data = {
				labels: labels.map(label => label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())),
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
			<a className={'back-button'} href={'/'}><i className={'fas fa-arrow-left'}/>Back</a>
			<div className={'row'}>
				<div className={'col-8'}><h2>Descriptions</h2>{this.state.description}</div>
				<div className={'col-4'}><h2>Ingredients</h2>{this.state.ingredients}</div>
			</div>
			<div className={'row'}>
				<h2 className={'align-center'}>Tests</h2>
				<div className={'col-8'}>
					{this.state.compliance && this.state.compliance.tests ?
						<Bar data={data} options={this.chartStyles}/> : 'No Test available'
					}
				</div>
				<div className={'col-4'}>
					{this.state.compliance && this.state.compliance.fields ?
						Object.entries(this.state.compliance.fields).map((field, key) =>
							<div className={'progress-bar'}>
								<label>{field[0]}</label>
								<progress max={100} value={field[1]}/>
							</div>

						) : 'No fields defined'}

				</div>
			</div>
		</div>
	}
}
