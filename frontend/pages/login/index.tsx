import { Header } from '../../src/components/Header'
import { Login as LoginComponent } from '../../src/components/Login'

const LoginPage = () => (
    <>
        <Header />
        <main>
            <div className="min-h-screen flex justify-center items-center">
                <LoginComponent />
            </div>
        </main>
    </>
)

export default LoginPage
