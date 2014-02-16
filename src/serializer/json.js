/**
 * @class {JSONSerializer}
 */
Eg.JSONSerializer = Em.Object.extend({

	/**
	 * Converts the record given to a JSON representation where the ID
	 * and attributes are stored at the top level, and relationships
	 * are stored as strings (or arrays) in a `links` object.
	 *
	 * Note: Temporary IDs are not included in relationships
	 *
	 * @param {Model} record The record to serialize
	 * @param {Object} options Any options that were passed by the adapter
	 * @returns {Object} JSON representation of record
	 */
	serialize: function(record, options) {
		options = options || {};
		var json = {};

		if (options.includeId) {
			json.id = record.get('id');
		}

		record.constructor.eachAttribute(function(name, meta) {
			var type = Eg.AttributeType.attributeTypeForName(meta.type);
			json[name] = type.serialize(record.get(name));
		}, this);

		if (Em.get(record.constructor, 'relationships').length > 0) {
			json.links = {};
		}

		record.constructor.eachRelationship(function(name, meta) {
			var val = record.get(name);

			if (meta.kind === Eg.Model.HAS_MANY_KEY) {
				json.links[name] = val.filter(function(id) {
					return (!Eg.Model.isTemporaryId(id));
				});
			} else {
				if (val === null || Eg.Model.isTemporaryId(val)) {
					json.links[name] = null;
				} else {
					json.links[name] = val;
				}
			}
		});

		return json;
	},

	/**
	 * Extracts records from a JSON payload. The payload should follow
	 * the JSON API (http://jsonapi.org/format/) format for IDs.
	 *
	 * @param {Object} payload
	 * @param {Object} options Any options that were passed by the adapter
	 * @returns {Object} Normalized JSON Payload
	 */
	deserialize: function(payload, options) {
		var json = this._extract(payload);

		Em.keys(json).forEach(function(typeKey) {
			json[typeKey] = json[typeKey].map(function(record) {
				return this._deserializeSingle(typeKey, record);
			}, this).filter(function(item) { return !!item; });
		}, this);

		return json;
	},

	/**
	 * Takes the JSON payload and converts it halfway to normalized JSON.
	 * The records are all in the correct arrays, but the individual
	 * records themselves have yet to be deserialized.
	 *
	 * @param {Object} payload
	 * @returns {Object} Normalized JSON
	 * @private
	 */
	_extract: function(payload) {
		var json = (payload.hasOwnProperty('linked') ? this._extract(payload.linked) : {});

		Em.keys(payload).forEach(function(key) {
			if (key === 'linked' || key === 'meta') {
				return;
			}

			var typeKey = key.singularize();
			json[typeKey] = payload[key].concat(json[typeKey] || []);
		}, this);

		return json;
	},

	/**
	 * Deserializes individual records. First it converts the ID to a string.
	 * Then it extracts all attributes, making sure all required attributes
	 * exist, and no extras are found. It repeats the process for the,
	 * relationships only it converts all IDs to strings in the process.
	 *
	 * @param typeKey
	 * @param json
	 * @returns {null}
	 * @private
	 */
	_deserializeSingle: function(typeKey, json) {
		try {
			json = json || {};
			json.links = json.links || {};

			var model = this.get('store').modelForType(typeKey);
			var record = { id: json.id + '' };

			Eg.debug(function() {
				var attributes = model.get('attributes');
				var givenAttributes = new Em.Set(Em.keys(json));
				givenAttributes.removeObject(['id', 'links']);
				var extra = givenAttributes.without(attributes);

				if (extra.length > 0) {
					throw new Error('Your JSON contained extra attributes: ' + extra.toArray().join(','));
				}

				model.eachAttribute(function(name, meta) {
					if (!json.hasOwnProperty(name) && meta.isRequired) {
						throw new Error('Your JSON is missing the required `' + name + '` attribute.');
					}
				});
			});

			Em.keys(json).forEach(function(attribute) {
				if (attribute === 'id' || attribute === 'links') {
					return;
				}

				var meta = model.metaForAttribute(attribute);
				var type = Eg.AttributeType.attributeTypeForName(meta.type);
				record[attribute] = type.deserialize(json[attribute]);
			});

			Eg.debug(function() {
				var relationships = model.get('relationships');
				var givenRelationships = new Em.Set(Em.keys(json));
				givenRelationships.removeObject(['id', 'links']);
				var extra = givenRelationships.without(relationships);

				if (extra.length > 0) {
					throw new Error('Your JSON contained extra relationships: ' + extra.toArray().join(','));
				}

				model.eachRelationship(function(name, meta) {
					if (!json.links.hasOwnProperty(name) && meta.isRequired) {
						throw new Error('Your JSON is missing the required `' + name + '` relationship.');
					}
				});
			});

			Em.keys(json.links).forEach(function(relationship) {
				var meta = model.metaForRelationship(relationship);

				if (meta.kind === Eg.Model.HAS_MANY_KEY) {
					record[relationship] = json[relationship].map(function(id) {
						return '' + id;
					});
				} else {
					record[relationship] = '' + json[relationship];
				}
			});

			return record;
		} catch (e) {
			Eg.debug.warn(e);
			return null;
		}
	}
});