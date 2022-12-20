import { useState, useEffect, useMemo } from 'react'
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
    const [filter, setFilter] = useState<number | null>(null)

    const n = useMemo(
        () =>
            filter !== null ? notes.filter((n) => n.state === filter) : notes,
        [filter, notes]
    )

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
            <div className="flex justify-between px-5">
                <select
                    className="form-select block w-36 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 pl-2 outline-none"
                    placeholder="Filter"
                    onChange={(e) => {
                        const v = Number(e.target.value)
                        if (v >= 0 && v <= 2) {
                            setFilter(v)
                        } else {
                            setFilter(null)
                        }
                    }}
                    defaultValue={'4'}
                >
                    <option value="0">To Do</option>
                    <option value="1">In Progress</option>
                    <option value="2">Done</option>
                    <option value="4">All</option>
                </select>
                <button onClick={fetchExportToTxt}>export to txt</button>
            </div>
            <ul className="w-full flex flex-wrap">
                {n.map((note) => (
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
