import {expect, test} from 'bun:test';
import {isFlakyError} from '../is-flaky-error';

test('classifies media frame extraction timeouts as retryable on Lambda', () => {
	const error = new Error(
		'Timeout while extracting frame at time 0.25sec from https://example.com/audio.mp3',
	);
	expect(isFlakyError(error)).toBe(true);
});

test('does not classify unrelated audio extraction errors as retryable', () => {
	expect(isFlakyError(new Error('Unsupported audio codec'))).toBe(false);
	expect(isFlakyError(new Error('Timeout while parsing metadata'))).toBe(false);
});
