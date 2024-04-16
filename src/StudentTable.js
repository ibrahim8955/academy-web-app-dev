import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import {ButtonStrip, Button, Table, TableRowHead, TableCellHead, TableRow, TableCell, TableBody, TableHead} from '@dhis2/ui'

const StudentTable = ({participants}) => {
    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    <TableCellHead>{i18n.t('Name')}</TableCellHead>
                    <TableCellHead>{i18n.t('Nationality')}</TableCellHead>
                    <TableCellHead>{i18n.t('Actions')}</TableCellHead>                
                </TableRowHead>

            </TableHead>
            <TableBody>
                {participants.map(participant=>
                <TableRow>
                    <TableCell>
                        {participant.value.name}
                    </TableCell>
                    <TableCell>
                        {participant.value.nationality}
                    </TableCell>  
                    <TableCell>
                        <ButtonStrip>
                            <Button small destructive secondary>{i18n.t('Delete')}</Button>
                            <Button small secondary>{i18n.t('Update')}</Button>
                            <Button small secondary>{i18n.t('Set to read only')}</Button>
                        </ButtonStrip>
                    </TableCell>                  
                </TableRow>                    
                    )}

            </TableBody>
        </Table>
    )
}

export default StudentTable