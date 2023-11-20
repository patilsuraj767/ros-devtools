import React from 'react';
import {
    Page,
    PageSidebar,
    PageSidebarBody,
    Masthead,
    MastheadToggle,
    MastheadMain,
    MastheadBrand,
    MastheadContent,
    Button,
    Toolbar,
    ToolbarGroup,
    ToolbarItem,
    ButtonVariant
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon';
import NavBar from '../navbar/navbar';
import { useNavigate, Link } from "react-router-dom";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const logoutClicked = () => {
        navigate('/')
    }

    const header = (
        <Masthead id="basic-example">
            <MastheadToggle>
                <Button variant="plain" onClick={() => { }} aria-label="Global navigation">
                    <BarsIcon />
                </Button>
            </MastheadToggle>
            <MastheadMain>
                <MastheadBrand>ROS devtools</MastheadBrand>
            </MastheadMain>
            <MastheadContent>
                <Toolbar id="toolbar" isFullHeight isStatic>
                    <ToolbarGroup
                        variant="icon-button-group"
                        align={{ default: 'alignRight' }}
                        spacer={{ default: 'spacerNone', md: 'spacerMd' }}
                    >
                        <ToolbarItem>
                            <Button
                                aria-label="Notifications"
                                variant={ButtonVariant.plain}
                                onClick={logoutClicked}
                            >Logout</Button>
                        </ToolbarItem>
                    </ToolbarGroup>
                </Toolbar>
            </MastheadContent>
        </Masthead>
    )

    const sidebar = (
        <PageSidebar>
            <PageSidebarBody><NavBar /></PageSidebarBody>
        </PageSidebar>
    )

    return (
        <Page
            header={header}
            sidebar={sidebar}
            isManagedSidebar={true}
            mainContainerId='main-content-page-layout-default-nav'
        >
            {children}
        </Page>
    )
}

export default Layout