import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils/helpers'

export const ProtectedLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios(`${BACKEND_URL}/Auth/isAuthenticated`, {
            method: 'GET',
            withCredentials: true,
        })
            .then((res: AxiosResponse<boolean>) => {
                setIsAuthenticated(!!res.data)
            })
            .catch(() => {
                setIsAuthenticated(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return (
            <div>
                Not authenticated go to
                <a href="/login">login</a>
            </div>
        )
    }

    return (
        <div>
            <nav className="flex">
                <a className="mr-4" href="/">
                    home
                </a>
                <a className="mr-4" href="/create">
                    create
                </a>
                <button
                    className="ml-auto"
                    onClick={() => {
                        document.cookie =
                            'token=; expires= Thu, 21 Aug 2014 20:00:00 UTC'
                        window.location.href = '/'
                    }}
                >
                    logout
                </button>
            </nav>
            {children}
        </div>
    )
}
