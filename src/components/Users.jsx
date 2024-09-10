import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/users'
import TableInfo from './TableInfo';
import { Box, TableCell, TableRow } from '@mui/material';
import TextField from '@mui/material/TextField';
import MessageDialog from './MessageDialog';
import Button from '@mui/material/Button';

export default function Users() {
    const [isLoading, setIsLoading] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Se obtienen los usuarios usando el metodo getUsers de la API, se almacenan en el estado usersList
    async function getUsersData() {
        setIsLoading(true);
        try {
            const users = await getUsers();
            setUsersList(users);
            setFilteredUsers(users);
            setErrorMessage('');
            setShowError(false);
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    }

    // Se actualiza el listado de usuarios cada vez que se cambia el termino de busqueda
    function handleSearch(event) {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredUsers = usersList.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredUsers);
    }

    return (
        <div>
            {/* Dialogo para mostrar errores */}
            <MessageDialog open={showError} handleClose={() => setShowError(false)} title={'Se produjo un error'} message={errorMessage} />

            {/* Caja de busqueda y boton para consultar los usuarios */}
            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField sx={{
                    minWidth: '150px'
                }} size="small" label="Buscar por nombre" variant="outlined" value={searchTerm} onChange={handleSearch} />

                <Button variant="contained" onClick={getUsersData}>Consultar</Button>

                {isLoading && <div>Recuperando datos...</div>}
            </Box>
            <br />

            {/* Tabla con los usuarios filtrados */}
            <TableInfo headers={["Nombre", "Email", "Ciudad"]}>
                {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address.city}</TableCell>
                    </TableRow>
                ))}
            </TableInfo>
        </div>
    )
}
