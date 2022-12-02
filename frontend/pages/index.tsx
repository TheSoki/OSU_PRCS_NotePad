import type { NextPage } from 'next'
import { Header } from '../src/components/Header'
import { NotesList } from '../src/components/NotesList'
import { ProtectedLayout } from '../src/components/ProtectedLayout'

const HomePage = () => (
    <>
        <Header />
        <main>
            <ProtectedLayout>
                <NotesList />
            </ProtectedLayout>
        </main>
    </>
)

export default HomePage
