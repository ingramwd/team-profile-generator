const Intern = require('../lib/Intern');

test('Testing what school the intern goes too', () => {
    const intern = new Intern('William', 26, 'Ingramwd01@gmail.com', 'OSU');

    expect(intern.getSchool()).toBe('OSU');
})