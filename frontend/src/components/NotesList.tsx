import axios, { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../utils/helpers'
import { NoteActions } from './NoteActions'

type NoteType = {
    id: string
    title: string
    description: string
    creationDate: Date
    completeDate: Date | null
    state: number
}

const fetchNotes = async (): Promise<NoteType[]> => {
    return await axios(`${BACKEND_URL}/Note`, {
        method: 'GET',
        withCredentials: true,
    })
        .then((response: AxiosResponse<NoteType[]>) => {
            return response.data.map((note) => ({
                ...note,
                creationDate: new Date(note.creationDate),
                completeDate: !!note.completeDate
                    ? new Date(note.completeDate)
                    : null,
            }))
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
    const [notes, setNotes] = useState<NoteType[]>([])
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
        fetchNotes()
            .then(setNotes)
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
                            <div className="flex justify-between">
                                <p>
                                    {note.state === 0
                                        ? 'To Do'
                                        : note.state === 1
                                        ? 'In Progress'
                                        : 'Done'}
                                </p>
                                <NoteActions
                                    onDeleteClick={() => onDeleteClick(note.id)}
                                    editHref={`/edit/${note.id}`}
                                />
                            </div>
                            <h3 className="font-bold text-xl mb-3">
                                {note.title}
                            </h3>
                            <p className="text-grey-darker text-base">
                                {note.description}
                            </p>
                            <p className="mt-2 text-grey text-sm">
                                {`Created ${note.creationDate.toLocaleDateString(
                                    'cs-CZ'
                                )}`}
                            </p>
                            <p className="text-grey text-sm whitespace-pre">
                                {!!note.completeDate
                                    ? `Completed ${note.completeDate.toLocaleDateString(
                                          'cs-CZ'
                                      )}`
                                    : ' '}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
