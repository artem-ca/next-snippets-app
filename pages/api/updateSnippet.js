import { updateSnippet } from '../../utils/Fauna'
export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
    const { id, name, language, description, code, rate } = req.body

    try {
        const updated = await updateSnippet(
            id,
            name,
            language,
            description,
            code,
            rate
        )
        return res.status(200).json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Something went wrong.' })
    }
}
