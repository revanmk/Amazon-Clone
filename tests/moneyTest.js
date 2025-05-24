import formatCurrency from '../scripts/utils/money.js'; // Update the path to your module

console.log("Testing for formatCurrency()");
function testFormatCurrency() {
  const testCases = [
    { input: 1234, expected: "12.34" },
    { input: 199, expected: "1.99" },
    { input: 0, expected: "0.00" },
    { input: 1, expected: "0.01" },
    { input: -150, expected: "-1.50" },
    { input: 999999, expected: "9999.99" },
    { input: 250, expected: "2.50" },
    { input: 5.5, expected: "0.06" }, // Rounded to 6 cents
    { input: 274.7, expected: "2.75" }, // Rounded from 2.747
  ];

  testCases.forEach(({ input, expected }, index) => {
    const result = formatCurrency(input);
    const pass = result === expected ? '✅' : '❌';
    console.log(
      `Test ${index + 1}: formatCurrency(${input}) = "${result}" | Expected: "${expected}" ${pass}`
    );
  });
}

testFormatCurrency();
