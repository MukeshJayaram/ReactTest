import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.js';
import axios from 'axios';
import SocketIO from 'socket.io';

const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname + '/'));
app.use(webpackMiddleware(compiler));

app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});
//* Initialize socket
const io = new SocketIO(app.listen(3000));

io.sockets.on('connection', function (socket) {
	var currencyFilter = "EUR";
	let intervalId = '';
  socket.on('filter',(filter)=>{
		clearInterval(intervalId);
		currencyFilter = filter;
    getApi(socket,filter);
		//* To refresh data every 5 mins
		intervalId = setInterval(() => 
    	getApi(socket,currencyFilter),5000*60
    );
	});
		
  socket.on("disconnect", () => {
		clearInterval(intervalId);
  	console.log("Client disconnected");
	});
});

//* Handler to trigger the API
const getApi = async (socket,filter='EUR') => {
	console.log("Socket Trigerred with filter as : " + filter);
  try {
  	const res = await axios.get("https://api.coinmarketcap.com/v1/ticker/?convert="+filter+"&limit=10");//Ideally should be loading this from appconfig
    socket.emit("fromApi", res.data);
  } catch (error) {
  	console.error("Error:",error );
  }
};