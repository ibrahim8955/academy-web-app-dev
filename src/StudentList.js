// import i18n from '@dhis2/i18n'
import { useDataQuery } from '@dhis2/app-runtime'
import {Button, SingleSelect, SingleSelectOption, InputField, CircularLoader} from '@dhis2/ui'
import React, {useState} from 'react'
import { DATASTORE_NAME } from './constants'
import StudentTable from './StudentTable'
import styles from './StudentList.module.css'

const DATASTORE_OVERVIEW = {
    dataStore: {
        resource: `dataStore/${DATASTORE_NAME}`,
        params: {
            fields: '.'
        }
    }
}

const FilterSelection = () => (
    <div className={styles.filterSelect}>
    <SingleSelect prefix={'Filter option'}>
        <SingleSelectOption label='Nationality' value='nationality' />
        <SingleSelectOption label='Name' value='name' />
    </SingleSelect>
    <InputField value="Côte d'Ivoire"></InputField>
    </div>
)

const StudentList = () => {
    const {data, refetch, loading, fetching} = useDataQuery(DATASTORE_OVERVIEW, {lazy: true})
    const [filter, setFilter] = useState(null)

    return (
        <>
        <h2>Roster</h2>        
        <FilterSelection />
        <Button primary onClick={refetch}>Search for participants</Button>
        {loading || fetching &&
            <CircularLoader />
        }
        {data &&
<>            
            <StudentTable participants={data.dataStore.entries} />
            <Button>Add</Button>
            </>
        }
        </>

)
}

export default StudentList