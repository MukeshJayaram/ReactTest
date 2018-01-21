//* To exempt the issue with local storage in jest
var localStorageMock = (function() {
	var store = {};
	return {
  	getItem: function(key) {
    	return store[key] || null;
		},
    setItem: function(key, value) {
    	store[key] = value.toString();
   	},
    clear: function() {
    	store = {};
		}
	};
})();
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});