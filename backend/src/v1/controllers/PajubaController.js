const connection = require('../../database/connection');
const { format, parseISO, compareAsc } = require('date-fns');
const brLocale = require('date-fns/locale/pt-BR');

module.exports = {
    async index(request, response) {
        try {
            const { page = 1, size = 10 } = request.query;
            const [count] = await connection('Pajuba').count();
            const pajubas = await connection('Pajuba')
                .limit(size)
                .offset((page - 1) * size)
                .select('*');

            response.header('X-Total-Count', count['count(*)']);

            return response.json(pajubas);

        } catch (err) {
            return response.status(400).json({ error: `${err}` });
        }
    },

    async get(request, response) {
        try {
            const { id } = request.params;

            const pajuba = await connection('Pajuba')
                .where('id', id)
                .select('*')
                .first()

            if (pajuba) {
                return response.json(pajuba);
            } else {
                return response.status(404).send()
            }
        }
        catch (err) {
            return response.status(400).json({ error: `${err}` });
        }
    },

    async getRandom(request, response) {
        try {
            const pajuba = await connection('Pajuba')
                .select('*')
                .orderByRaw("RANDOM()")
                .limit(1)
                .first()

            if (pajuba) {
                return response.json(pajuba);
            } else {
                return response.status(404).send()
            }
        }
        catch (err) {
            return response.status(400).json({ error: `${err}` });
        }
    },

    async wordOfDay(request, response) {
        try {
            const { date = new Date() } = request.query;
            const today = new Date();                   

            if (compareAsc(date, today) === 1) {
                return response.boom.badRequest('Future dates not allowed');
            }

            
            let parsedDate = date.toISOString().replace(/T.*?Z/,'');
            
            const wordOfDay = await connection('Wordofday')
                .select('*')
                .where('date', '=', parsedDate.trim())
                .first();

            if (!wordOfDay) {
                return response.boom.notFound();
            }

            const pajuba = await connection('Pajuba')
                .where('id', wordOfDay.pajuba)
                .select('*')
                .first()

            if (pajuba) {
                return response.json(pajuba);
            } else {
                return response.boom.notFound('Record not found');
            }
        }
        catch (err) {
            return response.boom.badRequest(err);
        }
    },

    async patch(request, response) {
        try {
            const { id } = request.params;

            const { expression, description, region, usage } = request.body;

            const pajuba = await connection('Pajuba')
                .where('id', id)
                .select('*')
                .first();

            if (pajuba) {
                const updated = {
                    expression: expression ? expression : pajuba.expression,
                    description: description ? description : pajuba.description,
                    region: region ? region : pajuba.region,
                    usage: usage ? usage : pajuba.usage
                }
                await connection('Pajuba').update(updated).where('id', id);

                return response.status(204).send();
            } else {
                return response.status(404).send()
            }
        }
        catch (err) {
            return response.status(400).json({ error: `${err}` });
        }
    },

    async create(request, response) {
        try {
            const { expression, description, region, usage } = request.body;
            const [count] = await connection('Pajuba').where('expression', expression).select('*').count();

            if (parseInt(count['count(*)']) > 0) {
                return response.status(400).send({ error: 'Conflicted name' })
            }

            const [id] = await connection('Pajuba').insert({ expression, description, region, usage });

            response.header('Location', `${request.baseUrl}/pajubas/${id}`);
            return response.status(201).json({ id });
        }
        catch (err) {
            return response.status(400).json({ error: `${err}` });
        }

    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            const pajuba = await connection('Pajuba')
                .where('id', id)
                .select('*')
                .first()

            if (pajuba) {
                await connection('Pajuba')
                    .where('id', id).delete();

                return response.status(204).send();
            } else {
                return response.status(404).send()
            }
        }
        catch (err) {
            return response.status(400).json({ error: `${err}` });
        }
    },
}

