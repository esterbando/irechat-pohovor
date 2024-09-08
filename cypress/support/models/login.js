import Chat from "./chat";
import PrivateMessages from "./private_messages";
import Profile from "./profile";
import { openPage } from "../utilities/general";

class Login {
    inputHandleName = () => cy.get('#UserName');
    inputPassword = () => cy.get('#Password');
    buttonLogin = () => cy.contains('button', 'Login');
    buttonRegistration = () => cy.contains('button', 'Registration');
    chatWindow = () => cy.get('.chat-window');
    errorMessage = () => cy.get('.message');

    login(handleName, password) {
        openPage(Cypress.env('baseUrl'));
        this.inputHandleName().type(handleName);
        this.inputPassword().type(password);
        this.buttonLogin().click();
    }
    checkLogin(){
        cy.url().should('not.contain', '/User/Login');
        this.inputHandleName().should('not.exist');
        this.inputPassword().should('not.exist');
        this.buttonLogin().should('not.exist');
        this.chatWindow().should('exist').and('be.visible');
        Chat.inputMessage().should('exist').and('be.visible');
        Chat.buttonSendMessage().should('exist').and('be.visible');
        Chat.navChat().should('exist').and('be.visible').and('have.class', 'active');
        PrivateMessages.navPrivateMessages().should('exist').and('be.visible').and('not.have.class', 'active');
        Profile.navProfile().should('exist').and('be.visible').and('not.have.class', 'active');
    }
}

module.exports = new Login();