import React from 'react'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableRow,
    TableCell,
    TableBody,
} from '@dhis2-ui/table'
import { CircularLoader, Center, NoticeBox } from '@dhis2/ui'

import { useDataQuery } from '@dhis2/app-runtime'

const indicatorQuery = {
    indicators: {
        resource: 'indicators',
        params: {
            fields: ['id', 'displayName', 'created'],
            pageSize: 5,
            order: 'displayName:desc',
        },
    },
    me: {
        resource: 'me',
        params: {
            fields: ['displayName', 'email'],
        },
    },
}

export const Indicators = () => {
    // we get the data using a custom hook
    // we will update this implementation after learning about app-runtime
    const { loading, error, data } = useDataQuery(indicatorQuery)

    if (loading)
        return (
            <Center>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CircularLoader small />
                    <div style={{ marginLeft: 10 }}>Loading ....</div>
                </div>
            </Center>
        )

    if (error)
        return (
            <Center>
                <NoticeBox error title="Error loading indicators ">
                    {i18n.t(" Couldn't load indicators list")} : {error.message}
                </NoticeBox>
            </Center>
        )

    return (
        <div>
            <h1>Indicators List</h1>
            <div style={{ margin: '30px 0px' }}>
                Indicator is visible to{' '}
                <span style={{ fontWeight: 'bold' }}>
                    {data?.me?.displayName} ( {data?.me?.email}
                </span>
                )
            </div>
            {
                // if there is any data available
                data?.indicators?.indicators && (
                    <div>
                        <Table>
                            <TableHead>
                                <TableRowHead>
                                    <TableCellHead>ID</TableCellHead>
                                    <TableCellHead>
                                        Indicator name
                                    </TableCellHead>
                                    <TableCellHead>Created at</TableCellHead>
                                </TableRowHead>
                            </TableHead>
                            <TableBody>
                                {data.indicators.indicators.map((indicator) => (
                                    <TableRow key={indicator.id}>
                                        <TableCell>{indicator.id}</TableCell>
                                        <TableCell>
                                            {indicator.displayName}
                                        </TableCell>
                                        <TableCell>
                                            {indicator.created}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )
            }
        </div>
    )
}
