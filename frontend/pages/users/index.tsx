import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'
import { UsersList } from '../../src/components/UsersList'
import { Role } from '../../src/utils/types'
import ErrorPage from 'next/error'

const UsersPage = () => (
    <>
        <Header />
        <ProtectedLayout>
            {(user) => {
                if (user.role != Role.Admin) {
                    return <ErrorPage statusCode={403} />
                }
                return <UsersList />
            }}
        </ProtectedLayout>
    </>
)

export default UsersPage
