/// <reference types="cypress" />

describe('Validação de Login', () => {

  const infConta= {
    'email':'teste@teste.com',
    'nome':'Teste Cypress',
    'senha':'Teste@1234'
  }
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
  });

  context('Login em conta com Saldo', () => {
    it('Cadastro de conta sem saldo', () => {
      // cy.wait(10000);
      cy.contains("button","Registrar").click();
      
      cy.get('.card__register [name="email"]').type(infConta.email,{force:true});
      cy.get('.card__register [name="name"]').type(infConta.nome,{force:true});
      cy.get('.card__register [name="password"]').type(infConta.senha,{force:true});
      cy.get('.card__register [name="passwordConfirmation"]').type(infConta.senha,{force:true});
      cy.get('#toggleAddBalance').click({force:true});

      cy.get('.card__register [type="submit"]').click({force:true});
      cy.get('#btnCloseModal').should('have.text','Fechar').click();


      cy.get('.card__login [name="email"]').type(infConta.email,{force:true});      
      cy.get('.card__login [name="password"]').type(infConta.senha,{force:true});
      cy.get('.login__buttons [type="submit"]').should('have.text','Acessar').click();

      cy.get('#textName').should('have.text',`Olá ${infConta.nome},`);
      cy.get('#textBalance span').invoke('text').should(text => { expect(text).to.match(/1\.?000,00/)});

  
});  
  });

});
