import { createSnippet } from '../../utils/Fauna'
export default async function handler(req, res) {
    const { name, language, description, code, rate } = req.body
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
    try {
        const createdSnippet = await createSnippet(
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
}
