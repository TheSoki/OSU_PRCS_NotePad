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
    const data = await fetch(`${BACKEND_URL}/Note`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            if (data?.status) {
                return []
            }
            const notes: NoteType[] = data.map((note: any) => {
                return {
                    id: note.id,
                    title: note.title,
                    description: note.description,
                    creationDate: new Date(note.creationDate),
                    completeDate: note.completeDate
                        ? new Date(note.completeDate)
                        : null,
                    state: note.state,
                }
            })
            return notes
        })

    return data
}

const deleteNote = async (id: string): Promise<void> => {
    await fetch(`${BACKEND_URL}/Note/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}

const processNoteState = (state: number): string => {
    switch (state) {
        case 0:
            return 'To Do'
        case 1:
            return 'In Progress'
        case 2:
            return 'Done'
        default:
            return ''
    }
}

const processNoteStateEmoji = (state: number): string => {
    switch (state) {
        case 0:
            return '📝'
        case 1:
            return '🚧'
        case 2:
            return '✅'
        default:
            return ''
    }
}

const exportToTxt = async (): Promise<void> => {
    await fetch(`${BACKEND_URL}/Note/export`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    })
        .then((res) => res.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = 'notes.txt'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
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
            .then((notes) => {
                setNotes(notes)
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
            <button onClick={() => exportToTxt()} className="float-right mr-5">
                export to txt
            </button>
            <ul className="w-full flex flex-wrap">
                {notes.map((note) => (
                    <li key={note.id} className="w-full md:w-1/3 p-3">
                        <div className="bg-white rounded shadow p-5 h-full">
                            <div className="flex justify-between">
                                <p>{`${processNoteStateEmoji(
                                    note.state
                                )} ${processNoteState(note.state)}`}</p>
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
