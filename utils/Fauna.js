const faunadb = require('faunadb')
const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
})
const q = faunadb.query

const getSnippets = async () => {
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('snippets'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    )
    const snippets = data.map((snippet) => {
        snippet.id = snippet.ref.id
        delete snippet.ref
        return snippet
    })
    return snippets
}

const getSnippetById = async (id) => {
    const snippet = await faunaClient.query(
        q.Get(q.Ref(q.Collection('snippets'), id))
    )
    snippet.id = snippet.ref.id
    delete snippet.ref
    return snippet
}

const getSnippetsByUser = async (userId) => {
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index('snippets_by_user'), userId)),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    )

    const snippets = data.map((snippet) => {
        snippet.id = snippet.ref.id
        delete snippet.ref
        return snippet
    })

    return snippets
}

const getSnippetsByLanguage = async (language) => {
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index('snippets_by_language'), language)),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    )

    const snippets = data.map((snippet) => {
        snippet.id = snippet.ref.id
        delete snippet.ref
        return snippet
    })

    return snippets
}

const createSnippet = async (
    userId,
    name,
    language,
    description,
    code,
    rate
) => {
    return await faunaClient.query(
        q.Create(q.Collection('snippets'), {
            data: { userId, name, language, description, code, rate },
        })
    )
}

const updateSnippet = async (id, name, language, description, code, rate) => {
    return await faunaClient.query(
        q.Update(q.Ref(q.Collection('snippets'), id), {
            data: { name, language, description, code, rate },
        })
    )
}

const likeSnippet = async (id, rate) => {
    return await faunaClient.query(
        q.Update(q.Ref(q.Collection('snippets'), id), {
            data: { rate },
        })
    )
}

const deleteSnippet = async (id) => {
    return await faunaClient.query(
        q.Delete(q.Ref(q.Collection('snippets'), id))
    )
}

module.exports = {
    createSnippet,
    getSnippets,
    getSnippetById,
    getSnippetsByLanguage,
    getSnippetsByUser,
    updateSnippet,
    deleteSnippet,
    likeSnippet,
}
