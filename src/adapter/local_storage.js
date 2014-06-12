var forEach = Ember.ArrayPolyfills.forEach;

/**
 * Provides a way to persist model data to the browser's local storage.
 *
 * @class LocalStorageAdapter
 * @extends SynchronousAdapter
 * @constructor
 */
EG.LocalStorageAdapter = EG.SynchronousAdapter.extend({

	/**
	 * The value with which to prefix local storage keys.
	 * This helps separate the local storage entries made
	 * by this adapter from other data.
	 *
	 * @property keyPrefix
	 * @type String
	 * @default 'records'
	 * @final
	 */
	keyPrefix: 'records',

	retrieveRecord: function(typeKey, id) {
		var json = JSON.parse(localStorage[this.get('keyPrefix') + '.' + typeKey + '.' + id] || 'null');

		if (json) {
			return json;
		} else {
			throw new Error('The record `' + typeKey + ':' + id + '` wasn\'t found in localStorage.');
		}
	},

	retrieveRecords: function(typeKey, query) {
		Em.assert('The LocalStorageAdapter doesn\'t support queries by default.', !query);

		var record;
		var records = [];

		for (var key in localStorage) {
			if (localStorage.hasOwnProperty(key)) {
				if (EG.String.startsWith(key, this.get('keyPrefix') + '.' + typeKey)) {
					record = JSON.parse(localStorage(key) || 'null');

					if (record) {
						records.push(record);
					}
				}
			}
		}

		return records;
	},

	modifyRecords: function(updates) {
		forEach.call(updates, function(update) {
			update.oldData = localStorage[this.get('keyPrefix') +  '.' + update.typeKey + '.' + update.id];
		}, this);

		try {
			forEach.call(updates, function(update) {
				if (update.data) {
					localStorage[this.get('keyPrefix') + '.' + update.typeKey + '.' + update.id] = update.data;
				} else {
					delete localStorage[this.get('keyPrefix') + '.' + update.typeKey + '.' + update.id];
				}
			}, this);
		} catch (e) {
			forEach.call(updates, function(update) {
				localStorage[this.get('keyPrefix') + '.' + update.typeKey + '.' + update.id] = '';
			}, this);

			forEach.call(updates, function(update) {
				localStorage[this.get('keyPrefix') + '.' + update.typeKey + '.' + update.id] = update.oldData;
			}, this);

			throw e;
		}
	},

	/**
	 * Clears all records from the local storage.
	 *
	 * @method clearData
	 */
	clearData: function() {
		var keyPrefix = this.get('keyPrefix');

		forEach.call(Em.keys(localStorage), function(key) {
			if (EG.String.startsWith(key, keyPrefix)) {
				delete localStorage[key];
			}
		});
	}
});