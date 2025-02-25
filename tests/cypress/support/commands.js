// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createRedirectRule', (from, to, notes = '', regex = false ) => {
	cy.visit('/wp-admin/post-new.php?post_type=redirect_rule');

	cy.get('#srm_redirect_rule_from').click().clear().type(from);
	cy.get('#srm_redirect_rule_to').click().clear().type(to);
	cy.get('#srm_redirect_rule_notes').click().clear().type(notes);

	if ( regex ) {
		cy.get('#srm_redirect_rule_from_regex').check();
	}

	cy.get('#publish').click();
	cy.get( '.updated' ).should( 'be.visible' );
});

Cypress.Commands.add('verifyRedirectRule', (from, to) => {
	cy.visit(`/${from}`);
	cy.url().should('include', to);
	cy.visit(`/${from}/`);
	cy.url().should('include', to);
});
