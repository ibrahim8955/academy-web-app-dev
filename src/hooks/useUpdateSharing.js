/* eslint no-unused-vars: 0 */ // @TODO remove this line after implementing
import { useDataEngine } from '@dhis2/app-runtime'
import { useCallback, useState } from 'react'

export const useUpdateSharing = () => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // you should define a sharing mutation that is passed a key parameter
    const sharingMutation = useCallback(({ key }) => {
        // first you need to look up the id for the datastore key
        // then you need to post to the api to update the sharing
    }, [])

    return [sharingMutation, { loading, error }]
}
