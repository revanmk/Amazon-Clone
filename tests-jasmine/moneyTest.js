import { formatCurrency } from '../scripts/utils/money.js';

describe('test suite : formatCurrency', () => {
  it('converts cents to dollars correctly', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0 cents', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('works with exactly one dollar', () => {
    expect(formatCurrency(100)).toEqual('1.00');
  });

  it('handles values ending with 0 cents', () => {
    expect(formatCurrency(5000)).toEqual('50.00');
  });

  it('handles single-digit cents correctly', () => {
    expect(formatCurrency(5)).toEqual('0.05');
  });

  it('handles values that round up correctly', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('handles values that round down correctly', () => {
    expect(formatCurrency(201)).toEqual('2.01');
  });

  it('handles negative cents', () => {
    expect(formatCurrency(-150)).toEqual('-1.50');
  });

  it('handles large numbers', () => {
    expect(formatCurrency(987654321)).toEqual('9876543.21');
  });

  it('rounds fractions of a cent properly (e.g. input with decimal)', () => {
    expect(formatCurrency(199)).toEqual('1.99');
    expect(formatCurrency(200)).toEqual('2.00'); // rounded to 200 then 2.00
  });

  it('rounds fractions of a cent down', () => {
    expect(formatCurrency(199.4)).toEqual('1.99'); // rounded to 199 then 1.99
  });
});
