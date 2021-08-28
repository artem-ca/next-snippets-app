import React, { useState } from 'react'

export default function Code({ code }) {
    const [showCode, setShowCode] = useState(false)
    const [copyText, setCopyText] = useState('Copy')
    const copyCode = async () => {
        await navigator.clipboard.writeText(code)
        setCopyText('✅ Copied!')
        setTimeout(() => {
            setCopyText('Copy')
        }, 1500)
    }
    return (
        <div>
            <button
                className='bg-purple-800 text-xs hover:bg-purple-900 text-white flex
                font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2'
                type='submit'
                onClick={() => setShowCode(!showCode)}>
                {showCode ? 'Hide the Code' : 'Show the Code'}

                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-5 w-5 mx-0.5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M17 13l-5 5m0 0l-5-5m5 5V6'
                    />
                </svg>
            </button>
            {showCode && (
                <div className='relative'>
                    <pre className='text-gray-800 bg-gray-300 rounded-md p-2'>
                        {code}
                    </pre>

                    <button
                        className='bg-gray-500 text-xs hover:bg-gray-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2 absolute top-0 right-0 transform -translate-x-1 translate-y-1'
                        type='submit'
                        onClick={copyCode}>
                        {copyText}
                    </button>
                </div>
            )}
        </div>
    )
}
