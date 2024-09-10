import React, { useMemo, useState } from 'react'
import TableInfo from './TableInfo';
import { Box, TableCell, TableRow } from '@mui/material';
import TextField from '@mui/material/TextField';
import MessageDialog from './MessageDialog';
import Button from '@mui/material/Button';
import { getPosts } from '../api/posts';

export default function Users() {
    const [isLoading, setIsLoading] = useState(false);
    const [postsList, setPostsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    // Se obtienen los posts usando el metodo getPosts de la API, se almacenan en el estado postsList
    async function getPostsData() {
        setIsLoading(true);
        try {
            const posts = await getPosts();
            setPostsList(posts);
            setShowError(false);
        } catch (error) {
            // En caso de error, se captura el mensaje de error y se muestra en un dialogo 
            console.log(error.message);
            setErrorMessage(error.message);
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    }

    // Se actualiza el listado de posts cada vez que se cambia el termino de busqueda
    const filteredPosts = useMemo(() => postsList.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ), [postsList, searchTerm]);

    function handleSearch(event) {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

    }

    return (
        <div>
            {/* Dialogo para mostrar errores */}
            <MessageDialog open={showError} handleClose={() => setShowError(false)} title={'Se produjo un error'} message={errorMessage} />

            {/* Caja de busqueda y boton para consultar los posts */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField sx={{
                    minWidth: '150px'
                }} size="small" label="Buscar por titulo" variant="outlined" value={searchTerm} onChange={handleSearch} />

                <Button variant="contained" onClick={getPostsData}>Consultar</Button>

                {isLoading && <div>Recuperando datos...</div>}
            </Box>
            <br />

            {/* Tabla con los posts filtrados */}
            <TableInfo headers={["Titulo", "Cuerpo"]}>
                {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.body}</TableCell>
                    </TableRow>
                ))}
            </TableInfo>
        </div>
    )
}
