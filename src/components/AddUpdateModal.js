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
import { DATASTORE_NAME } from '../constants'
import { useAlert, useDataMutation } from '@dhis2/app-runtime'

const { Field, Form: RFForm } = ReactFinalForm

const addStudentMutation = {
    resource: `dataStore/${DATASTORE_NAME}/Ibrahim`,
    type: 'create',
    data: ({ name, country, daysAttended }) => ({
        name,
        country,
        daysAttended,
    }),
}

export const AddUpdateModal = ({
    open,
    closeAddUpdateModal,
    updateParticipantDetails,
}) => {
    const { show } = useAlert(
        ({ message }) => message,
        ({ type }) => type
    )
    const [mutate] = useDataMutation(addStudentMutation, {
        onComplete: async () => {
            show({
                message: 'Operation successfully !',
                type: { success: true },
            })
        },
        onError: async (err) => {
            show({
                message: 'Could not proceed !',
                type: { critical: true },
            })
        },
    })
    const addParticipant = (formValues) => {
        mutate(formValues)
    }
    const updateParticipant = () => {}

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
                                    <Button primary type="sub">
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
