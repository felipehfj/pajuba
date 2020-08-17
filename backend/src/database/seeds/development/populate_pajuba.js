
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pajuba').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pajuba').insert([
        {id: 1, expression: 'abafa o bofe', description:'expressão usada quando um bofe do bem ou um bofe escândalo deve ou merece ser aqüendado', region:'Pernambuco', usage: ''},
        {id: 2, expression: 'abafa o caso', description:'expressão usada quando alguém não está a fim ou não está mais podendo ouvir determinada conversa ou comentário; usa-se ainda quando alguém, por algum motivo, não quer que o assunto seja levado adiante', region:'', usage:''},
        {id: 3, expression: 'abalar', description:'fazer algo bem feito ', region:'', usage:''},
        {id: 4, expression: 'abduzida', description:'pessoa cega de paixão ou que mitifica outra ', region:'', usage:''},
        {id: 5, expression: 'abilolado', description:'', region:'Pernambuco', usage:''},
        {id: 6, expression: 'adé ', description:'homossexual masculino', region:'', usage:''},
        {id: 7, expression: 'adé fontó', description:'homossexual masculino enrustido', region:'', usage:''},
        {id: 8, expression: 'afofi ', description:'variante de ofofi', region:'', usage:''},
        {id: 9, expression: 'áfrica', description:'cansativo, chato, difícil', region:'São Paulo', usage:'isso está ficando tão áfrica'},
        {id: 10, expression: 'agasalhar', description:'ato de envolver um pênis com o ânus e o reto ', region:'', usage:''},
        {id: 11, expression: 'ai meu edi', description:'expressão que significa ai meu cu ou ai que saco', region:'', usage:''},
        {id: 12, expression: 'ajé', description:'ruim, péssimo', region:'', usage:''},
        {id: 13, expression: 'ajeum', description:'comida, rango, gororoba, ebó ', region:'', usage:''},
        {id: 14, expression: 'aleijo', description:'porcaria; de má qualidade; Uma situação embaraçosa, delicada ou conflitante; algo que não deu certo ', region:'', usage:''},
        {id: 15, expression: 'alibã', description:'policial; polícia', region:'', usage:''},
        {id: 16, expression: 'alibete', description:'roubo, elza', region:'', usage:''},
        {id: 17, expression: 'alma', description:'pessoa', region:'Pernambuco', usage:''},
        {id: 18, expression: 'alma sebosa', description:'pessoa chata e escrota; pessoa do além; malassombrada ', region:'Pernambuco', usage:''},
      ]);
    });
};