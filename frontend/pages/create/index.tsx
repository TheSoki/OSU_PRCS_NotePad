import { CreateNote } from '../../src/components/CreateNote'
import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'

const CreateNotePage = () => (
    <>
        <Header />
        <ProtectedLayout>{() => <CreateNote />}</ProtectedLayout>
    </>
)

export default CreateNotePage
