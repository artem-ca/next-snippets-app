import React from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

export default function Navbar() {
    const { user, isLoading } = useUser()
    return (
        <nav>
            <Link href='/'>
                <a className='mb-2 block text-center text-2xl text-red-200 uppercase'>
                    Errday Snippets
                </a>
            </Link>
            <div className='flex space-x-3 justify-center mb-6 m-x-auto'>
                <Link href='/snippets/html'>
                    <a className=' text-red-200 hover:underline'>HTML</a>
                </Link>
                <Link href='/snippets/css'>
                    <a className=' text-red-200 hover:underline'>CSS</a>
                </Link>
                <Link href='/snippets/javascript'>
                    <a className=' text-red-200 hover:underline'>JavaScript</a>
                </Link>
                {!isLoading && !user && (
                    <Link href='/api/auth/login'>
                        <a className=' text-red-200 hover:underline'>Login</a>
                    </Link>
                )}
                {!isLoading && user && (
                    <>
                        <Link href='/mySnippets'>
                            <a className=' text-red-200 hover:underline'>
                                My Snippets
                            </a>
                        </Link>
                        <Link href='/api/auth/logout'>
                            <a className=' text-red-200 hover:underline'>
                                Logout
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
