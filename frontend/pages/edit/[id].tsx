import { useRouter } from 'next/router'
import { EditNote } from '../../src/components/EditNote'
import { processQuery } from '../../src/utils/helpers'

export const EditNotePage = () => {
    const router = useRouter()
    const { id } = router.query

    return <EditNote id={processQuery(id)} />
}

export default EditNotePage
