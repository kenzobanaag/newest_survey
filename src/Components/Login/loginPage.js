import React from 'react';
import NavBar from '../Login/navbar'
import ContainerMaterial from '@material-ui/core/Container'
import LogIn from '../Login/LogInAccountPage'

export default function logPage() {
    return (
        <div>
            <NavBar/>
            <ContainerMaterial maxWidth="md">
                <LogIn/>
            </ContainerMaterial>
        </div>
    )
}