import Head from 'next/head'
import Snippet from '../components/Snippet'
import useSWR from 'swr'
import Link from 'next/link'
import Header from '../components/Header'
export default function Home() {
    const { data: snippets, mutate } = useSWR('/api/snippets')
    return (
        <div>
            <Head>
                <title>Next.js Snippets App</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className=''>
                <div className='my-12 text-center'>
                    <Header
                        title='Errday Code Snippets'
                        subtitle='Create and browse snippets you use every day in Web Dev'
                    />
                </div>
                {snippets &&
                    snippets.map((snippet) => (
                        <Snippet
                            key={snippet.id}
                            snippet={snippet}
                            snippetDeleted={mutate}
                        />
                    ))}
            </main>
        </div>
    )
}
