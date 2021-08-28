import React from 'react'
import { useState } from 'react'
import Code from './Code'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Snippet({ snippet, snippetDeleted, snippetLiked }) {
    const router = useRouter()

    var [count, setCount] = useState(0)

    const likeSnippet = async (data) => {
        var { rate } = data
        const id = snippet.id

        console.log(snippet.rate)
        try {
            await fetch('/api/likeSnippet', {
                method: 'PUT',
                body: JSON.stringify({ id, rate }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            router.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    const dislikeSnippet = async (data) => {
        const { rate } = data
        const id = snippet.id
        setCount(count - 1)
        try {
            await fetch('/api/dislikeSnippet', {
                method: 'PUT',
                body: JSON.stringify({ id, rate }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            router.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    const deleteSnippet = async () => {
        try {
            await fetch('/api/deleteSnippet', {
                method: 'DELETE',
                body: JSON.stringify({ id: snippet.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            snippetDeleted()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='my-3 p-4 rounded-md shadow-xl bg-gray-100'>
            <div className='flex items-center justify-between mb-2'>
                <h2 className='text-xl text-gray-800 font-bold'>
                    {snippet.data.name}
                </h2>
                <span className='font-bold text-xs text-purple-800 px-2 py-1 rounded-lg '>
                    {snippet.data.language}
                </span>
            </div>
            <p className='text-gray-900 mb-4'>{snippet.data.description}</p>
            <Code code={snippet.data.code} />

            <div className='grid grid-cols-2 mt-2'>
                <div>
                    <Link href={`/edit/${snippet.id}`}>
                        <a className='mr-2 text-gray-800 hover:text-green-400'>
                            Edit
                        </a>
                    </Link>
                    <button
                        onClick={deleteSnippet}
                        className='mr-2 text-gray-800 hover:text-red-400 '>
                        Delete
                    </button>
                </div>

                <div className='justify-self-end space-x-2 text-xl flex content-center'>
                    <button
                        className='text-gray-800 hover:text-green-500'
                        onClick={likeSnippet}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                            />
                        </svg>
                    </button>

                    <a className='text-sm font-medium pt-1 text-green-500'>
                        {snippet.data.rate}
                        {/* {count} */}
                    </a>

                    <button
                        className='text-gray-800 hover:text-red-400'
                        onClick={dislikeSnippet}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
