const { random } = require('lodash');
const Manager = require('../lib/Manager');

test('Getting Manager Office Number', () => {
    const manager = new Manager('William', 26, "Ingramwd01@gmail.com", 135);

    expect(manager.getOfficeNumber()).toEqual(expect.any(Number));
});