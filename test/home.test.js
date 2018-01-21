//* To test basic render of the Home component in the application, to prcoeed furrther I will have to use Enzyme and many detailed test cases etc.
import React from 'react';
import Home from '../components/home//home';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import { store } from '../redux';

//* To overcome the test issue with ResponsiveContainer for Recharts
function createNodeMock() {
	const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}
//* To check the rendering of the Home component
describe('Home', () => {
	test('Home component renders perfectly', () => {
  	const component = renderer.create(
    	<Provider store={store}>
				<Home/>
			</Provider>,
		 	{ createNodeMock }
		);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
	});
});