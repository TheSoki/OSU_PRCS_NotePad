import { useState, useEffect } from 'react'
import { NoteActions } from './NoteActions'
import { fetchDeleteNote, fetchExportToTxt, fetchGetNotes } from '../utils/data'
import { NoteType } from '../utils/types'

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

export const NotesList = () => {
    const [notes, setNotes] = useState<NoteType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const onDeleteClick = async (id: string) => {
        setIsLoading(true)
        await fetchDeleteNote(id)
        await fetchGetNotes().then((notes) => {
            setNotes(notes)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchGetNotes()
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
            <button onClick={fetchExportToTxt} className="float-right mr-5">
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
