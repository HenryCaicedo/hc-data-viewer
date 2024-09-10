// Se obtiene el listado de posts desde la API mediante una petición GET usando el método fetch.
export async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    // Si la respuesta no es exitosa, se lanza un error
    if (!response.ok) throw new Error('No se pudieron obtener los datos de los posts');

    // Si no hay error, se retorna el listado de posts en formato JSON
    const json = await response.json();
    return json;
}
