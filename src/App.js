import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './App.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnDefs: [
				{
					headerName: 'Make',
					field: 'make',
					sortable: true,
					filter: true,
					checkboxSelection: true
				},
				{
					headerName: 'Model',
					field: 'model',
					sortable: true,
					filter: true
				},
				{
					headerName: 'Price',
					field: 'price',
					sortable: true,
					filter: true
				}
			]
		};
	}

	componentDidMount() {
		fetch('https://api.myjson.com/bins/15psn9')
			.then(result => result.json())
			.then(rowData => this.setState({ rowData }));
	}

	render() {
		this.onClick = e => {
			const selectedNodes = this.gridApi.getSelectedNodes();
			const selectedData = selectedNodes.map(node => node.data);
			const selectedDataStringPresentation = selectedData
				.map(node => node.make + ' ' + node.model)
				.join(', ');
			alert(`Selected nodes: ${selectedDataStringPresentation}`);
		};

		return (
			<div
				className='ag-theme-balham'
				style={{
					height: '500px',
					width: '650px'
				}}>
				<button onClick={this.onClick}>Get Selected Rows</button>
				<AgGridReact
					onGridReady={params => (this.gridApi = params.api)}
					columnDefs={this.state.columnDefs}
					rowData={this.state.rowData}
					rowSelection='multiple'></AgGridReact>
			</div>
		);
	}
}
