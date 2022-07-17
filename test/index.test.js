import {expect, test} from 'vitest';
import parser from '../index.js';

test('parse args', () => {
	const args = ['--no-push', '--commit', '--tag=next', '--author-name=mino', '--beta=3', '--no-bad=good', 'major', '--', 'pass', 'to', 'somthing'];
	const r = parser(args);

	expect(r._[0]).eq('major');
	expect(r.push).eq(false);
	expect(r.commit).eq(true);
	expect(r.tag).eq('next');
	expect(r.beta).eq(3);
	expect(r.__).toHaveLength(3);
	expect(r.authorName).eq('mino');
	expect(r.noBad).eq('good');
});

test('duplicate keys', () => {
	const r = parser(['--filter=packages/*', '--filter=exts/*', '--foo', '--no-foo', '--bar', '--bar=bar']);

	expect(r.filter).toHaveLength(2);
	expect(r.filter[0]).eq('packages/*');
	expect(r.foo).eq(false);
	expect(r.bar).eq('bar');
})
