import React, { useState } from 'react'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableRow,
    TableCell,
    TableBody,
    CircularLoader,
    Center,
    NoticeBox,
    ReactFinalForm,
    InputFieldFF,
    SingleSelectFieldFF,
    hasValue,
    Button,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

import { useDataMutation, useDataQuery, useAlert } from '@dhis2/app-runtime'
import styles from './Form.module.css'

const { Field, Form: RFForm } = ReactFinalForm

const attributeQuery = {
    attributes: {
        resource: 'attributes',
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

const createAttributMutation = {
    resource: 'attributes',
    type: 'create',
    data: (payload) => payload,
}

const deleteAttributeMutation = {
    resource: 'attributes',
    type: 'delete',
    id: ({ id }) => id,
}

export const Attributes = () => {
    // we get the data using a custom hook
    // we will update this implementation after learning about app-runtime
    const { show } = useAlert(
        (value) => {
            if (value.critical) return 'Could not proceed : ' + value.message
            if (value.success) return 'Operation success !'
        },
        (value) => {
            if (value.critical) return { critical: true }
            if (value.success) return { success: true }
        }
    )

    const {
        loading,
        error,
        data,
        refetch: loadAttribute,
    } = useDataQuery(attributeQuery)

    const [mutate] = useDataMutation(createAttributMutation, {
        onComplete: async () => {
            await loadAttribute()
            show({ success: true })
            setLoadingCreation(false)
        },
        onError: (error) => {
            show({
                critical: true,
                message:
                    error?.response?.errorReports?.[0]?.message ||
                    error?.message,
            })
            setLoadingCreation(false)
        },
    })

    const [deleteMutate] = useDataMutation(deleteAttributeMutation, {
        onComplete: async () => {
            await loadAttribute()
            show({ success: true })
            setLoadinDeleting(false)
        },
        onError: (error) => {
            show({
                critical: true,
                message:
                    error?.response?.errorReports?.[0]?.message ||
                    error?.message,
            })
            setLoadinDeleting(false)
        },
    })

    const [currentAttributeId, setCurrentAttributeId] = useState(null)
    const [loadinCreation, setLoadingCreation] = useState(false)
    const [loadinDeleting, setLoadinDeleting] = useState(false)

    const onSubmit = (formValues) => {
        setLoadingCreation(true)
        mutate(formValues)
    }

    const handleDestroyAttribute = async (id) => {
        setLoadinDeleting(true)
        await deleteMutate({ id })
        setLoadinDeleting(false)
    }

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
                <NoticeBox error title="Error loading attributes ">
                    {i18n.t(" Couldn't load attributes list")} : {error.message}
                </NoticeBox>
            </Center>
        )

    return (
        <div>
            <h1>attributes List</h1>

            <div style={{ margin: '30px 0px' }}>
                Attribute visible to{' '}
                <span style={{ fontWeight: 'bold' }}>
                    {data?.me?.displayName} ( {data?.me?.email}
                </span>
                )
            </div>
            {
                // if there is any data available
                data?.attributes?.attributes && (
                    <div>
                        <Table>
                            <TableHead>
                                <TableRowHead>
                                    <TableCellHead>ID</TableCellHead>
                                    <TableCellHead>
                                        Indicator name
                                    </TableCellHead>
                                    <TableCellHead>Created at</TableCellHead>
                                    <TableCellHead>Actions</TableCellHead>
                                </TableRowHead>
                            </TableHead>
                            <TableBody>
                                {data.attributes.attributes.map((attribute) => (
                                    <TableRow key={attribute.id}>
                                        <TableCell>{attribute.id}</TableCell>
                                        <TableCell>
                                            {attribute.displayName}
                                        </TableCell>
                                        <TableCell>
                                            {attribute.created}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                loading={
                                                    attribute.id ===
                                                    currentAttributeId
                                                        ? loadinDeleting
                                                        : false
                                                }
                                                destructive
                                                onClick={() => {
                                                    setCurrentAttributeId(
                                                        attribute.id
                                                    )
                                                    handleDestroyAttribute(
                                                        attribute.id
                                                    )
                                                }}
                                                small
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )
            }

            <h1>Add an Attribute</h1>
            <div>
                <RFForm onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.row}>
                                <Field
                                    name="name"
                                    label="Attribute Name *"
                                    component={InputFieldFF}
                                    validate={hasValue}
                                    className={styles.name}
                                />
                            </div>
                            <div className={styles.row}>
                                <Field
                                    name="valueType"
                                    label={i18n.t('Value Type')}
                                    component={SingleSelectFieldFF}
                                    className={styles.title}
                                    initialValue="TEXT"
                                    options={[
                                        {
                                            label: i18n.t('Text'),
                                            value: 'TEXT',
                                        },
                                        {
                                            label: i18n.t('Number'),
                                            value: 'NUMBER',
                                        },
                                    ]}
                                />
                            </div>

                            <div className={styles.row}>
                                <Button
                                    loading={loadinCreation}
                                    type="submit"
                                    primary
                                >
                                    {i18n.t('Save')}
                                </Button>
                            </div>
                        </form>
                    )}
                </RFForm>
            </div>
        </div>
    )
}
