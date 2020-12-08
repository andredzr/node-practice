const fs = require('fs');
const args = process.argv.slice(2);
fs.readFile('employees.csv', 'utf8', function (err, data) {
  if (err) {
    console.log(err.message);
    return;
  }

  //////// This part of the code (mostly) taken from: https://stackoverflow.com/a/64396703
  //This converts the coming data into an array of objects.
  // headerLina = upper row, lines=all the others
  const [headerLine, ...lines] = String(data).split('\n');
  const valueSeparator = ',';
  const headers = headerLine.split(valueSeparator);

  // Create objects from parsing lines
  // There will be as much objects as lines
  const objects = lines
    .map((line) =>
      line
        // Split line with value separators
        .split(valueSeparator)
        // Reduce values array into an object like: { [header]: value }
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        .reduce(
          // Reducer callback 
          (object, value, index) => ({
            ...object,
            [headers[index]]: value,
          }),
          // Initial value (empty JS object)
          {}
        )
    );

  ///////////////////////// end of code adapted from https://stackoverflow.com/a/64396703   
  if (args[1] === undefined && args[0] === undefined) {
    var output = objects;
  } else {
    var output = objects.find(item => item.id === args[0]);
    if (output === undefined) {
      throw 'There probably is not an employee with such an id';
    }
    if (args[1] !== undefined) {
      output = output[args[1]];
    }
  }
});