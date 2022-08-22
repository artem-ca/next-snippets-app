import React from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { getSnippetsByLanguage } from '../utils/Fauna'

export default function Navbar() {
    const { user, isLoading } = useUser()
    return (
        <nav className='text-gray-200'>
            <Link href='/'>
                <a className='mb-2 block text-center text-4xl  uppercase'>
                    Errday Snippets
                </a>
            </Link>
            <div className='m-x-auto mb-6 flex justify-center space-x-3 text-xl'>
                <Link href='/snippets/javascript'>
                    <a className='hover:underline'>JavaScript</a>
                </Link>
                <Link href='/snippets/html'>
                    <a className='hover:underline'>HTML</a>
                </Link>
                <Link href='/snippets/css'>
                    <a className='hover:underline'>CSS</a>
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
