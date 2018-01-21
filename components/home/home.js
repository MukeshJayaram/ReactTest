//All the home components are here Grid, Chart, Selectbox,etc. Ideally I will keep most of them as standalone components and include them in home, but to save time and since this is a test I am going ahead with the easy way out.
import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import ReactTable from 'react-table';
import { currency } from '../../data/data';
import { clientSocketDetails } from '../../config/config';
import { connect } from 'react-redux';
import { socketData, selectData } from './homeActions';
import { MenuItem,Navbar, DropdownButton } from 'react-bootstrap';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//* CSS includes from external libs as well as assets
import 'react-table/react-table.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './home.css';
//Settings to listen the socket updates
const socket = socketIOClient(clientSocketDetails.url+':'+clientSocketDetails.port); 

//*Home class extending React Component
export class Home extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
    	data:[],
      cols:[],
      fav:localStorage.getItem('fav'),
      loading:true
		};
	}
	//* Method to handle the currency selection to update data in the grid
  handleClick(event) {
  	this.props.selectData(event)
    socket.emit('filter',event);
  }
	//*Initial API calls
	componentWillMount() {  
  	socket.on('connect',()=>{
    	socket.emit('filter','EUR');
		})
    socket.on("fromApi",apiData =>{
    	this.createColumns(apiData[0])
      this.props.socketData(apiData)
      this.setState({
      	data: this.props.geod,
      })
    });
	}
	//* To add favorite
	addFavourite(fav){
  	localStorage.setItem('fav',fav);
    this.setState({
     	fav:fav
    })
	}
	//* Create Columns dynamically
	createColumns(data){
  	let columns=[];
    for (let value of Object.keys(data)) {
			if(value=='id'){
      	columns.push({
        	Header: value,
          accessor: value,
          Cell: row => (
          	<a onClick={(evt)=>{this.addFavourite(row.value,row)}} className="favMarker" style={{color: row.value ==this.state.fav ? 'red' : '#000'}}>{row.value}</a>
          )
    		})
 			}else{
      	columns.push({
        	Header: value,
        	accessor: value,
       	})
      }
		}
    this.setState({
    	cols: columns
    })
    this.setState({
    	loading: false
    })
	}
  render() {
  	const { data } = this.state;
    const { cols } = this.state;
    const { loading } = this.state;
    return (
    	<div className="homeContainer"  xs={12} sm={6} md={10} lg={10}>
      	<Navbar collapseOnSelect>
        	<Navbar.Header>
          	<Navbar.Brand>
            	<a href="#brand">CoinMarketCap</a>
            </Navbar.Brand>
						<Navbar.Toggle />
         	</Navbar.Header>
      	</Navbar>
        <section className="container" >
					<DropdownButton
						bsStyle={'default'}
						title={"Currency"}
						onSelect={(evt)=>{this.handleClick(evt)}}
						id={`currency-selector`}>
							{currency.map((name, index)=>{
              	return <MenuItem eventKey={name} key={index} active={this.props.select==name}>{name}</MenuItem>
              })}
					</DropdownButton>
          <ReactTable
          	filterable={true}
            data={data}
            columns={cols}
            loading={loading}
            defaultSorted={[
            	{
              	id: "rank",
                desc: false
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"/>
								
					<div className="graphContainer">
						<ResponsiveContainer width="100%" height={500}>
							<LineChart data={data} margin={{top: 25, bottom: 25}}>
       					<XAxis dataKey="name"/>
       					<YAxis type={'string'} reversed={true}/>
       					<CartesianGrid strokeDasharray="3 3"/>
       					<Tooltip/>
       					<Legend />
       					<Line type="monotone" dataKey="price_usd"  stroke="#8884d8" activeDot={{r: 8}}/>
							</LineChart>
 						</ResponsiveContainer>
					</div>
        </section>
      </div>
    );
  }
}
// container for Home
const mapStateToProps = (state, ownProps) => ({  
    geod: state.geod,
    select:state.select
});

const mapDispatchToProps = {  
    socketData,
    selectData
};

const HomeAppContainer = connect(  
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeAppContainer;  