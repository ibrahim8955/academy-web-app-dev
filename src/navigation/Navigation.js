import PropTypes from 'prop-types'
import React from 'react'
import { Menu, MenuItem } from '@dhis2/ui'
import { useNavigate, useMatch } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5'
import { MdAttribution } from 'react-icons/md'
import { SiElementor } from 'react-icons/si'
import { AiOutlineForm } from 'react-icons/ai'

const NavigationItem = ({ path, label, icon }) => {
    // function to navigate to different route
    const navigate = useNavigate()

    // "null" when not active, "object" when active
    const routeMatch = useMatch(path)
    // path is matched if routeMatch is not null
    // eslint-disable-next-line no-unused-vars
    const isActive = Boolean(routeMatch)

    // eslint-disable-next-line no-unused-vars
    const onClick = () => navigate(path)

    return (
        <MenuItem
            icon={icon}
            active={isActive}
            onClick={onClick}
            label={label}
        />
    )
}

NavigationItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}

export const Navigation = () => (
    // @TODO: Use the `Menu` components instead of the `div`
    <Menu>
        <NavigationItem
            // Menu item for the home page
            label="Home"
            path="/"
            icon={<IoHomeSharp style={{ fontSize: '16px' }} />}
        />

        <NavigationItem
            // Menu item for the meta data page
            label="Attributes"
            path="/attributes"
            icon={<MdAttribution style={{ fontSize: '16px' }} />}
        />

        <NavigationItem
            // Menu item for the meta data page
            label="Indicators"
            path="/indicators"
            icon={<SiElementor style={{ fontSize: '16px' }} />}
        />

        <NavigationItem
            // Menu item for the Form page
            label="Form"
            path="/form"
            icon={<AiOutlineForm style={{ fontSize: '16px' }} />}
        />
    </Menu>
)
