import { it, expect, describe } from "vitest";
import formatMony from "./money";

describe('formatMonyFunction', () => {
    it('format 1999 cense as $19.99', () => {
        expect(formatMony(1999)).toBe('$19.99');
    });

    it('display to desmals', () => {
        expect(formatMony(1090).toBe('$10.90'));
    });
});