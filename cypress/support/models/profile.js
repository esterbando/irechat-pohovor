class Profile {

    navProfile = () => cy.contains('a', 'Profile');
    buttonLogout = () => cy.contains('a', 'Log out');

}

module.exports = new Profile()