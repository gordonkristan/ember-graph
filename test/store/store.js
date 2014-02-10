(function() {
	'use strict';

	var typeKey = 'storeTest';

	var store;
	var records;

	var Adapter = Eg.Adapter.extend({

		createRecord: function(record) {
			var id = Eg.util.generateGUID();
			return Em.RSVP.Promise.resolve({ id: id, storeTest: [{ id: id }] });
		},

		findRecord: function(type, id) {
			return Em.RSVP.Promise.resolve({ storeTest: [records[id]] });
		},

		findMany: function(type, ids) {
			return Em.RSVP.Promise.resolve({
				storeTest: ids.map(function(id) {
					return records[id];
				})
			});
		},

		findAll: function(type) {
			return this.findMany(type, ['1', '2', '3', '4']);
		},

		updateRecord: function(record) {
			return Em.RSVP.Promise.resolve({ storeTest: [records[record.get('id')]] });
		},

		deleteRecord: function(record) {
			return Em.RSVP.Promise.resolve({});
		}
	});

	module('Store Test', {
		setup: function() {
			store = Eg.Store.create({
				adapter: Adapter,
				cacheTimeout: 60*1000
			});

			store.createModel('storeTest', {});

			records = {
				'1': { id: '1' },
				'2': { id: '2' },
				'3': { id: '3' },
				'4': { id: '4' }
			};
		}
	});

	test('The store initializes the adapter properly', function() {
		expect(2);

		ok(store.get('adapter') instanceof Adapter);
		ok(store.get('adapter.store') === store);
	});

	test('The store can load records properly', function() {
		expect(9);

		ok(store.hasRecord(typeKey, '1') === false);
		ok(store.hasRecord(typeKey, '2') === false);
		ok(store.hasRecord(typeKey, '4') === false);

		ok(store._loadRecord(typeKey, records[1]));
		ok(store._loadRecord(typeKey, records[2]));
		ok(store._loadRecord(typeKey, records[4]));

		ok(store.hasRecord(typeKey, '1') === true);
		ok(store.hasRecord(typeKey, '2') === true);
		ok(store.hasRecord(typeKey, '4') === true);
	});

	asyncTest('The store can find a single record properly', function() {
		expect(3);

		ok(store.hasRecord(typeKey, '1') === false);
		store.find(typeKey, '1').then(function(record) {
			start();
			ok(store.hasRecord(typeKey, '1') === true);
			ok(record.get('id') === '1');
		});
	});

	asyncTest('The store can load and find multiple records properly', function() {
		expect(4);

		store.find(typeKey, ['1', '2', '4']).then(function(resolvedRecords) {
			start();

			var set = new Em.Set(resolvedRecords);
			ok(Em.get(set, 'length') === 3);
			ok(store.hasRecord(typeKey, '1'));
			ok(store.hasRecord(typeKey, '2'));
			ok(store.hasRecord(typeKey, '4'));
		});
	});

	asyncTest('The store can find all records of a type properly', function() {
		expect(5);

		store.find(typeKey).then(function(resolvedRecords) {
			start();

			var set = new Em.Set(resolvedRecords);

			ok(Em.get(set, 'length') === 4);
			ok(store.hasRecord(typeKey, '1'));
			ok(store.hasRecord(typeKey, '2'));
			ok(store.hasRecord(typeKey, '3'));
			ok(store.hasRecord(typeKey, '4'));
		});
	});

	asyncTest('The store saves new records properly', function() {
		expect(5);

		var record = store.createRecord(typeKey, {});
		var tempId = record.get('id');

		ok(store.hasRecord(typeKey, tempId));

		var promise = store.saveRecord(record);

		ok(record.get('isSaving') === true);

		promise.then(function() {
			start();

			ok(!store.hasRecord(typeKey, tempId));
			ok(tempId !== record.get('id'));
			ok(store.hasRecord(typeKey, record.get('id')));
		});
	});

	asyncTest('The store deletes a record properly', function() {
		expect(5);

		var record;

		store.find(typeKey, '1').then(function(r) {
			record = r;
			var promise = record.destroy();

			start();
			ok(record.get('isDirty') === true);
			ok(record.get('isDeleted') === true);
			stop();

			return promise;
		}).then(function() {
			start();

			ok(!store.hasRecord(typeKey, '1'));
			ok(record.get('isDirty') === false);
			ok(record.get('isDeleted') === true);
		});
	});

	test('The store detects the overridden cacheTimeout properly', function() {
		expect(1);

		ok(store.cacheTimeout === 60*1000);
	});

	test('The store invalidates records in the cache after the timeout period', function() {
		expect(1);

		Date.setTime(5*60*1000, true);

		ok(store.hasRecord(typeKey, '1') === false);

		Date.resetTime();
	});
})();
