import { openPage, createStep } from "../../support/utilities/general";
import { data } from "../../fixtures/data";
import Login from "../../support/models/login";

const adminHandleName = Cypress.env('adminHandleName');
const adminPassword = Cypress.env('adminPassword');

describe('Log in', () => {
    beforeEach('', () => {
        openPage(data.baseUrl);
    });
    it('Log in with correct data', { tags: ['@smoke'] }, () => {
        createStep('Fill in handle name and password.'); 
        Login.login(adminHandleName, adminPassword);
        createStep('Check if login was succesful and user is redirect on chat page.');
        Login.checkLogin();
    });
    it('Log in with non-existing handle name', () => {
        createStep('Fill in non-existing handle name and random password.');
        Login.login('nonexist', 'nonexist');
        createStep('Login was not succesful and error message should appears.');
        Login.errorMessage().should('exist')
        .and('be.visible')
        .and('contain', 'There are some validation errors')
        .and('contain', 'Incorrect handle name or password.');
    });
    it('Log in with incorrect password', () => {
        createStep('Fill in existing handle name of user and incorrect password.');
        Login.login(adminHandleName, 'nonexist');
        createStep('Login was not succesful and error message should appears.');
        Login.errorMessage().should('exist')
        .and('be.visible')
        .and('contain', 'There are some validation errors')
        .and('contain', 'Incorrect handle name or password.');
    });
    it('Log in with empty inputs', () => {
        createStep('Inputs handle name and paasword are empty.');
        Login.buttonLogin().click();
        createStep('Login was not succesful and error messages should appear.');
        Login.errorMessage().should('exist')
        .and('be.visible')
        .and('contain', 'There are some validation errors')
        .and('contain', 'The Handle name field is required.')
        .and('contain', 'The Password field is required.');
    });
  });