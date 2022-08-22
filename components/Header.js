import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

export default function Header({ title, subtitle }) {
    const { user, isLoading } = useUser()
    return (
        <header className='my-12'>
            <h1 className='text-purple-100'>{title}</h1>
            {subtitle && <p className='text-purple-100'>{subtitle}</p>}

            {!isLoading && user && (
                <Link href='/new'>
                    <a
                        className='inline-block mt-5 py-2 px-4 rounded 
                                bg-purple-800 hover:bg-purple-900 hover:shadow-md
                                text-gray-100 font-semibold
                                focus:outline-none focus:shadow-outline'>
                        Create a Snippet!
                    </a>
                </Link>
            )}
            {!isLoading && !user && (
                <Link href='/api/auth/login'>
                    <a
                        className='inline-block mt-5 py-2 px-4 rounded 
                                bg-purple-800 hover:bg-purple-900 hover:shadow-md
                                text-gray-100 font-semibold
                                focus:outline-none focus:shadow-outline'>
                        Login to Create a Snippets!
                    </a>
                </Link>
            )}
        </header>
    )
}
