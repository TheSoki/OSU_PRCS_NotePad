import { Header } from '../../src/components/Header'
import { Login as LoginComponent } from '../../src/components/Login'

const LoginPage = () => (
    <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
            <LoginComponent />
        </div>
    </>
)

export default LoginPage
