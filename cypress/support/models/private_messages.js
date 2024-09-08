class PrivateMessages {
    navPrivateMessages = () => cy.contains('a', 'Private Messages');
}

module.exports = new PrivateMessages()