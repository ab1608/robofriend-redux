import React from 'react';
import {connect} from "react-redux";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox'
import ScrollBox from '../components/ScrollBox'
import ErrorBoundary from "../components/ErrorBoundary";
import '../App.css'

import {requestRobots, setSearchField} from "../actions";


/*
 The App is the only thing that can change the state.
 When all the state changes have been processed, it then passes
 down the information to the child components.
 It is now a "Smart" components. Smart components are made as classes
 and, they are known as Containers.

 Components that do not modify the state of other components are pure components.
 */

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		allRobots: state.requestRobots.allRobots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}


class App extends React.Component {


	componentDidMount() {
		this.props.onRequestRobots();
	}


	render() {
		const {searchField, onSearchChange, allRobots, isPending} = this.props;
		const filteredRobots = allRobots.filter(robot =>
			robot.name.toLowerCase().includes(searchField.toLowerCase()));

		if (isPending) {
			return <h1>Loading</h1>
		} else {
			return (
				<div className={'tc'}>
					<h1 className={'f1'}>RoboFriends</h1>
					<SearchBox searchChange={onSearchChange}></SearchBox>
					<ScrollBox>
						<ErrorBoundary>
							<CardList robots={filteredRobots}></CardList>
						</ErrorBoundary>
					</ScrollBox>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);