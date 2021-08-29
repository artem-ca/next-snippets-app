import React from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

export default function Navbar() {
    const { user, isLoading } = useUser()
    return (
        <nav className='text-gray-200'>
            <Link href='/'>
                <a className='mb-2 block text-center text-2xl  uppercase'>
                    Errday Snippets
                </a>
            </Link>
            <div className='flex space-x-3 justify-center mb-6 m-x-auto'>
                <Link href='/snippets/html'>
                    <a className='hover:underline'>HTML</a>
                </Link>
                <Link href='/snippets/css'>
                    <a className='hover:underline'>CSS</a>
                </Link>
                <Link href='/snippets/javascript'>
                    <a className='hover:underline'>JavaScript</a>
                </Link>
                {!isLoading && !user && (
                    <Link href='/api/auth/login'>
                        <a className='hover:underline'>Login</a>
                    </Link>
                )}
                {!isLoading && user && (
                    <>
                        <Link href='/mySnippets'>
                            <a className='hover:underline'>My Snippets</a>
                        </Link>
                        <Link href='/api/auth/logout'>
                            <a className='hover:underline'>Logout</a>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
