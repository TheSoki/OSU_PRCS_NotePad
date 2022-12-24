import { useRouter } from 'next/router'
import { EditNote } from '../../src/components/EditNote'
import { Header } from '../../src/components/Header'
import { ProtectedLayout } from '../../src/components/ProtectedLayout'
import { processQuery } from '../../src/utils/helpers'

export const EditNotePage = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Header />
            <ProtectedLayout>
                {() => <EditNote id={processQuery(id)} />}
            </ProtectedLayout>
        </>
    )
}

export default EditNotePage
