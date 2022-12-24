import { useState, useEffect } from 'react'
import { fetchAllUsers } from '../utils/data'
import { UserType } from '../utils/types'
import { UserListItem } from './UserListItem'

export const UsersList = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAllUsers()
            .then((users) => setUsers(users))
            .finally(() => setIsLoading(false))
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchAllUsers()
            .then((users) => setUsers(users))
            .finally(() => setIsLoading(false))
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col">
            {users.map((user) => (
                <UserListItem key={user.id} user={user} refetch={refetch} />
            ))}
        </div>
    )
}
