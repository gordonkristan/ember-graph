(function() {

window.EmberGraph = {};
window.Eg = window.EmberGraph;

})();

(function() {

Eg.util = {
	generateGUID: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0; // jshint ignore:line
			var v = (c == 'x' ? r : (r&0x3|0x8)); // jshint ignore:line
			return v.toString(16);
		});
	},

	values: function(obj) {
		return Em.keys(obj).map(function(key) {
			return obj[key];
		});
	}
};

})();

(function() {

Eg.String = {
	startsWith: function(string, prefix) {
		return string.indexOf(prefix) === 0;
	},

	endsWith: function(string, suffix) {
		return string.indexOf(suffix, this.length - suffix.length) >= 0;
	},

	capitalize: function(string) {
		return string[0].toLocaleUpperCase() + string.substring(1);
	},

	decapitalize: function(string) {
		return string[0].toLocaleLowerCase() + string.substring(1);
	}
};

if (Em.EXTEND_PROTOTYPES === true || Em.EXTEND_PROTOTYPES.String) {
	String.prototype.startsWith = String.prototype.startsWith || function(prefix) {
		return Eg.String.startsWith(this, prefix);
	};

	String.prototype.endsWith = String.prototype.endsWith || function(suffix) {
		return Eg.String.endsWith(this, suffix);
	};

	String.prototype.capitalize = String.prototype.capitalize || function() {
		return Eg.String.capitalize(this);
	};

	String.prototype.decapitalize = String.prototype.decapitalize || function() {
		return Eg.String.decapitalize(this);
	};
}

})();

(function() {

/*
 I took the rules in this code from inflection.js, whose license can be found below.
 */

/*
 Copyright (c) 2010 Ryan Schuft (ryan.schuft@gmail.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

var uncountableWords = [
	'equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'moose', 'deer', 'news'
];

var pluralRules = [
	[/(m)an$/gi,                 '$1en'],
	[/(pe)rson$/gi,              '$1ople'],
	[/(child)$/gi,               '$1ren'],
	[/^(ox)$/gi,                 '$1en'],
	[/(ax|test)is$/gi,           '$1es'],
	[/(octop|vir)us$/gi,         '$1i'],
	[/(alias|status)$/gi,        '$1es'],
	[/(bu)s$/gi,                 '$1ses'],
	[/(buffal|tomat|potat)o$/gi, '$1oes'],
	[/([ti])um$/gi,              '$1a'],
	[/sis$/gi,                   'ses'],
	[/(?:([^f])fe|([lr])f)$/gi,  '$1$2ves'],
	[/(hive)$/gi,                '$1s'],
	[/([^aeiouy]|qu)y$/gi,       '$1ies'],
	[/(x|ch|ss|sh)$/gi,          '$1es'],
	[/(matr|vert|ind)ix|ex$/gi,  '$1ices'],
	[/([m|l])ouse$/gi,           '$1ice'],
	[/(quiz)$/gi,                '$1zes'],
	[/s$/gi,                     's'],
	[/$/gi,                      's']
];

var singularRules = [
	[/(m)en$/gi,                                                        '$1an'],
	[/(pe)ople$/gi,                                                     '$1rson'],
	[/(child)ren$/gi,                                                   '$1'],
	[/([ti])a$/gi,                                                      '$1um'],
	[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$1$2sis'],
	[/(hive)s$/gi,                                                      '$1'],
	[/(tive)s$/gi,                                                      '$1'],
	[/(curve)s$/gi,                                                     '$1'],
	[/([lr])ves$/gi,                                                    '$1f'],
	[/([^fo])ves$/gi,                                                   '$1fe'],
	[/([^aeiouy]|qu)ies$/gi,                                            '$1y'],
	[/(s)eries$/gi,                                                     '$1eries'],
	[/(m)ovies$/gi,                                                     '$1ovie'],
	[/(x|ch|ss|sh)es$/gi,                                               '$1'],
	[/([m|l])ice$/gi,                                                   '$1ouse'],
	[/(bus)es$/gi,                                                      '$1'],
	[/(o)es$/gi,                                                        '$1'],
	[/(shoe)s$/gi,                                                      '$1'],
	[/(cris|ax|test)es$/gi,                                             '$1is'],
	[/(octop|vir)i$/gi,                                                 '$1us'],
	[/(alias|status)es$/gi,                                             '$1'],
	[/^(ox)en/gi,                                                       '$1'],
	[/(vert|ind)ices$/gi,                                               '$1ex'],
	[/(matr)ices$/gi,                                                   '$1ix'],
	[/(quiz)zes$/gi,                                                    '$1'],
	[/s$/gi,                                                            '']
];

var apply = function(str, rules) {
	if (uncountableWords.indexOf(str) >= 0) {
		return str;
	}

	for (var i = 0; i < rules.length; i = i + 1) {
		if (str.match(rules[i][0])) {
			return str.replace(rules[i][0], rules[i][1]);
		}
	}

	return str;
};

Eg.String.pluralize = function(str) {
	return apply(str, pluralRules);
};

Eg.String.singularize = function(str) {
	return apply(str, singularRules);
};

if (Em.EXTEND_PROTOTYPES === true || Em.EXTEND_PROTOTYPES.String) {
	String.prototype.pluralize = String.prototype.pluralize || function() {
		return Eg.String.pluralize(this);
	};

	String.prototype.singularize = String.prototype.singularize || function() {
		return Eg.String.singularize(this);
	};
}

})();

(function() {









})();

(function() {

/**
 * @class {PromiseObject}
 */
Eg.PromiseObject = Em.ObjectProxy.extend(Em.PromiseProxyMixin);

/**
 * @class {PromiseArray}
 */
Eg.PromiseArray = Em.ArrayProxy.extend(Em.PromiseProxyMixin);

})();

(function() {

var NEW_STATE = 'new';
var SAVED_STATE = 'saved';
var DELETED_STATE = 'deleted';

var nextRelationshipId = 0;
var allRelationships = {};

/**
 * A class used internally by Ember-Graph to keep the object-graph up-to-date.
 *
 * @class {Relationship}
 */
Eg.Relationship = Em.Object.extend({

	/**
	 * The ID of this relationship. Has no significance and isn't used
	 * by the records, it's just used for quick indexing.
	 *
	 * @type {String}
	 */
	id: null,

	/**
	 * The state of the relationship. One of the following:
	 * new - client side relationship that hasn't been saved
	 * saved - server side relationship
	 * deleted - server side relationship scheduled for deletion
	 *
	 * @type {String}
	 */
	state: null,

	/**
	 * The first object of this relationship. This object must always
	 * be a record. If the relationship is only one way, this must be
	 * the object on which the relationship is declared.
	 *
	 * @type {Model}
	 */
	object1: null,

	/**
	 * The name of the relationship on object1 that contains this relationship.
	 *
	 * @type {String}
	 */
	relationship1: null,

	/**
	 * Holds the type of the second object (populated automatically)
	 *
	 * @type {String}
	 */
	type1: null,

	/**
	 * The second object of the relationship. This object may be a
	 * string ID if the record isn't loaded yet, although it must
	 * be a permanent ID. If the relationship is one way, the
	 * other side of this relationship for this object will always
	 * be null.
	 *
	 * @type {Model|String}
	 */
	object2: null,

	/**
	 * The name of the relationship on object1 that contains this relationship.
	 * Can be null if the object is a one way relationship.
	 *
	 * @type {String}
	 */
	relationship2: null,

	/**
	 * Holds the type of the second object (populated automatically)
	 *
	 * @type {String}
	 */
	type2: null,

	/**
	 * Signifies that this relationship goes from object1 to object2, but not vice-versa.
	 *
	 * @type {Boolean}
	 */
	oneWay: function() {
		return this.get('relationship2') === null;
	}.property('relationship2'),

	/**
	 * Initializes the relationship with a unique ID.
	 */
	init: function() {
		this.set('id', nextRelationshipId + '');
		nextRelationshipId = nextRelationshipId + 1;
	},

	/**
	 * Signals that this relationship has been created on the client,
	 * and won't become permanent until the next save.
	 *
	 * @returns {Boolean}
	 */
	isNew: function() {
		return this.get('state') === NEW_STATE;
	},

	/**
	 * Signals that this relationship has been saved to the server
	 * and currently has no pending changes to it.
	 *
	 * @returns {Boolean}
	 */
	isSaved: function() {
		return this.get('state') === SAVED_STATE;
	},

	/**
	 * Signals that this relationship has been saved to the server,
	 * but is scheduled for deletion on the next record save.
	 *
	 * @returns {Boolean}
	 */
	isDeleted: function() {
		return this.get('state') === DELETED_STATE;
	},

	/**
	 * Given one side, returns the ID for the other side.
	 *
	 * @param {Model} record
	 * @returns {String|undefined}
	 */
	otherId: function(record) {
		

		if (this.get('object1') === record) {
			var object2 = this.get('object2');
			return (typeof object2 === 'string' ? object2 : object2.get('id'));
		} else {
			return this.get('object1.id');
		}
	},

	/**
	 * Returns the opposite record of the one given. If object2 is an ID, then
	 * it will attempt to find the record. If it can't find the record, it
	 * will return null. Do NOT call this with a record that isn't attached.
	 *
	 * @param {Model} record
	 * @returns {Model|null}
	 */
	otherRecord: function(record) {
		

		var object1 = this.get('object1');
		if (object1 === record) {
			var object2 = this.get('object2');

			if (typeof object2 === 'string') {
				var inverse = object1.constructor.metaForRelationship(this.get('relationship1')).relatedType;
				return object1.get('store').getRecord(inverse, object2);
			} else {
				return object2;
			}
		} else {
			return object1;
		}
	},

	/**
	 * Given a record, returns the relationship name that belongs to that record.
	 *
	 * @param {Model} record
	 * @return {String} Relationship name
	 */
	relationshipName: function(record) {
		if (this.get('object1') === record) {
			return this.get('relationship1');
		} else if (this.get('object2') === record) {
			return this.get('relationship2');
		} else {
			return undefined;
		}
	}
});

Eg.Relationship.reopenClass({

	NEW_STATE: NEW_STATE,
	SAVED_STATE: SAVED_STATE,
	DELETED_STATE: DELETED_STATE,

	/**
	 * Overrides the create method so the object properties
	 * can be included in the parameters like a constructor.
	 *
	 * @param {Object} properties
	 * @returns {Relationship}
	 */
	create: function(properties) {
		var relationship = this._super();

		
		
		
		
		
		relationship.setProperties(properties);

		relationship.set('type1', properties.object1.typeKey);

		if (properties.object2 instanceof Eg.Model) {
			relationship.set('type2', properties.object2.typeKey);
		} else {
			relationship.set('type2',
				properties.object1.constructor.metaForRelationship(properties.relationship1).relatedType);
		}

		allRelationships[relationship.get('id')] = relationship;

		return relationship;
	},

	/**
	 * @param {String} id
	 * @returns {Relationship|undefined}
	 */
	getRelationship: function(id) {
		return allRelationships[id];
	},

	/**
	 * Removes the relationship from the list of tracked relationships.
	 * Doesn't disconnect it from anything. Just removes the reference
	 * from this class so `getRelationship` will no longer find it.
	 *
	 * @param {String} id
	 */
	deleteRelationship: function(id) {
		delete allRelationships[id];
	},

	/**
	 * Given a relationship state, determines which hash in the model the relationship should be in.
	 *
	 * @param {String} state
	 * @returns {String}
	 */
	stateToHash: function(state) {
		switch (state) {
			case NEW_STATE:
				return '_clientRelationships';
			case SAVED_STATE:
				return '_serverRelationships';
			case DELETED_STATE:
				return '_deletedRelationships';
			default:
				
				return '';
		}
	}
});

})();

(function() {

/**
 * Specifies the details of a custom attribute type.
 *
 * @class {AttributeType}
 */
Eg.AttributeType = Em.Object.extend({

	/**
	 * The default value to use if a value of this type is missing.
	 */
	defaultValue: null,

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		return obj;
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		return json;
	},

	/**
	 * @param {*} obj Javascript object
	 * @returns {Boolean} Whether or not the object is a valid value for this type
	 */
	isValid: function(obj) {
		return true;
	},

	/**
	 * @param {*} a Javascript Object
	 * @param {*} b Javascript Object
	 * @returns {Boolean} Whether or not the objects are equal or not
	 */
	isEqual: function(a, b) {
		return (a === b);
	}
});

Eg.AttributeType.reopenClass({

	/**
	 * @type {Object.<String, AttributeType>}
	 */
	_types: {},

	registerAttributeType: function(name, type) {
		var instance = (type instanceof Eg.AttributeType ? type : type.create());
		
		this._types[name] = instance;
	},

	attributeTypeForName: function(name) {
		
		return this._types[name];
	}
});

})();

(function() {

/**
 * Will coerce any type to a boolean (`null` being the default). `null` is not a valid value.
 */
Eg.BooleanType = Eg.AttributeType.extend({

	/**
	 * The default value to use if a value of this type is missing.
	 */
	defaultValue: false,

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		return !!obj;
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		return !!json;
	},

	/**
	 * @param {*} obj Javascript object
	 * @returns {Boolean} Whether or not the object is a valid value for this type
	 */
	isValid: function(obj) {
		return (typeof obj === 'boolean');
	}
});

Eg.AttributeType.registerAttributeType('boolean', Eg.BooleanType);

})();

(function() {

/**
 * When serializing, will coerce to a timestamp. Numbers, dates and strings are are converted to dates,
 * then timestamps. Everything else serializes to null.
 *
 * When deserializing, numbers and strings are converted to dates, everything is is converted to null.
 */
Eg.DateType = Eg.AttributeType.extend({

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		if (obj instanceof Date) {
			return obj.getTime();
		} else if (typeof obj === 'number') {
			return obj;
		} else if (typeof obj === 'string') {
			return new Date(obj).getTime();
		} else {
			return null;
		}
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		if (typeof obj === 'number' || typeof obj === 'string') {
			return new Date(obj);
		} else {
			return null;
		}
	},

	/**
	 * @param {*} obj Javascript object
	 * @returns {Boolean} Whether or not the object is a valid value for this type
	 */
	isValid: function(obj) {
		return (obj === null || obj instanceof Date);
	},

	/**
	 * @param {*} a Javascript Object
	 * @param {*} b Javascript Object
	 * @returns {Boolean} Whether or not the objects are equal or not
	 */
	isEqual: function(a, b) {
		var aNone = (a === null);
		var bNone = (b === null);

		if (aNone && bNone) {
			return true;
		} else if ((aNone && !bNone) || (!aNone && bNone)) {
			return false;
		} else {
			return (new Date(a).getTime() === new Date(b).getTime());
		}
	}
});

Eg.AttributeType.registerAttributeType('date', Eg.DateType);

})();

(function() {

/**
 * Will coerce any type to a number (0 being the default). `null` is not a valid value.
 */
Eg.NumberType = Eg.AttributeType.extend({

	/**
	 * The default value to use if a value of this type is missing.
	 */
	defaultValue: 0,

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		return Number(obj) || 0;
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		return Number(json) || 0;
	},

	/**
	 * @param {*} obj Javascript object
	 * @returns {Boolean} Whether or not the object is a valid value for this type
	 */
	isValid: function(obj) {
		return (typeof obj === 'number');
	}
});

Eg.AttributeType.registerAttributeType('number', Eg.NumberType);

})();

(function() {

Eg.StringType = Eg.AttributeType.extend({

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		return (obj === null ? null : '' + obj);
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		return (json === null ? null : '' + json);
	},

	/**
	 * @param {*} obj Javascript object
	 * @returns {Boolean} Whether or not the object is a valid value for this type
	 */
	isValid: function(obj) {
		return (obj === null || typeof obj === 'string');
	}
});

Eg.AttributeType.registerAttributeType('string', Eg.StringType);

})();

(function() {

var isObject = function(obj) {
	return !Em.isNone(obj) && typeof obj === 'object' && obj.constructor === Object;
};

var deepCompare = function(a, b) {
	if (isObject(a) && isObject(b)) {
		if (!new Em.Set(Em.keys(a)).isEqual(new Em.Set(Em.keys(b)))) {
			return false;
		}

		var keys = Em.keys(a);

		for (var i = 0; i < keys.length; i = i + 1) {
			if (!deepCompare(a[keys[i]], b[keys[i]])) {
				return false;
			}
		}

		return true;
	} else if (Em.isArray(a) && Em.isArray(b)) {
		return Em.compare(a, b) === 0;
	} else {
		return (a === b);
	}
};

/**
 * Will coerce any value to a JSON object (`null` is a valid value).
 * If JSON.stringify fails because the object is circular, it uses null instead.
 */
Eg.ObjectType = Eg.AttributeType.extend({

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		if (isObject(obj)) {
			try {
				JSON.stringify(obj);
				return obj;
			} catch (e) {
				return null;
			}
		} else {
			return null;
		}
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		if (isObject(json)) {
			return json;
		} else {
			return null;
		}
	},

	/**
	 * @param {*} obj Javascript object
	 * @returns {Boolean} Whether or not the object is a valid value for this type
	 */
	isValid: function(obj) {
		try {
			JSON.stringify(obj);
			return isObject(obj);
		} catch (e) {
			return false;
		}
	},

	/**
	 * @param {*} a Javascript Object
	 * @param {*} b Javascript Object
	 * @returns {Boolean} Whether or not the objects are equal or not
	 */
	isEqual: function(a, b) {
		if (!isObject(a) || !isObject(b)) {
			return false;
		}

		return deepCompare(a, b);
	}
});

Eg.AttributeType.registerAttributeType('object', Eg.ObjectType);

})();

(function() {

/**
 * Will coerce any value to a JSON array (`null` is a valid value).
 * Ember enumerables are converted to arrays using `toArray()`
 */
Eg.ArrayType = Eg.AttributeType.extend({

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		if (Em.isNone(obj)) {
			return null;
		}

		obj = (obj.toArray ? obj.toArray() : obj);
		return (Em.isArray(obj) ? obj : null);
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		return (Em.isArray(json) ? json : null);
	},

	/**
	 * @param {*} obj Javascript object
	 * @returns {Boolean} Whether or not the object is a valid value for this type
	 */
	isValid: function(obj) {
		try {
			JSON.stringify(obj);
			return isObject(obj);
		} catch (e) {
			return false;
		}
	},

	/**
	 * @param {*} a Javascript Object
	 * @param {*} b Javascript Object
	 * @returns {Boolean} Whether or not the objects are equal or not
	 */
	isEqual: function(a, b) {
		if (!Em.isArray(a) || !Em.isArray(b)) {
			return false;
		}

		return Em.compare(a.toArray(), b.toArray()) === 0;
	}
});

Eg.AttributeType.registerAttributeType('array', Eg.ArrayType);

})();

(function() {

/**
 * Models act as classes for data. The model class should be
 * extended for each type of object that your object model
 * contains.
 *
 * @class {Model}
 */
Eg.Model = Em.Object.extend({

	/**
	 * Should be overridden in all subclasses with a name for this
	 * particular class. The name should be a unique string that
	 * will be referenced throughout the application. Refrain from
	 * special characters. Stick with lowercase letters.
	 *
	 * @type {String}
	 */
	typeKey: null,

	/**
	 * @type {String}
	 */
	_id: null,

	/**
	 * The ID of the record. The ID can only be changed once, and only if
	 * it's being changed from a temporary ID to a permanent one. Only the
	 * store should change the ID from a temporary one to a permanent one.
	 *
	 * @type {String}
	 */
	id: function(key, value) {
		var id = this.get('_id');

		if (arguments.length > 1) {
			var prefix = this.constructor.temporaryIdPrefix;

			if (id === null) {
				this.set('_id', value);
				return value;
			} else if (Eg.String.startsWith(id, prefix) && !Eg.String.startsWith(value, prefix)) {
				this.set('_id', value);
				return value;
			} else {
				throw new Error('Cannot change the \'id\' property of a model.');
			}
		}

		return id;
	}.property('_id'),

	/**
	 * @type {Object}
	 */
	store: null,

	/**
	 * Denotes that a record has been deleted. If `isDirty` is also true,
	 * the change hasn't been persisted to the server yet.
	 *
	 * @type {Boolean}
	 */
	isDeleted: null,

	/**
	 * Denotes that the record is currently saving its changes
	 * to the server, but the server hasn't responded yet.
	 *
	 * @type {Boolean}
	 */
	isSaving: null,

	/**
	 * Denotes that the record is being reloaded from the server,
	 * and will likely change when the server responds.
	 *
	 * @type {Boolean}
	 */
	isReloading: null,

	/**
	 * Denotes that a record has been loaded into a store and isn't freestanding.
	 *
	 * @type {Boolean}
	 */
	isLoaded: function() {
		return this.get('store') !== null;
	}.property('store'),

	/**
	 * Denotes that the record has changes that have not been saved to the server yet.
	 *
	 * @type {Boolean}
	 */
	isDirty: function() {
		var isDeleted = this.get('isDeleted');
		var isSaving = this.get('isSaving');

		if (isDeleted && !isSaving) {
			return false;
		}

		var deleting = isDeleted && isSaving;
		return this.get('_areAttributesDirty') || this.get('_areRelationshipsDirty') || deleting;
	}.property('_areAttributesDirty', '_areRelationshipsDirty', 'isDeleted', 'isSaving'),

	/**
	 * Denotes that a record has just been created and has not been saved to
	 * the server yet. Most likely has a temporary ID if this is true.
	 *
	 * @type {Boolean}
	 */
	isNew: function() {
		return Eg.String.startsWith(this.get('_id'), this.constructor.temporaryIdPrefix);
	}.property('_id'),

	/**
	 * Sets up the instance variables of this class.
	 */
	init: function() {
		this.set('_id', null);
		this.set('store', null);

		this.set('_serverAttributes', {});
		this.set('_clientAttributes', {});

		this.set('_serverRelationships', {});
		this.set('_clientRelationships', {});
		this.set('_deletedRelationships', {});

		this.set('isDeleted', false);
		this.set('isSaving', false);
		this.set('isReloading', false);
	},

	/**
	 * Loads JSON data from the server into the record. This may be used when
	 * the record is brand new, or when the record is being reloaded. This
	 * should generally only be used by the store or for testing purposes.
	 */
	_loadData: function(json) {
		json = json || {};

		this._loadAttributes(json);
		this._loadRelationships(json);
	},

	/**
	 * Proxies the store's save method for convenience.
	 */
	save: function() {
		return this.get('store').saveRecord(this);
	},

	/**
	 * Proxies the store's reload method for convenience.
	 */
	reload: function() {
		return this.get('store').reloadRecord(this);
	},

	/**
	 * Proxies the store's delete method for convenience.
	 */
	destroy: function() {
		return this.get('store').deleteRecord(this);
	}
});

Eg.Model.reopenClass({

	/**
	 * The prefix added to generated IDs to show that the prefix wasn't given
	 * by the server and is only temporary until the real one comes in.
	 *
	 * @type {String}
	 * @constant
	 * @static
	 */
	temporaryIdPrefix: 'EG_TEMP_ID_',

	/**
	 * @returns {Boolean}
	 */
	isTemporaryId: function(id) {
		return Eg.String.startsWith(id, this.temporaryIdPrefix);
	},

	create: function() {
		
	},

	_create: Eg.Model.create,

	extend: function() {
		
	},

	/**
	 * Modifies the extend method to ensure that the typeKey is available on
	 * both the class an instances. Also registers it with the system.
	 *
	 * @returns {Model}
	 */
	_extend: (function(_super) {
		return function(typeKey, mixins, options) {
			var subclass = _super.apply(this, mixins.concat([options]));

			subclass._declareRelationships();

			subclass.reopen({
				typeKey: typeKey
			});

			subclass.reopenClass({
				typeKey: typeKey
			});

			return subclass;
		};
	})(Eg.Model.extend)
});



})();

(function() {

var disallowedAttributeNames = new Em.Set(['id', 'type', 'content']);

/**
 * Possible options:
 * type: Type of the attribute. Required.
 * isRequired: Whether or not the property can be omitted from the server. Defaults to false. Uses defaultValue.
 * defaultValue: Value if not present when created. If omitted, uses the default value for the property type.
 * isEqual: Function to compare two instances of the property. Defaults to using the type comparison function.
 * readOnly: True if the attribute should be immutable. Defaults to false.
 * isValid: A function that returns whether the value is valid or not. Defaults to using the type validity function.
 *
 * @param options
 * @returns {Em.ComputedProperty}
 */
Eg.attr = function(options) {
	var typeTransform = Eg.AttributeType.attributeTypeForName(options.type);

	var meta = {
		isAttribute: true,
		type: options.type,
		typeTransform: typeTransform,
		isRequired: options.hasOwnProperty('isRequired') ? options.isRequired : !options.hasOwnProperty('defaultValue'),
		defaultValue: options.defaultValue || typeTransform.get('defaultValue'),
		isEqual: options.isEqual || typeTransform.isEqual,
		readOnly: options.readOnly === true,
		isValid: options.isValid || typeTransform.isValid
	};

	var attribute = function(key, value) {
		var server = this.get('_serverAttributes.' + key);
		var client = this.get('_clientAttributes.' + key);
		var current = (client === undefined ? server : client);

		

		if (value !== undefined) {
			if (!meta.isValid(value)) {
				
				return current;
			}

			if (meta.isEqual(server, value)) {
				delete this.get('_clientAttributes')[key];
				this.notifyPropertyChange('_clientAttributes');
				return server;
			} else {
				this.set('_clientAttributes.' + key, value);
				this.notifyPropertyChange('_clientAttributes');
				return value;
			}
		}

		return current;
	}.property('_clientAttributes', '_serverAttributes').meta(meta);

	return (options.readOnly ? attribute.readOnly() : attribute);
};

/**
 * @class Model
 */
Eg.Model.reopenClass({

	/**
	 * @static
	 */
	attributes: function() {
		var attributes = new Em.Set();

		this.eachComputedProperty(function(name, meta) {
			if (meta.isAttribute) {
				

				attributes.addObject(name);
			}
		});

		return attributes;
	}.property(),

	/**
	 * Just a more semantic alias for `metaForProperty`
	 * @alias metaForProperty
	 */
	metaForAttribute: Em.aliasMethod('metaForProperty'),

	/**
	 * @param name Name of property
	 * @returns {Boolean} True if attribute, false otherwise
	 * @static
	 */
	isAttribute: function(name) {
		return Em.get(this, 'attributes').contains(name);
	},

	/**
	 * Calls the callback for each attribute defined on the model.
	 *
	 * @param {Function} callback Function that takes `name` and `meta` parameters
	 * @param {*} [binding] Object to use as `this`
	 * @static
	 */
	eachAttribute: function(callback, binding) {
		this.eachComputedProperty(function(name, meta) {
			if (meta.isAttribute) {
				callback.call(binding, name, meta);
			}
		});
	}
});

Eg.Model.reopen({

	/**
	 * Represents the latest set of properties from the server. The only way these
	 * can be updated is if the server sends over new JSON through an operation,
	 * or a save operation successfully completes, in which case `_clientAttributes`
	 * will be copied into this.
	 *
	 * @private
	 */
	_serverAttributes: null,

	/**
	 * Represents the state of the object on the client. These are likely different
	 * from what the server has and are completely temporary until saved.
	 *
	 * @private
	 */
	_clientAttributes: null,

	/**
	 * Watches the client side attributes for changes and detects if there are
	 * any dirty attributes based on how many client attributes differ from
	 * the server attributes.
	 */
	_areAttributesDirty: function() {
		return Em.keys(this.get('_clientAttributes') || {}).length > 0;
	}.property('_clientAttributes'),

	/**
	 * @returns {Object} Keys are attribute names, values are arrays with [oldVal, newVal]
	 */
	changedAttributes: function() {
		var diff = {};

		this.constructor.eachAttribute(function(name, meta) {
			var server = this.get('_serverAttributes.' + name);
			var client = this.get('_clientAttributes.' + name);

			if (client === undefined) {
				return;
			}

			diff[name] = [server, client];
		}, this);

		return diff;
	},

	/**
	 * Resets all attribute changes to last known server attributes.
	 */
	rollbackAttributes: function() {
		this.set('_clientAttributes', {});
	},

	/**
	 * Loads attributes from the server.
	 *
	 * @param {Object} json The JSON with properties to load
	 * @private
	 */
	_loadAttributes: function(json) {
		this.constructor.eachAttribute(function(name, meta) {
			

			var value = (json.hasOwnProperty(name) ? json[name] : meta.defaultValue);

			// TODO: Do we want a way to accept non-valid value from the server?
			if (meta.isValid(value)) {
				this.set('_serverAttributes.' + name, value);
			} else {
				
				this.set('_serverAttributes.' + name, meta.defaultValue);
			}
		}, this);

		this.notifyPropertyChange('_serverAttributes');
	}
});

})();

(function() {

var BELONGS_TO_KEY = Eg.Model.BELONGS_TO_KEY = 'belongsTo';
var HAS_MANY_KEY = Eg.Model.HAS_MANY_KEY = 'hasMany';

var NEW_STATE = Eg.Relationship.NEW_STATE;
var SAVED_STATE = Eg.Relationship.SAVED_STATE;
var DELETED_STATE = Eg.Relationship.DELETED_STATE;

var disallowedRelationshipNames = new Em.Set(['id', 'type', 'content']);

var createRelationship = function(kind, options) {
	
	

	var meta = {
		isRelationship: true,
		kind: kind,
		isRequired: options.isRequired !== false,
		defaultValue: options.defaultValue || (kind === HAS_MANY_KEY ? [] : null),
		relatedType: options.relatedType,
		inverse: options.inverse,
		readOnly: options.readOnly === true
	};

	var relationship;

	if (kind === HAS_MANY_KEY) {
		relationship = function(key) {
			return this._hasManyValue(key);
		};
	} else {
		relationship = function(key) {
			return this._belongsToValue(key);
		};
	}

	return relationship.property('_serverRelationships', '_clientRelationships').meta(meta).readOnly();
};

Eg.hasMany = function(options) {
	return createRelationship(HAS_MANY_KEY, options);
};

Eg.belongsTo = function(options) {
	return createRelationship(BELONGS_TO_KEY, options);
};

Eg.Model.reopenClass({

	/**
	 * Goes through the subclass and declares an additional property for
	 * each relationship. The properties will be capitalized and then prefixed
	 * with 'loaded'. So rather than 'projects', use 'loadedProjects'.
	 * This will return the relationship as a promise rather than in ID form.
	 *
	 * @static
	 * @private
	 */
	_declareRelationships: function() {
		this.eachRelationship(function(name, meta) {
			var obj = {};

			var relationship;
			var relatedType = meta.relatedType;

			if (meta.kind === HAS_MANY_KEY) {
				relationship = function() {
					return this.get('store').find(relatedType, this.get(name).toArray());
				};
			} else {
				relationship = function() {
					return this.get('store').find(relatedType, this.get(name));
				};
			}

			obj[Eg.String.capitalize(name)] = relationship.property(name).readOnly();

			this.reopen(obj);
		}, this);
	},

	/**
	 * @static
	 */
	relationships: function() {
		var relationships = new Em.Set();

		this.eachComputedProperty(function(name, meta) {
			if (meta.isRelationship) {
				
				

				relationships.addObject(name);
			}
		});

		return relationships;
	}.property(),

	/**
	 * Just a more semantic alias for `metaForProperty`
	 * @alias metaForProperty
	 * @static
	 */
	metaForRelationship: Em.aliasMethod('metaForProperty'),

	/**
	 * @param name The name of the relationships
	 * @returns {String} HAS_MANY_KEY or BELONGS_TO_KEY
	 * @static
	 */
	relationshipKind: function(name) {
		return this.metaForProperty(name).kind;
	},

	/**
	 * Calls the callback for each relationship defined on the model.
	 *
	 * @param {Function} callback Function that takes `name` and `meta` parameters
	 * @param {*} [binding] Object to use as `this`
	 * @static
	 */
	eachRelationship: function(callback, binding) {
		this.eachComputedProperty(function(name, meta) {
			if (meta.isRelationship) {
				callback.call(binding, name, meta);
			}
		});
	}
});

Eg.Model.reopen({

	/**
	 * Relationships that have been saved to the server
	 * that are currently connected to this record.
	 *
	 * @type {Object.<String, Relationship>}
	 */
	_serverRelationships: null,

	/**
	 * Relationships that have been saved to the server, but aren't currently
	 * connected to this record and are scheduled for deletion on the next save.
	 *
	 * @type {Object.<String, Relationship>}
	 */
	_deletedRelationships: null,

	/**
	 * Relationships that have been created on the client and haven't been
	 * saved to the server yet. Relationships from here that are disconnected
	 * are deleted completely rather than queued for deletion.
	 *
	 * @type {Object.<String, Relationship>}
	 */
	_clientRelationships: null,

	/**
	 * Determines the value of a belongsTo relationship, either the
	 * original value sent from the server, or the current client value.
	 *
	 * @param {String} relationship
	 * @param {Boolean} server True for original value, false for client value
	 * @returns {String}
	 * @private
	 */
	_belongsToValue: function(relationship, server) {
		var serverRelationships = Eg.util.values(this.get('_serverRelationships'));
		var otherRelationships = Eg.util.values(this.get((server ? '_deleted' : '_client') + 'Relationships'));
		var current = serverRelationships.concat(otherRelationships);

		for (var i = 0; i < current.length; i = i + 1) {
			if (current[i].relationshipName(this) === relationship) {
				return current[i].otherId(this);
			}
		}

		return null;
	},

	/**
	 * Determines the value of a hasMany relationship, either the
	 * original value sent from the server, or the current client value.
	 *
	 * @param {String} relationship
	 * @param {Boolean} server True for original value, false for client value
	 * @returns {Set}
	 * @private
	 */
	_hasManyValue: function(relationship, server) {
		var serverRelationships = Eg.util.values(this.get('_serverRelationships'));
		var otherRelationships = Eg.util.values(this.get((server ? '_deleted' : '_client') + 'Relationships'));
		var current = serverRelationships.concat(otherRelationships);

		var found = [];
		for (var i = 0; i < current.length; i = i + 1) {
			if (current[i].relationshipName(this) === relationship) {
				found.push(current[i].otherId(this));
			}
		}

		return new Em.Set(found);
	},

	/**
	 * Watches the client side attributes for changes and detects if there are
	 * any dirty attributes based on how many client attributes differ from
	 * the server attributes.
	 */
	_areRelationshipsDirty: function() {
		var client = Em.keys(this.get('_clientRelationships')).length > 0;
		var deleted = Em.keys(this.get('_deletedRelationships')).length > 0;

		return client || deleted;
	}.property('_clientRelationships', '_deletedRelationships'),

	/**
	 * Gets all relationships currently linked to this record.
	 *
	 * @returns {Relationship[]}
	 * @private
	 */
	_getAllRelationships: function() {
		var server = Eg.util.values(this.get('_serverRelationships'));
		var client = Eg.util.values(this.get('_clientRelationships'));
		var deleted = Eg.util.values(this.get('_deletedRelationships'));

		return server.concat(client.concat(deleted));
	},

	/**
	 * Loads relationships from the server. Completely replaces
	 * the current relationships with the given ones.
	 *
	 * @param json The JSON with properties to load
	 * @private
	 */
	_loadRelationships: function(json) {
		// TODO: Don't delete client side relationships
		var store = this.get('store');

		this.constructor.eachRelationship(function(name, meta) {
			if (meta.isRequired && json[name] === undefined) {
				throw new Error('You left out the required \'' + name + '\' relationship.');
			}

			json[name] = json[name] || meta.defaultValue;

			if (meta.kind === HAS_MANY_KEY) {
				var currentSet = new Em.Set();
				var givenSet = new Em.Set(json[name]);

				this._relationshipsForName(name).forEach(function(relationship) {
					var id = relationship.otherId(this);
					currentSet.addObject(id);

					if (givenSet.contains(id)) {
						if (relationship.isNew()) {
							store._changeRelationshipState(relationship.get('id'), 'saved');
						}
					} else {
						store._deleteRelationship(relationship.get('id'));
					}
				}, this);

				givenSet.forEach(function(id) {
					if (currentSet.contains(id)) {
						return;
					}

					store._createRelationship(this.typeKey, name,
						this.get('id'), meta.relatedType, meta.inverse, id, true);
				}, this);
			} else {
				var current = this.get(name);
				if (current === json[name]) {
					return;
				}

				if (current !== null) {
					store._deleteRelationship(Em.get(this._findLinkTo(name, current), 'id'));
				}

				if (json[name] !== null) {
					store._createRelationship(this.typeKey, name,
						this.get('id'), meta.relatedType, meta.inverse, json[name], true);
				}
			}
		}, this);
	},

	/**
	 * @returns {Object} Keys are relationship names, values are arrays with [oldVal, newVal]
	 */
	changedRelationships: function() {
		var changed = {};

		this.constructor.eachRelationship(function(name, meta) {
			var oldVal, newVal;

			if (meta.kind === HAS_MANY_KEY) {
				oldVal = this._hasManyValue(name, true);
				newVal = this._hasManyValue(name, false);

				if (!oldVal.isEqual(newVal)) {
					changed[name] = [oldVal, newVal];
				}
			} else {
				oldVal = this._belongsToValue(name, true);
				newVal = this._belongsToValue(name, false);

				if (oldVal !== newVal) {
					changed[name] = [oldVal, newVal];
				}
			}
		}, this);

		return changed;
	},

	/**
	 * Resets all relationship changes to last known server relationships.
	 */
	rollbackRelationships: function() {
		var store = this.get('store');

		this._getAllRelationships().forEach(function(relationship) {
			switch (relationship.get('state')) {
				case NEW_STATE:
					store._deleteRelationship(relationship.get('id'));
					break;
				case SAVED_STATE:
					// NOP
					break;
				case DELETED_STATE:
					store._changeRelationshipState(relationship.get('id'), SAVED_STATE);
					break;
			}
		}, this);
	},

	/**
	 * A convenience method to add an item to a hasMany relationship. This will
	 * ensure that all of the proper observers are notified of the change.
	 *
	 * @param {String} relationship The relationship to modify
	 * @param {String} id The ID to add to the relationship
	 */
	addToRelationship: function(relationship, id) {
		var meta = this.constructor.metaForRelationship(relationship);
		
		if (meta.readOnly) {
			return;
		}

		var link = this._findLinkTo(relationship, id);
		if (link && (link.get('state') === NEW_STATE || link.get('state') === SAVED_STATE)) {
			return;
		}

		if (link && link.get('state') === DELETED_STATE) {
			this.get('store')._changeRelationshipState(link.get('id'), SAVED_STATE);
			return;
		}

		this.get('store')._createRelationship(this.typeKey, relationship,
			this.get('id'), meta.relatedType, meta.inverse, id, false);
	},

	/**
	 * A convenience method to remove an item from a hasMany relationship. This will
	 * ensure that all of the proper observers are notified of the change.
	 *
	 * @param {String} relationship The relationship to modify
	 * @param {String} id The ID to add to the relationship
	 */
	removeFromRelationship: function(relationship, id) {
		var meta = this.constructor.metaForRelationship(relationship);
		
		if (meta.readOnly) {
			return;
		}

		var r = this._findLinkTo(relationship, id);

		if (r !== null) {
			switch (r.get('state')) {
				case NEW_STATE:
					this.get('store')._deleteRelationship(r.get('id'));
					break;
				case SAVED_STATE:
					this.get('store')._changeRelationshipState(r.get('id'), DELETED_STATE);
					break;
				case DELETED_STATE:
					// NOP?
					break;
			}
		}
	},

	/**
	 * Sets the value of a belongsTo relationship to the given ID.
	 *
	 * @param {String} relationship
	 * @param {String} id
	 */
	setBelongsTo: function(relationship, id) {
		var meta = this.constructor.metaForRelationship(relationship);
		
		if (meta.readOnly) {
			return;
		}

		var link = this._findLinkTo(relationship, id);
		if (link && (link.get('state') === NEW_STATE || link.get('state') === SAVED_STATE)) {
			return;
		}

		if (link && link.get('state') === DELETED_STATE) {
			this.get('store')._changeRelationshipState(link.get('id'), SAVED_STATE);
			return;
		}

		this.clearBelongsTo(relationship);

		if (id === null) {
			return;
		}

		if (id === null) {
			this.clearBelongsTo(relationship);
			return;
		}

		this.get('store')._createRelationship(this.typeKey, relationship,
			this.get('id'), meta.relatedType, meta.inverse, id, false);
	},

	/**
	 * Sets the value of a belongsTo relationship to `null`.
	 * @param {String} relationship
	 */
	clearBelongsTo: function(relationship) {
		var meta = this.constructor.metaForRelationship(relationship);
		
		if (meta.readOnly) {
			return;
		}

		var current = this.get(relationship);

		if (current !== null) {
			var r = this._findLinkTo(relationship, current);

			if (r !== null) {
				switch (r.get('state')) {
					case NEW_STATE:
						this.get('store')._deleteRelationship(r.get('id'));
						break;
					case SAVED_STATE:
						this.get('store')._changeRelationshipState(r.get('id'), DELETED_STATE);
						break;
					case DELETED_STATE:
						// NOP?
						break;
				}
			}
		}
	},

	/**
	 * If this record is linked to the given record via the given ID, this returns
	 * the relationship that links the two. If they aren't linked, it returns null.
	 *
	 * @param {String} relationship
	 * @param {String} id
	 * @returns {Relationship}
	 * @private
	 */
	_findLinkTo: function(relationship, id) {
		var relationships = this._getAllRelationships();
		for (var i = 0; i < relationships.length; i = i + 1) {
			if (relationships[i].relationshipName(this) === relationship && relationships[i].otherId(this) === id) {
				return relationships[i];
			}
		}

		return null;
	},

	/**
	 * Determines if this record is linked to the given ID via the given relationship.
	 * This will search all relationships: saved, deleted and new
	 *
	 * @param {String} relationship
	 * @param {String} id
	 * @returns {Boolean}
	 */
	_isLinkedTo: function(relationship, id) {
		return this._findLinkTo(relationship, id) !== null;
	},

	/**
	 * Given a relationship name, returns all current relationships associated with that name.
	 *
	 * @param {String} relationship
	 * @returns {Relationship[]}
	 * @private
	 */
	_relationshipsForName: function(relationship) {
		var current = this._getAllRelationships();

		return current.filter(function(r) {
			return (r.relationshipName(this) === relationship);
		}, this);
	},

	/**
	 * Connects the given relationship blindly. Will not check to see if the
	 * relationship is already connected, that should have done beforehand.
	 * Relies on the relationship state to find the relationship.
	 *
	 * @param {Relationship} relationship
	 * @private
	 */
	_connectRelationship: function(relationship) {
		var hash = Eg.Relationship.stateToHash(relationship.get('state'));
		this.set(hash + '.' + relationship.get('id'), relationship);
		this.notifyPropertyChange(hash);
	},

	/**
	 * Disconnects the relationship from this record.
	 * Relies on the relationship state to find the relationship.
	 *
	 * @param {Relationship} relationship
	 * @private
	 */
	_disconnectRelationship: function(relationship) {
		var hash = Eg.Relationship.stateToHash(relationship.get('state'));
		delete this.get(hash)[relationship.get('id')];
		this.notifyPropertyChange(hash);
	}
});

})();

(function() {

var methodMissing = function(method) {
	return new Error('Your serializer failed to implement the \'' + method + '\' method.');
};

/**
 * An interface for a serializer. A serializer is used to convert
 * objects back and forth between the JSON that the server uses,
 * and the records that are used on the client side.
 *
 * @type {Serializer}
 */
Eg.Serializer = Em.Object.extend({

	/**
	 * The store that the records will be loaded into.
	 * This can be used for fetching models and their metadata.
	 */
	store: null,

	/**
	 * Converts a record to JSON for sending over the wire.
	 *
	 * @param {Model} record The record to serialize
	 * @param {Object} options Any options that were passed by the adapter
	 * @returns {Object} JSON representation of record
	 */
	serialize: function(record, options) {
		throw methodMissing('serialize');
	},

	/**
	 * Converts a payload from the server into one or more records to
	 * be loaded into the store. The method should use the options
	 * object to obtain any information it needs to correctly form
	 * the records. This method should return an enumerable of records
	 * no matter how many records the server sent back.
	 *
	 * @param {Object} payload
	 * @param {Object} options Any options that were passed by the adapter
	 * @returns {Object} Normalized JSON Payload
	 */
	deserialize: function(payload, options) {
		throw methodMissing('deserialize');
	}
});


})();

(function() {

var missingMethod = function(method) {
	return new Error('Your adapter failed to implement the \'' + method + '\' method.');
};

/**
 * An interface for an adapter. And adapter is used to communicated with
 * the server. The adapter is never called directly, its methods are
 * called by the store to perform its operations.
 *
 * The adapter should return normalized JSON from its operations. Normalized JSON
 * is a single object whose keys are the type names of the records being returned.
 * The JSON cannot contain any other keys. The value of each key will be the
 * records of that type that were returned by the server. The records must be
 * in normalized JSON form which means that they must contain an `id` field,
 * and they must contain the required attributes and relationships to
 * create a record of that type.
 *
 * Example:
 * {
 *     user: [{ id: 3, posts: [1,2] }],
 *     post: [{ id: 1 }, { id: 2 }]
 * }
 *
 * @class {Adapter}
 */
Eg.Adapter = Em.Object.extend({

	/**
	 * The store that this adapter belongs to.
	 * This might be needed to get models and their metadata.
	 */
	store: null,

	/**
	 * Should be overridden with a serializer instance. This class will
	 * proxy to the serializer for the serialize methods of this class.
	 */
	serializer: null,

	/**
	 * Observer method to set the store property on the serializer.
	 * @private
	 */
	_serializerDidChange: function() {
		var serializer = this.get('serializer');

		if (serializer) {
			serializer.set('store', this.get('store'));
		}
	}.observes('serializer').on('init'),

	/**
	 * Persists a record to the server. This method returns normalized JSON
	 * as the other methods do, but the normalized JSON must contain one
	 * extra field. It must contain an `id` field that represents the
	 * permanent ID of the record that was created. This helps distinguish
	 * it from any other records of that same type that may have been
	 * returned from the server.
	 *
	 * @param {Model} record The record to persist
	 * @returns {Promise} A promise that resolves to normalized JSON
	 */
	createRecord: function(record) {
		throw missingMethod('createRecord');
	},

	/**
	 * Fetch a record from the server.
	 *
	 * @param {String|} typeKey
	 * @param {String} id The ID of the record to fetch
	 * @returns {Promise} A promise that resolves to normalized JSON
	 */
	findRecord: function(typeKey, id) {
		throw missingMethod('findRecord');
	},

	/**
	 * The same as find, only it should load several records. The
	 * promise can return any type of enumerable containing the records.
	 *
	 * @param {String} typeKey
	 * @param {Enumerable} ids Enumerable of IDs
	 * @returns {Promise} A promise that resolves to normalized JSON
	 */
	findMany: function(typeKey, ids) {
		throw missingMethod('findMany');
	},

	/**
	 * The same as find, only it should load all records of the given type.
	 * The promise can return any type of enumerable containing the records.
	 *
	 * @param {String} typeKey
	 * @param {Enumerable} ids The IDs of records of this type that the store already has
	 * @returns {Promise} A promise that resolves to normalized JSON
	 */
	findAll: function(typeKey, ids) {
		throw missingMethod('findAll');
	},

	/**
	 * This method returns normalized JSON as the other methods do, but
	 * the normalized JSON must contain one extra field. It must contain
	 * an `ids` field that represents the IDs of the records that matched
	 * the query. This helps distinguish them from any other records of
	 * that same type that may have been returned from the server.
	 *
	 * @param {String} typeKey
	 * @param {Object} query The query parameters that were passed into `find` earlier
	 * @param {Enumerable} ids The IDs of records of this type that the store already has
	 * @returns {Promise} A promise that resolves to normalized JSON
	 */
	findQuery: function(typeKey, query, ids) {
		throw missingMethod('findQuery');
	},

	/**
	 * Update the given record.
	 *
	 * @param {Model} record The model to save
	 * @returns {Promise} A promise that resolves to normalized JSON
	 */
	updateRecord: function(record) {
		throw missingMethod('updateRecord');
	},

	/**
	 * Update the given record.
	 *
	 * @param {Model} record The model to save
	 * @returns {Promise} A promise that resolves to normalized JSON
	 */
	deleteRecord: function(record) {
		throw missingMethod('deleteRecord');
	},

	/**
	 * Proxies to the serializer of this class.
	 */
	serialize: function(record, options) {
		return this.get('serializer').serialize(record, options);
	},

	/**
	 * Proxies to the serializer of this class.
	 */
	deserialize: function(payload, options) {
		return this.get('serializer').deserialize(payload, options);
	}
});


})();

(function() {

/**
 * The store is used to manage all records in the application.
 * Ideally, there should only be one store for an application.
 *
 * @type {Store}
 */
Eg.Store = Em.Object.extend({

	/**
	 * The number of milliseconds after a record in the cache expires
	 * and must be re-fetched from the server. Leave at Infinity for
	 * now, as finite timeouts will likely cause a lot of bugs.
	 */
	cacheTimeout: Infinity,

	/**
	 * Contains the records cached in the store. The keys are type names,
	 * and the values are nested objects keyed at the ID of the record.
	 *
	 * @type {Object.<String, Model>}
	 */
	_records: null,

	/**
	 * Holds all currently registered model subtypes. (typeKey -> Model)
	 *
	 * @type {Object.<String, Model>}
	 */
	_types: null,

	/**
	 * The adapter used by the store to communicate with the server.
	 * This should be overridden by `create` or `extend`. It can
	 * either be an adapter instance or adapter subclass.
	 *
	 * @type {Adapter}
	 */
	adapter: null,

	/**
	 * Initializes all of the variables properly
	 */
	init: function() {
		this.set('_records', {});
		this.set('_types', {});
		this.set('_queuedRelationships', {});

		var adapter = this.get('adapter');

		if (adapter === null) {
			return;
		}

		if (!(adapter instanceof Eg.Adapter)) {
			this.set('adapter', adapter.create());
		}

		this.set('adapter.store', this);
	},

	/**
	 * Creates a new subclass of Model.
	 *
	 * @param {String} typeKey The name of the new type
	 * @param {String} [parentKey] The parent type, if inheriting from a custom type
	 * @param {Array} [mixins] The mixins to create the type with
	 * @param {Object} options The attributes and relationships of the type
	 * @returns {Model}
	 */
	createModel: function(typeKey, parentKey, mixins, options) {
		

		options = arguments[arguments.length -1];

		var base = Eg.Model;
		if (typeof parentKey === 'string') {
			
			base = this.get('_types.' + parentKey);
		}

		mixins = (Em.isArray(mixins) ? mixins : (Em.isArray(parentKey) ? parentKey : []));

		var subclass = base._extend(typeKey, mixins, options);

		this.set('_types.' + typeKey, subclass);
		this.set('_records.' + typeKey, {});
		return subclass;
	},

	/**
	 * @param {String} typeKey
	 * @returns {Model}
	 */
	modelForType: function(typeKey) {
		
		return this.get('_types.' + typeKey);
	},

	/**
	 * Creates a record of the specified type. If the JSON has an ID,
	 * then the record 'created' is a permanent record from the server.
	 * If it contains no ID, the store assumes that it's new.
	 *
	 * @param {String} typeKey
	 * @param {Object} json
	 * @returns {Model}
	 */
	createRecord: function(typeKey, json) {
		json = json || {};

		var record = this.modelForType(typeKey)._create();
		record.set('store', this);
		record.set('id', Eg.Model.temporaryIdPrefix + Eg.util.generateGUID());

		this.set('_records.' + typeKey + '.' + record.get('id'), {
			record: record,
			timestamp: new Date().getTime()
		});

		record._loadData(json);

		return record;
	},

	/**
	 * Loads an already created record into the store. This method
	 * should probably only be used by the store or adapter.
	 *
	 * @param typeKey
	 * @param json
	 */
	_loadRecord: function(typeKey, json) {
		var record = this.modelForType(typeKey)._create();
		record.set('store', this);
		record.set('id', json.id);

		this.set('_records.' + typeKey + '.' + json.id, {
			record: record,
			timestamp: new Date().getTime()
		});

		if (this._hasQueuedRelationships(typeKey, json.id)) {
			this._connectQueuedRelationships(record);
		}

		record._loadData(json);

		return record;
	},

	/**
	 * Returns all records of the given type that are in the cache.
	 *
	 * @param {String} typeKey
	 * @returns {Array} Array of records of the given type
	 * @private
	 */
	_recordsForType: function(typeKey) {
		var records = this.get('_records.' + typeKey) || {};
		var timeout = new Date().getTime() - this.get('cacheTimeout');

		return Em.keys(records).map(function(id) {
			var recordShell = records[id];

			if (recordShell.timestamp >= timeout) {
				return recordShell.record;
			} else {
				return undefined;
			}
		});
	},

	/**
	 * Fetches a record (or records), either from the cache or from the server.
	 * Options can be different types which have different functions:
	 *
	 * ID String - Fetches a single record by ID
	 * ID Enumerable - Fetches many records by the IDs
	 * Object - A query that is passed to the adapter
	 * undefined - Fetches all records of a type
	 *
	 * @param {String} typeKey
	 * @param {String|String[]|Object} options
	 * @returns {PromiseObject|PromiseArray}
	 */
	find: function(typeKey, options) {
		if (typeof options === 'string') {
			return this._findSingle(typeKey, options);
		} else if (Em.isArray(options)) {
			return this._findMany(typeKey, options);
		} else if (typeof options === 'object') {
			return this._findQuery(typeKey, options);
		} else {
			return this._findAll(typeKey);
		}
	},

	/**
	 * Returns the record directly if the record is cached in the store.
	 * Otherwise returns null.
	 *
	 * @param {String} typeKey
	 * @param {String} id
	 * @returns {Model}
	 * @private
	 */
	getRecord: function(typeKey, id) {
		var store = this.get('_records');
		var records = store[typeKey] || (store[typeKey] = {});
		var timeout = new Date().getTime() - this.get('cacheTimeout');

		if (records[id]) {
			return (records[id].timestamp >= timeout ? records[id].record : null);
		} else {
			return null;
		}
	},

	/**
	 * Gets a single record from the adapter as a PromiseObject.
	 *
	 * @param {String} type
	 * @param {String} id
	 * @return {PromiseObject}
	 * @private
	 */
	_findSingle: function(type, id) {
		var record = this.getRecord(type, id);
		var promise;

		if (record) {
			promise = Em.RSVP.Promise.resolve(record);
		} else {
			promise = this.get('adapter').findRecord(type, id).then(function(payload) {
				this._extractPayload(payload);
				return this.getRecord(type, id);
			}.bind(this));
		}

		return Eg.PromiseObject.create({ promise: promise });
	},

	/**
	 * Gets many records from the adapter as a PromiseArray.
	 *
	 * @param {String} type
	 * @param {String[]} ids
	 * @returns {PromiseArray}
	 * @private
	 */
	_findMany: function(type, ids) {
		ids = ids || [];
		var set = new Em.Set(ids);

		ids.forEach(function(id) {
			if (this.getRecord(type, id) !== null) {
				set.removeObject(id);
			}
		}, this);

		var promise;

		if (set.length === 0) {
			promise = Em.RSVP.Promise.resolve(ids.map(function(id) {
				return this.getRecord(type, id);
			}, this));
		} else {
			promise = this.get('adapter').findMany(type, set.toArray()).then(function(payload) {
				this._extractPayload(payload);

				return ids.map(function(id) {
					return this.getRecord(type, id);
				}, this).toArray();
			}.bind(this));
		}

		return Eg.PromiseArray.create({ promise: promise });
	},

	/**
	 * Gets all of the records of a type from the adapter as a PromiseArray.
	 *
	 * @param {String} type
	 * @returns {PromiseArray}
	 * @private
	 */
	_findAll: function(type) {
		var ids = this._recordsForType(type).mapBy('id');
		var promise = this.get('adapter').findAll(type, ids).then(function(payload) {
			this._extractPayload(payload);
			return this._recordsForType(type);
		}.bind(this));

		return Eg.PromiseArray.create({ promise: promise });
	},

	/**
	 * Gets records for a query from the adapter as a PromiseArray.
	 *
	 * @param {String} typeKey
	 * @param {Object} options
	 * @returns {PromiseArray}
	 * @private
	 */
	_findQuery: function(typeKey, options) {
		var currentIds = this._recordsForType(typeKey).mapBy('id');
		var promise = this.get('adapter').findQuery(typeKey, options, currentIds).then(function(payload) {
			var ids = payload.ids;
			delete payload.ids;
			this._extractPayload(payload);

			return ids.map(function(id) {
				return this.getRecord(typeKey, id);
			}, this);
		}.bind(this));

		return Eg.PromiseArray.create({ promise: promise });
	},

	/**
	 * Returns true if the record is cached in the store, false otherwise.
	 *
	 * @param {String|Model} type
	 * @param {String} id
	 * @returns {Boolean}
	 */
	hasRecord: function(type, id) {
		return this.getRecord(type, id) !== null;
	},

	/**
	 * @param {Model} record
	 * @returns {Promise} The saved record
	 */
	saveRecord: function(record) {
		var _this = this;
		var type = record.typeKey;
		var isNew = record.get('isNew');
		var tempId = record.get('id');

		record.set('isSaving', true);

		if (isNew) {
			return this.get('adapter').createRecord(record).then(function(payload) {
				record.set('id', payload.id);
				record.set('isSaving', false);
				delete payload.id;

				var records = _this.get('_records.' + type);
				delete records[tempId];
				records[record.get('id')] = {
					timestamp: new Date().getTime(),
					record: record
				};

				this._extractPayload(payload);
				return record;
			}.bind(this));
		} else {
			return this.get('adapter').updateRecord(record).then(function(payload) {
				this._extractPayload(payload);
				record.set('isSaving', false);
				return record;
			}.bind(this));
		}
	},

	/**
	 * @param {Model} record
	 * @returns {Promise} Nothing on success, catch for error
	 */
	deleteRecord: function(record) {
		var type = record.typeKey;
		var id = record.get('id');
		var records = (this.get('_records.' + type) || {});

		record.set('isSaving', true);
		record.set('isDeleted', true);

		return this.get('adapter').deleteRecord(record).then(function(payload) {
			this._extractPayload(payload);
			record.set('isSaving', false);
			delete this.get('_records.' + type)[id];
		}.bind(this));
	},

	/**
	 * @param {Model} record
	 * @returns {Promise} The reloaded record
	 */
	reloadRecord: function(record) {
		
		record.set('isReloading', true);

		return this.get('adapter').find(record.typeKey, record.get('id')).then(function(payload) {
			this._extractPayload(payload);
			record.set('isReloading', false);
			return record;
		}.bind(this));
	},

	_extractPayload: function(payload) {
		Em.keys(payload).forEach(function(typeKey) {
			var type = this.modelForType(typeKey);

			payload[typeKey].forEach(function(json) {
				var record = this.getRecord(typeKey, json.id);

				if (record) {
					// TODO: Reloading dirty records
					if (!record.get('isDirty')) {
						record._loadData(json);
					} else {
						
					}
				} else {
					this._loadRecord(typeKey, json);
				}
			}, this);
		}, this);
	}
});


})();

(function() {

Eg.Store.reopen({
	/**
	 * Holds all of the relationships that are waiting to be connected to a record
	 * when it gets loaded into the store. (relationship ID -> relationship)
	 *
	 * @type {Object.<String, Relationship>}
	 */
	_queuedRelationships: null,

	/**
	 * @param {String} typeKey
	 * @param {String} id
	 * @returns {Boolean}
	 * @private
	 */
	_hasQueuedRelationships: function(typeKey, id) {
		var queued = Eg.util.values(this.get('_queuedRelationships'));

		for (var i = 0; i < queued.length; i = i + 1) {
			if (queued[i].get('type2') === typeKey && queued[i].get('object2') === id) {
				return true;
			}
		}

		return false;
	},

	/**
	 * Will connect all queued relationships to the given record.
	 *
	 * @param {Model} record
	 * @private
	 */
	_connectQueuedRelationships: function(record) {
		var queued = this.get('_queuedRelationships');
		var toConnect = this._queuedRelationshipsFor(record.typeKey, record.get('id'));

		toConnect.forEach(function(relationship) {
			record._connectRelationship(relationship);
			relationship.set('object2', record);
			delete queued[relationship.get('id')];
		});

		this.notifyPropertyChange('_queuedRelationships');
	},

	/**
	 * Gets all of the relationships that are queued to be connected to the given record.
	 * Does not deleted the relationships from the queue, just fetches them.
	 *
	 * @param {String} typeKey
	 * @param {String} id
	 * @returns {Relationship[]}
	 * @private
	 */
	_queuedRelationshipsFor: function(typeKey, id) {
		return Eg.util.values(this.get('_queuedRelationships')).filter(function(relationship) {
			return (relationship.get('type2') === typeKey && relationship.get('object2') === id);
		});
	},

	/**
	 * Creates a new relationship and connects the two records,
	 * queueing the relationship if necessary.
	 *
	 * @param {String} type1
	 * @param {String} relationship1
	 * @param {String} id1
	 * @param {String} type2
	 * @param {String} relationship2
	 * @param {String} id2
	 * @param {Boolean} saved True if a server side relationship, false if a client side relationship
	 */
	_createRelationship: function(type1, relationship1, id1, type2, relationship2, id2, saved) { // jshint ignore:line
		var record1 = this.getRecord(type1, id1);
		var record2 = this.getRecord(type2, id2);

		if (record1 === null && record2 === null) {
			return;
		}

		if (record1 === null) {
			var temp = record1;
			record1 = record2;
			record2 = temp;

			temp = id1;
			id1 = id2;
			id2 = id1;

			temp = relationship1;
			relationship1 = relationship2;
			relationship2 = temp;
		}

		if (relationship1 === null) {
			return;
		}

		if (record1._isLinkedTo(relationship1, id2)) {
			// Do we need to check both sides, or can we assume consistency?
			return;
		}

		var relationship = Eg.Relationship.create({
			object1: record1,
			relationship1: relationship1,
			object2: (record2 === null ? id2 : record2),
			relationship2: relationship2,
			state: (saved ? 'saved' : 'new')
		});

		record1._connectRelationship(relationship);

		if (record2 !== null) {
			record2._connectRelationship(relationship);
		} else {
			this.set('_queuedRelationships.' + relationship.get('id'), relationship);
			this.notifyPropertyChange('_queuedRelationships');
		}
	},

	/**
	 * Deletes the given relationship. Disconnects from both records,
	 * then destroys, all references to the relationship.
	 *
	 * @param {String} id
	 */
	_deleteRelationship: function(id) {
		var relationship = Eg.Relationship.getRelationship(id);
		if (Em.isNone(relationship)) {
			return;
		}

		var object1 = relationship.get('object1');
		var object2 = relationship.get('object2');

		object1._disconnectRelationship(relationship);
		if (object2 instanceof Eg.Model) {
			object2._disconnectRelationship(relationship);
		} else {
			delete this.get('_queuedRelationships')[id];
			this.notifyPropertyChange('_queuedRelationships');
		}

		Eg.Relationship.deleteRelationship(id);
	},

	_changeRelationshipState: function(id, state) {
		var relationship = Eg.Relationship.getRelationship(id);
		if (Em.isNone(relationship) || relationship.get('state') === state) {
			return;
		}

		var object1 = relationship.get('object1');
		var object2 = relationship.get('object2');

		var oldHash = Eg.Relationship.stateToHash(relationship.get('state'));
		var newHash = Eg.Relationship.stateToHash(state);

		relationship.set('state', state);

		object1.set(newHash + '.' + id, object1.get(oldHash + '.' + id));
		delete object1.get(oldHash)[id];
		object1.notifyPropertyChange(oldHash);
		object1.notifyPropertyChange(newHash);

		if (object2 instanceof Eg.Model) {
			object2.set(newHash + '.' + id, object2.get(oldHash + '.' + id));
			delete object2.get(oldHash)[id];
			object2.notifyPropertyChange(oldHash);
			object2.notifyPropertyChange(newHash);
		}
	}
});


})();