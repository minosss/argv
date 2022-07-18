function camelcase(key) {
	return key.replace(/-(\w)/g, (_, ch) => ch.toUpperCase());
}

function isNumberLike(val) {
	return /^(-)?\d+(\.\d+)?$/.test(val);
}

function toArray(value) {
	return Array.isArray(value) ? value : [value];
}

const DEFINE_REGEX = /^--([\w-]+)=([\S\s]*)$/;
const BOOLEAN_REGEX = /^--(no-)?([\w-]+)$/;

export default function parser(args) {
	const result = {
		_: [],
	};

	if (args.includes('--')) {
		result['__'] = args.slice(args.indexOf('--') + 1);
		args = args.slice(0, args.indexOf('--'));
	}

	for (const arg of args) {
		if (DEFINE_REGEX.test(arg)) {
			const [_, key = '~.~', value = '~.~'] = DEFINE_REGEX.exec(arg) || [];
			const camelKey = camelcase(key);

			if (isNumberLike(value)) {
				const num = Number.parseFloat(value);
				// if parse fails, fallback
				const fail = Number.isNaN(num) || (num + '').length !== value.length;
				result[camelKey] = fail ? value : num;
			} else {
				// exists
				if (result[camelKey] !== undefined && result[camelKey] !== true) {
					result[camelKey] = [...toArray(result[camelKey]), value];
				} else {
					result[camelKey] = value;
				}
			}
		} else if (BOOLEAN_REGEX.test(arg)) {
			const [_, no, key = '~.~'] = BOOLEAN_REGEX.exec(arg) || [];
			const camelKey = camelcase(key);

			result[camelKey] = !no;
		} else {
			result._.push(arg);
		}
	}

	return result;
}
