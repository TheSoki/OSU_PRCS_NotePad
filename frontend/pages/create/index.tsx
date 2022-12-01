import type { NextPage } from 'next'
import { CreateNote } from '../../src/components/CreateNote'
import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'

const Home: NextPage = () => (
    <>
        <Header />
        <main>
            <ProtectedLayout>
                <CreateNote />
            </ProtectedLayout>
        </main>
    </>
)

export default Home
