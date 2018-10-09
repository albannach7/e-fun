import React from 'react';

/**
 * Header component, displaying utility menu if user is signed in.
 */
export class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);

		this.showUtilities = props.showUtilities;
	}

	render() {
		return <header>
			<div className="header">
				<h1>Hello</h1>
			</div>
		</header>;
	}
}
