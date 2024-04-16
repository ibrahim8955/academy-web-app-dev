import React from 'react'
import { useGetAttributes } from '../hooks/index.js'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableRow,
    TableCell,
    TableBody,
} from '@dhis2-ui/table'

export const Attributes = () => {
    // we get the data using a custom hook
    // we will update this implementation after learning about app-runtime
    const { loading, error, data } = useGetAttributes()

    return (
        <div>
            <h1>Attributes</h1>
            {/* <p>loading: {JSON.stringify(loading)}</p>
            <p>error message: {error?.message}</p> */}
            {
                // if there is any data available
                data?.attributes?.attributes && (
                    <div>
                        <Table>
                            <TableHead>
                                <TableRowHead>
                                    <TableCellHead>Name</TableCellHead>
                                    <TableCellHead>Unique</TableCellHead>
                                </TableRowHead>
                            </TableHead>
                            <TableBody>
                                {data.attributes.attributes.map((attribute) => (
                                    <TableRow key={attribute.id}>
                                        <TableCell>
                                            {attribute.displayName}
                                        </TableCell>
                                        <TableCell>
                                            {attribute.unique ? 'Yes' : 'No'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* {JSON.stringify(data.attributes.attributes, null, 4)} */}
                    </div>
                )
            }
        </div>
    )
}
