import { Header } from '../src/components/Header'
import { NotesList } from '../src/components/NotesList'
import { ProtectedLayout } from '../src/components/ProtectedLayout'

const HomePage = () => (
    <>
        <Header />
        <ProtectedLayout>{() => <NotesList />}</ProtectedLayout>
    </>
)

export default HomePage
