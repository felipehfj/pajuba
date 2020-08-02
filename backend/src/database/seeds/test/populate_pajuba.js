
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pajuba').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pajuba').insert([
        {id: 1, expression: 'abafa o bofe', description:'expressão usada quando um bofe do bem ou um bofe escândalo deve ou merece ser aqüendado', region:'Pernambuco', usage: ''},
        {id: 2, expression: 'abafa o caso', description:'expressão usada quando alguém não está a fim ou não está mais podendo ouvir determinada conversa ou comentário; usa-se ainda quando alguém, por algum motivo, não quer que o assunto seja levado adiante', region:'', usage:''},
        {id: 3, expression: 'abalar', description:'fazer algo bem feito', region:'', usage:''},
      ]);
    });
};

