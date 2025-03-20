/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('./src/index.html')
  })
})*/

describe('Central de Atendimento ao Cliente TAT', () => {   

  beforeEach(() => {  //executa o cy.visit antes de cada bloco it

    cy.visit('./cypress-do-zero-a-nuvem/src/index.html') //vista a url digitada
  })

  
  it('verifica o título da aplicação', () => {
    
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') // should = usado para verificar se algo está como esperado e be.equal =verifica se um valor é exatamente igual ao esperado

      })

      it('preenche os campos obrigatorios e envia o formulario',() => {        
        cy.get('#firstName').type('paulo')
        cy.get('#lastName').type('pinheiro')
        cy.get('#email').type('fredysoh@gmail.com')
        cy.get('#phone').type('969356410')
        cy.get('select').select('cursos') // usar select onde há campos de seleção
        cy.get('#email-checkbox').check()
        cy.get('#open-text-area').type('olá' ,{delay : 0})
        cy.get('button[type="submit"]').click() // vai pegar a classe botão e verificar qual o tipo de botão é , nesse caso submit para evitar erro com outros botões

        cy.get('.success').should('be.visible')  // garante que todos os elementos preenchidos estejam visiveis 
                
      })

      it('exibe mensagem de erro ao submeter o formulario com um e-mail errado' ,() => {
        cy.get('#firstName').type('paulo')
        cy.get('#lastName').type('pinheiro')
        cy.get('#email').type('fredysoh@gmail,com') // erro alteração de . para , no e-mail
        cy.get('#phone').type('969356410')
        cy.get('select').select('cursos')
        cy.get('#email-checkbox').check()
        cy.get('#open-text-area').type('olá' ,{delay : 0})
        cy.get('button[type="submit"]').click() // vai pegar a classe botão e verificar qual o tipo de botão é , nesse caso submit para evitar erro com outros botões

        cy.get('.error').should('be.visible') // vai fazer com que a mensagem de erro fique visivel após a validação do teste

      })

      it(' validar que, se um valor não-numérico for digitado, seu valor continuará vazio' ,() => {
        cy.get('#phone') // pega o numero do telefone
        .type('abcdef') // informa o tipo, no caso string
        .should('have.value', '') //informa que se o valor do tipo for igual a string o campo fica em branco

      })

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
        cy.get('#firstName').type('paulo')
        cy.get('#lastName').type('pinheiro')
        cy.get('#email').type('fredysoh@gmail.com')   
        // não há numero de telefone
        cy.get('select').select('cursos')
        cy.get('#phone-checkbox').check() // pode ser usado também o comando .click , para que o teste de certo é necessario validar o phone como contato preferencial
        cy.get('#open-text-area').type('olá')
        cy.get('button[type="submit"]').click() // vai pegar a classe botão e verificar qual o tipo de botão é , nesse caso submit para evitar erro com outros botões

        cy.get('.error').should('be.visible')

      })

      it('preenche e limpa os campos nome, sobrenome, email e telefone',() => {
        cy.get('#firstName')
        .type('paulo')
        .should('have.value' , 'paulo')
        .clear() // limpa o campo preenchido
        .should('have.value', '') //verifica se o campo está sem valor
        
        
        cy.get('#lastName')
        .type('pinheiro')
        .should('have.value' , 'pinheiro')
        .clear() // limpa o campo preenchido
        .should('have.value', '') //verifica se o campo está sem valor
        
        cy.get('#email')
        .type('fredysoh@gmail.com') // erro alteração de . para , no e-mail
        .should('have.value' , 'fredysoh@gmail.com')
        .clear() // limpa o campo preenchido
        .should('have.value', '') //verifica se o campo está sem valor

        cy.get('#phone')
        .type('969356410')
        .should('have.value' , '969356410')
        .clear() // limpa o campo preenchido
        .should('have.value', '') //verifica se o campo está sem valor
   
      })

      it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

      })

      it('envia o formuário com sucesso usando um comando customizado',() => {
        cy.TesteAutomaticoDeTodosItens() //puxa a função (comandos customizados) TesteAutomaticoDeTodosItens criada na pasta suporte/commands.js, nessa função estão todos os testes

        cy.get('.success').should('be.visible') // torna visivel a mensagem de sucesso após o preenchimento de todos os campos corretamente

      })
     
      it('REFAZENDO OS TESTES COM A MANIPULACAO DOS DADOS CUSTAMIZADOS', () => {
        //criar uma variavel /objeto para ser manipulado pela função dentro da asta suport/commands.js
      const data = {
      firstName:  'Fred',
      lastName: 'Pinheiro',
      email: 'fredysoh@gmail.com',
      text: 'teste'
      // quando se cria um objeto o mesmo deve conter o primeiro nome seguido de : e depois o valor entre parenteses
    }

        cy.TesteAutomaticoDeTodosItensManipulado(data)

        cy.get('.success').should('be.visible')

      })

      it('Refazendo os testes utilizando o comando cy.contains no comando botão',() => {

        cy.get('#firstName').type('paulo')
        cy.get('#lastName').type('pinheiro')
        cy.get('#email').type('fredysoh@gmail.com')
        cy.get('#phone').type('969356410')
        cy.get('select').select('cursos') // usar select onde há campos de seleção
        cy.get('#email-checkbox').check()
        cy.get('#open-text-area').type('olá' ,{delay : 0})
        cy.contains('button','Enviar').click() // usando o contains. para pegar um texto especifico para o comando click no cado : elemento 'button' que contem o texto 'Enviar'

        cy.get('.success').should('be.visible')  // garante que todos os elementos preenchidos estejam visiveis 
      })

      it('Seleciona um produto (YouTube) por seu texto',() => {

        cy.get('#product') // selecionado id produto
          .select('YouTube') //  seleciona a opção pelo texto dentro do valor youtube
          .should('have.value', 'youtube')   // confirma se o select YouTube está dentro da opção : option value="youtube"
        
      })

      it('Seleciona um produto (Mentoria) pelo valor',() => {

        cy.get('#product') // selecionado id produto
          .select('mentoria') // seleciona a opção pelo valor dentro do produto
          .should('have.value', 'mentoria')   // confirma se o select YouTube está dentro da opção : option value="youtube"
        
      })

      it('Seleciona um produto (blog) pelo indice', () => {

        cy.get('#product') // selecionado id produto
          .select(1) // seleciona a opção pelo indice , primeiro ,segundo e etc...
          .should('have.value', 'blog')   // cconfirmar se o indice 1 é a opção blog
        
      })

      it('Marca o tipo de atendimento, opção : Feedback', () => {

        cy.get('input[type="radio"][value="feedback"]') // busca o campo de check com valor feedback
        .check()
        .should('be.checked')  // valida o se o checkbox está marcado
        
      })

      it('Marca o tipo de atendimento', () => {
        //                                    função
        cy.get('input[type="radio"]').each((TipoAtendimento) => {      // each pega uma lista de elementos e percorre um por um dentro dele se cria uma função para 
          //guardar todos os elementos , no caso a função criada foi TipoAtendimento
          cy.wrap(TipoAtendimento)// clica em cada um dos elementos
          .check() 
          .should('be.checked')

           })
                
      })

      it('validar ambos checkbox e depois desmarcar o ultimo ',() => {

        cy.get('input[type="checkbox"]')  // vai marcar todas as opções de checkbox
        .check()
        .should('be.checked') // verifica se todas as opções de checkbox estão marcadas
        .last() // vai pegar o ultimo checkbox
        .uncheck() // vai desmarcar o ultimo checkbox 
        .should('not.be.checked')

        //cy.get('#email-checkbox').check()
       // cy.get('#phone-checkbox').check()
       // cy.get('#phone-checkbox').uncheck()

      })

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário usando check ao inves de click',() => {
        cy.get('#firstName').type('paulo')
        cy.get('#lastName').type('pinheiro')
        cy.get('#email').type('fredysoh@gmail.com')   
        // não há numero de telefone
        cy.get('select').select('cursos')
        cy.get('#phone-checkbox').check() // pode ser usado também o comando .click , para que o teste de certo é necessario validar o phone como contato preferencial
        cy.get('#open-text-area').type('olá')
        //cy.get('button[type="submit"]').click() // vai pegar a classe botão e verificar qual o tipo de botão é , nesse caso submit para evitar erro com outros botões
        cy.get('#phone-checkbox').check()
        .should('be.checked')        

      })

      it('Seleciona um arquivo da pasta fixtures',() => {
        cy.get('#file-upload') // seleciona o elemento input do tipo file
          .selectFile('cypress/fixtures/example.json') // caminho do arquivo que vai ser anexado para o texte
          // verificando com should
       .should(input => {
         expect(input[0].files[0].name).to.equal('example.json') //verifica se o caminho especificado contem o arqvuio com o nome example.json
       
        })
      })

      it('SELECIONA UM ARQUIVO SIMULANDO UM DRAG-AND-DROP (ARRASTAR E SOLTAR)',() => {
        cy.get('input[type=file]')
          .selectFile('cypress/fixtures/example.json' , {action: 'drag-drop'}) // {action: 'drag-drop'} simula arrastar o arquivo e soltar para fazer upload
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json') //verifica se o caminho especificado contem o arqvuio com o nome example.json
         
        }) 
      })

      it('Abrir a pagina politica de qualidade',() => {
        cy.get('a[href="privacy.html"]')  // seleciona o link
         .invoke('removeAttr', 'target') //Remove o atributo target para abrir na mesma aba , pois o target direciona a abertura da pagina em outra aba
          .click()

          cy.url().should('include', 'privacy.html'); // verifica se a url está correta    

      
          
        
      
      
        })

      it.only('Abrir a pagina politica de qualidade sem click',() => {

        cy.visit('./cypress-do-zero-a-nuvem/src/privacy.html'); // Acessa diretamente a página
          cy.url().should('include', 'privacy.html'); // Verifica a URL sem a necessidade do click

      })


})
