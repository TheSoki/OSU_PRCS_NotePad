import Link from 'next/link'
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
        if (
            document.cookie
                .split(';')
                .some((item) => item.trim().startsWith('token='))
        ) {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return <></>
    }

    if (!isAuthenticated) {
        return (
            <div className="min-w-max min-h-screen flex flex-col justify-center items-center space-y-2">
                <span>Not authenticated go to</span>
                <span className="text-xl">
                    <Link href="login">login</Link>
                </span>
                <span>or</span>
                <span className="text-xl">
                    <Link href="register">register</Link>
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="border-b-2 border-gray-200 mb-2">
                <nav className="max-w-10xl mx-auto flex px-10 py-4">
                    <Link className="mr-4 uppercase font-medium" href="/">
                        home
                    </Link>
                    <Link className="mr-4 uppercase font-medium" href="create">
                        create
                    </Link>
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
