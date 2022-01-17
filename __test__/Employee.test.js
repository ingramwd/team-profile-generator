const Employee = require('../lib/Employee');


test('creating Employee object', () => {
    const employee = new Employee('William', 26, 'Ingramwd01@gmail.com');

    expect(employee.name).toBe('William');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toBe('Ingramwd01@gmail.com');
});

test('Getting Employee Name', () => {
    const employee = new Employee('William', 26, 'Ingramwd01@gmail.com');

    expect(employee.getName()).toBe('William');
});

test('Getting Employee ID', () => {
    const employee = new Employee('William', 26, 'ingramwd01@gmail.com');

    expect(employee.getId()).toEqual(expect.any(Number));
});

test('Getting Employee Email', () => {
    const employee = new Employee('William', 26, 'ingramwd01@gmail.com');

    expect(employee.getEmail()).toBe('ingramwd01@gmail.com');
})