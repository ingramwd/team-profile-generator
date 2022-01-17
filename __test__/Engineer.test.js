const Engineer = require('../lib/Engineer');

test('getting engineers github username', () => {
    const engineer = new Engineer('William', 26, "Ingramwd01@gmail.com", "Ingramwd")

    expect(engineer.getGithub()).toBe('Ingramwd');
});