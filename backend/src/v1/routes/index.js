const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();

const PajubaController = require('../controllers/PajubaController');

const validate = {
    pajuba: {
        create: celebrate({
            [Segments.BODY]: Joi.object().keys({
                expression: Joi.string().required().max(1000),
                description: Joi.string().max(4000),
                region: Joi.string().allow('', null).max(100),
                usage: Joi.string().allow('', null).max(4000),
            })
        }),
        index: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
                size: Joi.number(),
            })
        }),
        patch: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                expression: Joi.string().required().max(1000),
                description: Joi.string().max(4000),
                region: Joi.string().allow('', null).max(100),
                usage: Joi.string().allow('', null).max(4000),
            })
        }),
        get: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
        wordOfDay: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                date: Joi.date(),
            })
        }),
        expression: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                word: Joi.string(),
            })
        }),
        delete: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
    },
}

routes.get('/pajubas', validate.pajuba.index, PajubaController.index);
routes.get('/pajubas/random', PajubaController.getRandom);
routes.get('/pajubas/wordOfDay',validate.pajuba.wordOfDay, PajubaController.wordOfDay);
routes.get('/pajubas/expression/:word',validate.pajuba.expression, PajubaController.getExpression);
routes.get('/pajubas/:id', validate.pajuba.get, PajubaController.get);
routes.patch('/pajubas/:id', validate.pajuba.patch, PajubaController.patch);
routes.post('/pajubas',validate.pajuba.create, PajubaController.create);
routes.delete('/pajubas/:id', validate.pajuba.delete, PajubaController.delete);

module.exports = routes;