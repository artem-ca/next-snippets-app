import Head from 'next/head'
import Snippet from '../components/Snippet'
import useSWR from 'swr'
import Link from 'next/link'
export default function Home() {
    const { data: snippets, mutate } = useSWR('/api/snippets')
    return (
        <div>
            <Head>
                <title>Next.js Snippets App</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className=''>
                <div className='my-14 text-center'>
                    <h1 className='text-gray-50 text-2xl uppercase font-semibold'>
                        Errday Code Snippets
                    </h1>
                    <p className='text-gray-200 mt-2'>
                        Create and browse snippets you use every day in Web
                        Development!
                    </p>
                    <Link href='/new'>
                        <a
                            className='inline-block mt-5 py-2 px-4 rounded 
                            bg-purple-800 hover:bg-purple-900 hover:shadow-md
                            text-gray-100 font-semibold
                            focus:outline-none focus:shadow-outline'>
                            Create a Snippet!
                        </a>
                    </Link>
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
