import { createSession, createStep, openPage } from "../../support/utilities/general";
import Chat from "../../support/models/chat";
import Profile from "../../support/models/profile";
import Login from "../../support/models/login";

const adminHandleName = Cypress.env('adminHandleName');
const adminPassword = Cypress.env('adminPassword');
const testHandleName = Cypress.env('testUserHandleName');
const testPassword = Cypress.env('testUserPassword');


describe('General chat', () => {
    beforeEach('', () => {
        createStep('Fill in handle name and password.'); 
        createSession('Login', () => Login.login(adminHandleName, adminPassword));
        openPage(Cypress.env('baseUrl'));
    });
    it('User is able to send message', { tags: ['@smoke'] }, () => {
        createStep('Send message to chat.'); 
        Chat.sendMessage('Hello World!');
        createStep('Check if message was sent.'); 
        Chat.checkMessage('Hello World!', 'Admínek');
    });

    it('User is able to send message by enter key', () => {
        createStep('Send message by enter key to chat.'); 
        Chat.sendMessage('Message sent by enter key', true);
        createStep('Check if message was sent.');
        Chat.checkMessage('Message sent by enter key', 'Admínek');
    });
    it('User is able to like/unlike his message', () => {
        createStep('Send message to chat.');
        Chat.sendMessage('Testing like button');
        createStep('Give a like to sent message');
        Chat.buttonLike('Testing like button')
        .first()
        .click()
        Chat.buttonLike('Testing like button')
        .should('contains', '1 likes')
        Chat.buttonLike('Testing like button')
        .click()
        Chat.buttonLike('Testing like button')
        .should('contains', '0 likes');
    });
    it('User recieves message from chat', { tags: ['@smoke'] }, () => {
        createStep('Send message to chat.');
        Chat.sendMessage('Did you recieve this message?');
        createStep('Move to Profile section.');
        Profile.navProfile().click();
        createStep('Log out');
        Profile.buttonLogout().click();
        createStep('Log in as another user.');
        Login.login(testHandleName, testPassword);
        createStep('Check if message was sent and is visible.');
        Chat.checkMessage('Did you recieve this message?','Admínek');
    });

    it('User is able to like message from another user', () => {
        //TODO:
    });

    it('User is able open user profile', () => {
        //TODO:
    });
  });