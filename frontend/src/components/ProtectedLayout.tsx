import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { fetchMe } from '../utils/data'
import { Role, UserType } from '../utils/types'

export const ProtectedLayout = ({
    children,
}: {
    children: (_: UserType) => ReactNode
}) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchMe()
            .then((res) => {
                if (res) {
                    setUser(res)
                } else {
                    setUser(null)
                }
            })
            .catch(() => {
                setUser(null)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <></>
    }

    if (!user) {
        return (
            <div className="min-w-max min-h-screen flex flex-col justify-center items-center space-y-2">
                <span>Not authenticated go to</span>
                <span className="text-xl">
                    <Link href="/login">login</Link>
                </span>
                <span>or</span>
                <span className="text-xl">
                    <Link href="/register">register</Link>
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
                    <Link className="mr-4 uppercase font-medium" href="/create">
                        create
                    </Link>
                    {user.role === Role.Admin && (
                        <Link
                            className="mr-4 uppercase font-medium"
                            href="/users"
                        >
                            users
                        </Link>
                    )}
                    <button
                        className="ml-auto flex"
                        onClick={() => {
                            document.cookie =
                                'token=; expires= Thu, 21 Aug 2014 20:00:00 UTC'
                            window.location.href = '/'
                        }}
                    >
                        logout
                        <span className="ml-2 hidden md:block">
                            ({user.email})
                        </span>
                    </button>
                </nav>
            </div>
            <div className="max-w-9xl mx-auto">{children(user)}</div>
        </>
    )
}
