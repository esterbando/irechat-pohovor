export function openPage(url){
    cy.visit(url)
    cy.url().should('contain', url)
}

export function createSession(sessionName, callback){
    cy.session(sessionName, callback);
}

export function createStep(step){
    cy.step(step);
}