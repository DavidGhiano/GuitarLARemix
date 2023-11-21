export async function getGuitarras() {
  const request = await fetch(
    `${process.env.API_URL}/guitarras?populate=imagen`
  );
  return await request.json();
}

export async function getGuitarra(url) {
  const request = await fetch(
    `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
  );
  return await request.json();
}
