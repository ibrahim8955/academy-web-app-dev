import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { useConfig } from '@dhis2/app-runtime'
import { Tag } from '@dhis2/ui'

export const Home = () => {
    const { apiVersion } = useConfig()

    return (
        <div>
            <h1>{i18n.t('Hello ibrahim')}</h1>
            <p>DHIS2 Web App Academy 2024</p>
            <Tag positive>
                {i18n.t('Running on  API Version:  {{version}}', { version: apiVersion })}
            </Tag>
        </div>
    )
}
