import { BACKEND_URL } from './helpers'
import {
    CreateNoteType,
    LoginType,
    NoteType,
    RegisterType,
    UserType,
} from './types'

export const fetchCreateNote = (note: CreateNoteType) => {
    return fetch(`${BACKEND_URL}/Note`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(note),
        credentials: 'include',
    })
}

export const fetchGetNotes = async (): Promise<NoteType[]> => {
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
        .catch(() => {
            return []
        })

    return data
}

export const fetchGetNote = async (id: string): Promise<NoteType | null> => {
    const data = await fetch(`${BACKEND_URL}/Note/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            if (data?.status) {
                return null
            }
            return data as NoteType
        })
        .catch(() => {
            return null
        })

    return data
}

export const fetchEditNote = (values: NoteType) => {
    return fetch(`${BACKEND_URL}/Note`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(values),
        credentials: 'include',
    })
}

export const fetchDeleteNote = (id: string) => {
    return fetch(`${BACKEND_URL}/Note/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}

export const fetchExportToTxt = async () => {
    const res = await fetch(`${BACKEND_URL}/Note/export`, {
        method: 'POST',
        // headers: {
        // Accept: 'application/json, text/plain, */*',
        // 'Content-Type': 'application/json;charset=utf-8',
        // },
        credentials: 'include',
    })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'notes.txt'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
}

export const fetchRegister = (values: RegisterType) => {
    return fetch(`${BACKEND_URL}/Auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(values),
        credentials: 'include',
    })
}

export const fetchLogin = (values: LoginType) => {
    return fetch(`${BACKEND_URL}/Auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(values),
        credentials: 'include',
    })
}

export const fetchMe = async (): Promise<UserType | null> => {
    const data = await fetch(`${BACKEND_URL}/Auth`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            if (data?.status) {
                return null
            }
            return data
        })
        .catch(() => {
            return null
        })

    return data
}

export const fetchAllUsers = async (): Promise<UserType[]> => {
    const data = await fetch(`${BACKEND_URL}/User`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            if (data?.status) {
                return []
            }
            return data
        })
        .catch(() => {
            return []
        })

    return data
}

export const fetchEditUser = (values: UserType) => {
    return fetch(`${BACKEND_URL}/User`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(values),
        credentials: 'include',
    })
}
