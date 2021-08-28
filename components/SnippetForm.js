import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import head from 'next/head'
export default function SnippetForm({ snippet }) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: snippet ? snippet.data.name : '',
            language: snippet ? snippet.data.language : '',
            description: snippet ? snippet.data.description : '',
            code: snippet ? snippet.data.code : '',
            rate: snippet ? snippet.data.rate : 0,
        },
    })

    const createSnippet = async (data) => {
        const { name, language, description, code, rate } = data

        try {
            await fetch('/api/createSnippet', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    language,
                    description,
                    code,
                    rate,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            router.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    const updateSnippet = async (data) => {
        const { name, language, description, code, rate } = data
        const id = snippet.id
        try {
            await fetch('/api/updateSnippet', {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    name,
                    language,
                    description,
                    code,
                    rate,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            router.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(snippet ? updateSnippet : createSnippet)}>
            <div className='mb-4'>
                <label
                    className='block text-red-100 text-sm font-bold mb-1'
                    htmlFor='name'>
                    Name
                </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    className='w-full border bg-white rounded px-3 py-2 outline-none text-gray-700'
                    {...register('name', { required: true })}
                />
                {errors.name && (
                    <p className='m-1 font-bold text-red-400'>
                        Name is required
                    </p>
                )}
            </div>
            <div className='mb-4'>
                <label
                    className='block text-red-100 text-sm font-bold mb-1'
                    htmlFor='language'>
                    Language
                </label>

                <div className='flex flex-row'>
                    <select
                        id='language'
                        name='language'
                        className='w-full border bg-white rounded px-3 py-2 outline-none text-gray-700'
                        {...register('language', { required: true })}>
                        <option className='py-1'>JavaScript</option>
                        <option className='py-1'>HTML</option>
                        <option className='py-1'>CSS</option>
                    </select>

                    <input
                        type='text'
                        id='rate'
                        name='rate'
                        className='ml-1 py-2 bg-white rounded-md text-center w-16'
                        {...register('rate', { required: true })}
                    />

                    {errors.language && (
                        <p className='m-1 font-bold text-red-400'>
                            Language is required
                        </p>
                    )}
                </div>
            </div>
            <div className='mb-4'>
                <label
                    className='block text-red-100 text-sm font-bold mb-1'
                    htmlFor='description'>
                    Description
                </label>
                <textarea
                    name='description'
                    id='description'
                    rows='3'
                    className='resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                    placeholder='What does the snippet do?'
                    {...register('description', { required: true })}></textarea>
                {errors.description && (
                    <p className='m-1 font-bold text-red-400'>
                        Description is required
                    </p>
                )}
            </div>
            <div className='mb-4'>
                <label
                    className='block text-red-100 text-sm font-bold mb-1'
                    htmlFor='code'>
                    Code
                </label>
                <textarea
                    name='code'
                    id='code'
                    rows='10'
                    className='resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                    placeholder="ex. console.log('helloworld')"
                    {...register('code', { required: true })}></textarea>
            </div>
            <button
                className='bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                type='submit'>
                Save
            </button>
            <Link href='/'>
                <a className='mt-3 inline-block bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                    Cancel
                </a>
            </Link>
        </form>
    )
}
