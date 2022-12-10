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
        <>
            <div className="border-b-2 border-gray-200 mb-2">
                <nav className="max-w-10xl mx-auto flex px-10 py-4">
                    <a className="mr-4 uppercase font-medium" href="/">
                        home
                    </a>
                    <a className="mr-4 uppercase font-medium" href="/create">
                        create
                    </a>
                    <button
                        className="ml-auto uppercase font-medium"
                        onClick={() => {
                            document.cookie =
                                'token=; expires= Thu, 21 Aug 2014 20:00:00 UTC'
                            window.location.href = '/'
                        }}
                    >
                        logout
                    </button>
                </nav>
            </div>
            <div className="max-w-9xl mx-auto">{children}</div>
        </>
    )
}
