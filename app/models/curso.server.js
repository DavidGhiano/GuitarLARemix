export async function getCurso(){
    const request = await fetch(`${process.env.API_URL}/curso?populate=imagen`);
    return await request.json();
}