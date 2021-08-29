import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import Navbar from '../components/Navbar'
import '../styles/app.css'

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <div className='bg-purple-700 w-full p-10 min-h-screen'>
                <Navbar />
                <div className='max-w-2xl mx-auto'>
                    <Component {...pageProps} />
                </div>
            </div>
        </UserProvider>
    )
}

export default MyApp
