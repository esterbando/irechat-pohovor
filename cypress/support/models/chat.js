class Chat {

    navChat = () => cy.contains('a', 'Chat');
    message = (msgText) => cy.contains('.event', msgText);
    buttonLike = (msgText) => this.message(msgText).find('.like');
    userImage = (msgText) => this.message(msgText).find('img');
    inputMessage = () => cy.get('.message-input');
    buttonSendMessage = () => cy.contains('button', 'Send');

    sendMessage(message, enter = false){
        if(enter) {
            this.inputMessage().type(`${message}{enter}`);
        } else {
            this.inputMessage().type(message);
            this.buttonSendMessage().click();
        }
    }
    checkMessage(msgText, sender){
        this.message(msgText).should('exist').and('be.visible').and('contain', sender);
        this.userImage(msgText).should('exist').and('be.visible');
        this.buttonLike(msgText).should('exist').and('be.visible');
    }
}

module.exports = new Chat()