import React from 'react'
import VisualizationList from './VisualizationList'
import StudentList from './StudentList.js'

/* @TODO-1 - import the DataStoreProvider from @dhis2/app-service-datastore */
/* @TODO-1 - wrap the VisualizationList in a DataStoreProvider for namespace "my-custom-app-namespace-1234" */
const MyApp = () => (
    <div>
        <StudentList />
    </div>
)

export default MyApp
