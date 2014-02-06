(function() {
	'use strict';

	var store = Eg.Store.create();

	var TestModel = store.createModel('test', {});

	module('Model ID Test');

	test('Existing ID loads correctly', function() {
		expect(1);

		var id = 'TEST_ID';
		var model = store.createRecord('test', { id: id });

		ok(model.get('id') === id);
	});

	test('New ID is created', function() {
		expect(1);

		var model = store.createRecord('test', {});

		ok(Eg.String.startsWith(model.get('id'), Eg.Model.temporaryIdPrefix));
	});

	test('A permanent ID cannot be changed', function() {
		expect(1);

		var model = store.createRecord('test', { id: '1' });

		throws(function() {
			model.set('id', '');
		});
	});

	test('A temporary ID can be changed to a permanent one', function() {
		expect(1);

		var model = store.createRecord('test', {});
		model.set('id', '');

		ok(model.get('id') === '');
	});
})();

