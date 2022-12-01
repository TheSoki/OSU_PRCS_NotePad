import axios, { AxiosResponse } from 'axios'
import React, { useState, useEffect } from 'react'
import { BACKEND_URL } from '../utils/helpers'
import { Note } from './types'

export const NotesList = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios(`${BACKEND_URL}/Note`, {
            method: 'GET',
            withCredentials: true,
        })
            .then((res: AxiosResponse<Note[]>) => {
                setNotes(res.data)
            })
            .catch(() => {
                setNotes([])
            })
            .finally(() => {
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
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
