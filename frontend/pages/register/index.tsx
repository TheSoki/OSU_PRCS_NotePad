import type { NextPage } from 'next'
import { CreateNote } from '../../src/components/CreateNote'
import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'
import { Register as RegisterComponent } from '../../src/components/Register'

const Register: NextPage = () => (
    <>
        <Header />
        <main>
            <ProtectedLayout>
                <RegisterComponent />
            </ProtectedLayout>
        </main>
    </>
)

export default Register
