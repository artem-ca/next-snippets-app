import { likeSnippet } from '../../utils/Fauna'
export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
    const { id, rate } = req.body

    try {
        const liked = await likeSnippet(id, rate)

        return res.status(200).json(liked)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Something went wrong.' })
    }
}
