import React, { useState } from "react"
import {
    Nav,
    NavItem,
    NavList,
    NavExpandable,
} from '@patternfly/react-core';
import { Link } from "react-router-dom";

const NavBar = () => {
    const [activeItem, setActiveItem] = useState(0)
    const [activeGroup, setActiveGroup] = React.useState('');
    const onNavSelect = (_e, item) => {
        setActiveItem(item.itemId)
        setActiveGroup(item.groupId)
    }
    return (
        <Nav onSelect={onNavSelect} aria-label="Nav">
            <NavList>
                <NavExpandable
                    title="ROS OCP"
                    groupId="rosocp"
                    isActive={activeGroup === 'rosocp'}
                    isExpanded
                >
                    <NavItem
                        id="accounts"
                        groupId="rosocp"
                        itemId="accounts"
                        isActive={activeItem === 'accounts'}
                    >
                        <Link to='/accounts'>
                            Accounts
                        </Link>
                    </NavItem>
                    <NavItem
                        id="clusters"
                        groupId="rosocp"
                        itemId="clusters"
                        isActive={activeItem === 'clusters'}
                    >
                        <Link to='/clusters'>
                            Clusters
                        </Link>
                    </NavItem>
                </NavExpandable>
                <NavItem itemId={1} isActive={activeItem === 1} to="#rosrhel">
                    ROS RHEL
                </NavItem>
            </NavList>
        </Nav>
    )
}
export default NavBar