import { createSnippet } from '../../utils/Fauna'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function handler(req, res) {
    const session = getSession(req, res)
    const userId = session.user.sub

    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' })
    }

    const { name, language, description, code, rate } = req.body

    try {
        const createdSnippet = await createSnippet(
            userId,
            name,
            language,
            description,
            code,
            rate
        )
        return res.status(200).json(createdSnippet)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Something went wrong.' })
    }
})
