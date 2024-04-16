import {
    ReactFinalForm,
    InputFieldFF,
    SingleSelectFieldFF,
    SwitchFieldFF,
    hasValue,
    Button,
} from '@dhis2/ui'
import React from 'react'
import styles from './Form.module.css'

/**
 * This is just a function to demonstrate the values when the form is submitted
 * It takes the form's values (which is an object), transforms it into readable JSON,
 * and then finally displays the values in an alert box
 *
 * @param {Object} values
 * @param {string} values.title
 * @param {string} values.surname
 * @param {string} values.firstname
 * @param {string} values.email
 * @param {string} values.email-confirmation
 * @param {bool} values.newsletter
 */
const alertValues = (values) => {
    const formattedValuesString = JSON.stringify(values, null, 2)
    alert(formattedValuesString)
}

const { Field, Form: RFForm } = ReactFinalForm

export const Form = () => (
    <div>
        <h1>Form</h1>

        <RFForm onSubmit={alertValues}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <Field
                            name="title"
                            label="Title"
                            component={SingleSelectFieldFF}
                            className={styles.title}
                            initialValue={'None'}
                            options={[{ label: 'None', value: 'None' }]}
                        />
                    </div>

                    <div className={styles.row}>
                        <Field
                            name="surname"
                            label="Surname"
                            component={InputFieldFF}
                            className={styles.surname}
                            validate={hasValue}
                        />
                        <Field
                            name="firstname"
                            label="First Name"
                            component={InputFieldFF}
                            className={styles.firstname}
                            validate={hasValue}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="username"
                            label="User name"
                            component={InputFieldFF}
                            className={styles.firstname}
                            validate={hasValue}
                        />
                    </div>

                    <div className={styles.row}>
                        <Field
                            name="password"
                            label="Password"
                            component={InputFieldFF}
                            className={styles.firstname}
                            type="password"
                            validate={hasValue}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="email"
                            label="E-mail address"
                            component={InputFieldFF}
                            className={styles.email}
                            validate={hasValue}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="confirmEmail"
                            label="Confirm E-mail address"
                            component={InputFieldFF}
                            className={styles.email}
                            validate={hasValue}
                        />
                    </div>

                    <div className={styles.row}>
                        <Field
                            name="receiveNewletter"
                            label="I want to receive the newsletter"
                            component={SwitchFieldFF}
                        />
                    </div>
                    <div className={styles.row}>
                        <Button primary type="submit">
                            Submit form
                        </Button>
                    </div>
                </form>
            )}
        </RFForm>
    </div>
)
