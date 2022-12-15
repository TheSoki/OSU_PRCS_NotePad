import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'
import { Register as RegisterComponent } from '../../src/components/Register'

const RegisterPage = () => (
    <>
        <Header />
        <main>
            <div className="min-h-screen flex justify-center items-center">
                <RegisterComponent />
            </div>
        </main>
    </>
)

export default RegisterPage
