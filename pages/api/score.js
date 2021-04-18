import { nSQL } from '@nano-sql/core'

const connectMiddleware = (handler) => async (req, res) => {
    const dbName = 'score-db'

    if (!nSQL().listDatabases().includes(dbName)) {
        await nSQL().createDatabase({
            id: dbName,
            mode: 'TEMP',
            tables: [
                {
                    name: "score",
                    model: {
                        "id:uuid": { pk: true },
                        "fullName:string": { notNull: true },
                        "phoneNumber:string": { notNull: true },
                        "score:string": {notNull: true},
                    },
                },
            ],
            version: 1,
        })
    }
    nSQL().useDatabase(dbName)

    return handler(req, res)
}
const saveScore = async (req, res) => {
    const { fullName, phoneNumber, score } = req.body
    const errors = {}
    if (!fullName) errors['fullName'] = 'full Name is required'
    if (!phoneNumber) errors['phoneNumber'] = 'phone Number is required'
    if (!score) errors['score'] = 'score is required'
    console.log(score);
    if (Object.keys(errors).length > 0)
        return res.status(422).json({
            statusCode: 422,
            message: 'Unprocessable Entity',
            errors,
        })
    try {
        const [newScore] = await nSQL('score').query('upsert', { fullName, phoneNumber, score, }).exec()
        res.status(201).json(newScore);
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            message: 'something went wrong while creating a new score item ',
            error,
        })
    };

}
const getScore = async (_, res) => {
    try {
        const scores = await nSQL('score').query('select').orderBy(["score DESC"]).exec()
        res.json(scores)
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            message: 'something went wrong',
            error,
        })
    };
}

const handler = (req, res) => {
    switch (req.method) {
        case 'PUT':
            return saveScore(req, res)
        case 'GET':
            return getScore(req, res)
        default:
            return res.status(404).json({
                statusCode: 404,
                message: 'Not Found',
            })
    }
}

export default connectMiddleware(handler)
