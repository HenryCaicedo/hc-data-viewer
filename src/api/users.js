// // Se obtiene el listado de usuarios desde la API mediante una petición GET usando el método fetch.
export async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // Si la respuesta no es exitosa, se lanza un error
    if (!response.ok) throw new Error('No se pudieron obtener los datos de los usuarios');

    // Si no hay error, se retorna el listado de posts en formato JSON
    const json = await response.json();
    return json;
}

