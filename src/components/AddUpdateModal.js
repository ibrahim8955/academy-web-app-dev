import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    InputFieldFF,
    hasValue,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    ReactFinalForm,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './AddUpdateModal.module.css'
import { DATASTORE_KEY, DATASTORE_NAME } from '../constants'
import { useAlert, useDataMutation } from '@dhis2/app-runtime'
import { useState } from 'react'

const { Field, Form: RFForm } = ReactFinalForm

const addStudentMutation = {
    resource: `dataStore/${DATASTORE_NAME}/${DATASTORE_KEY}`,
    type: 'create',
    data: ({ name, country, daysAttended }) => ({
        name,
        country,
        daysAttended: [...daysAttended],
    }),
}

const updateStudentMutation = {
    resource: `dataStore/${DATASTORE_NAME}/${DATASTORE_KEY}`,
    type: 'update',
    data: ({ name, country, daysAttended }) => ({
        name,
        country,
        daysAttended: [...daysAttended],
    }),
}

export const AddUpdateModal = ({
    open,
    closeAddUpdateModal,
    updateParticipantDetails,
    refetch
}) => {
    const [loading, setLoading] = useState(false)
    const { show } = useAlert(
        ({ message }) => message,
        ({ type }) => type
    )

    const [mutate] = useDataMutation(addStudentMutation, {
        onComplete: async () => {
            await refetch()
            show({
                message: 'Création successfully !',
                type: { success: true },
            })
            closeAddUpdateModal()
            setLoading(false)
        },

        onError: async (err) => {
            show({
                message: 'Could not proceed !:' + err.message,
                type: { critical: true },
            })
            setLoading(false)
        },
    })

    const [udpateMutate] = useDataMutation(updateStudentMutation, {
        onComplete: async () => {
            show({
                message: 'Update successfully !',
                type: { success: true },
            })
            closeAddUpdateModal()
            setLoading(false)
        },

        onError: async (err) => {
            show({
                message: 'Could not proceed !',
                type: { critical: true },
            })
            setLoading(false)
        },
    })

    const addParticipant = async (formValues) => {
        setLoading(true)
        await mutate(formValues)
    }
    const updateParticipant = async (formValues) => {
        await udpateMutate(formValues)
    }

    return (
        <Modal hide={!open} onClose={closeAddUpdateModal}>
            <>
                <RFForm
                    onSubmit={
                        updateParticipantDetails
                            ? updateParticipant
                            : addParticipant
                    }
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalTitle>
                                {updateParticipantDetails
                                    ? i18n.t(
                                          `Update participant (${updateParticipantDetails.key})`
                                      )
                                    : i18n.t('Add participant')}
                            </ModalTitle>
                            <ModalContent>
                                <Field
                                    required
                                    name="name"
                                    label={i18n.t('Name')}
                                    component={InputFieldFF}
                                    validate={hasValue}
                                    className={styles.row}
                                    initialValue={
                                        updateParticipantDetails
                                            ? updateParticipantDetails?.value
                                                  ?.name
                                            : null
                                    }
                                />
                                <Field
                                    required
                                    name="country"
                                    label={i18n.t('Country of residence')}
                                    component={InputFieldFF}
                                    validate={hasValue}
                                    className={styles.row}
                                    initialValue={
                                        updateParticipantDetails
                                            ? updateParticipantDetails?.value
                                                  ?.country
                                            : null
                                    }
                                />
                                <Field
                                    required
                                    name="daysAttended"
                                    label={i18n.t('Days attended')}
                                    component={InputFieldFF}
                                    validate={hasValue}
                                    className={styles.row}
                                    initialValue={
                                        updateParticipantDetails
                                            ? updateParticipantDetails?.value?.daysAttended?.join(
                                                  ', '
                                              )
                                            : null
                                    }
                                />
                            </ModalContent>
                            <ModalActions>
                                <ButtonStrip>
                                    <Button onClick={closeAddUpdateModal}>
                                        {i18n.t('Cancel')}
                                    </Button>
                                    <Button
                                        primary
                                        type="sub"
                                        loading={loading}
                                    >
                                        {i18n.t('Add')}
                                    </Button>
                                </ButtonStrip>
                            </ModalActions>
                        </form>
                    )}
                </RFForm>
            </>
        </Modal>
    )
}

AddUpdateModal.propTypes = {
    closeAddUpdateModal: PropTypes.func,
    open: PropTypes.bool,
    updateParticipantDetails: PropTypes.object,
}

export default AddUpdateModal
