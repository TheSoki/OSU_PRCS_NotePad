import type { NextPage } from 'next'
import { CreateNote } from '../../src/components/CreateNote'
import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'
import { Login as LoginComponent } from '../../src/components/Login'

const Login: NextPage = () => (
    <>
        <Header />
        <main>
            <div className="min-h-screen flex justify-center items-center">
                <LoginComponent />
            </div>
        </main>
    </>
)

export default Login
