/**
 * When serializing, will coerce to a timestamp. Numbers, dates and strings are are converted to dates,
 * then timestamps. Everything else serializes to null.
 *
 * When deserializing, numbers and strings are converted to dates, everything is is converted to null.
 */
EG.DateType = EG.AttributeType.extend({

	/**
	 * @param {*} obj Javascript object
	 * @returns {Object} JSON representation
	 */
	serialize: function(obj) {
		switch (Em.typeOf(obj)) {
			case 'date':
				return obj.getTime();
			case 'number':
				return obj;
			case 'string':
				return new Date(obj).getTime();
			default:
				return null;
		}
	},

	/**
	 * @param {Object} json JSON representation of object
	 * @returns {*} Javascript object
	 */
	deserialize: function(json) {
		switch (Em.typeOf(json)) {
			case 'number':
			case 'string':
				return new Date(json);
			default:
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