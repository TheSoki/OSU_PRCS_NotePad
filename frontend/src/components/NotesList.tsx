import axios, { AxiosResponse } from 'axios'
import React, { useState, useEffect } from 'react'
import { BACKEND_URL } from '../utils/helpers'
import { Note } from './types'

const fetchNotes = async (): Promise<Note[]> => {
    return await axios(`${BACKEND_URL}/Note`, {
        method: 'GET',
        withCredentials: true,
    })
        .then((response: AxiosResponse<Note[]>) => {
            return response.data
        })
        .catch(() => {
            return []
        })
}

const deleteNote = async (id: string): Promise<void> => {
    await axios(`${BACKEND_URL}/Note/${id}`, {
        method: 'DELETE',
        withCredentials: true,
    })
}

export const NotesList = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const onDeleteClick = async (id: string) => {
        setIsLoading(true)
        await deleteNote(id)
        await fetchNotes().then((notes) => {
            setNotes(notes)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchNotes().then((notes) => {
            setNotes(notes)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <ul className="w-full flex flex-wrap">
                {notes.map((note) => (
                    <li key={note.id} className="w-full md:w-1/3 p-3">
                        <div className="bg-white rounded shadow p-5 h-full">
                            <h3 className="font-bold text-xl mb-3">
                                {note.title}
                            </h3>
                            <p className="text-grey-darker text-base">
                                {note.description}
                            </p>
                            <div className="flex items-center justify-between mx-2 mt-4">
                                <a
                                    className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                    href={`/edit/${note.id}`}
                                >
                                    Edit
                                </a>

                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                    onClick={() => onDeleteClick(note.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
