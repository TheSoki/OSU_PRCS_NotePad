import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'
import { Register as RegisterComponent } from '../../src/components/Register'

const RegisterPage = () => (
    <>
        <Header />
        <main>
            <ProtectedLayout>
                <RegisterComponent />
            </ProtectedLayout>
        </main>
    </>
)

export default RegisterPage
