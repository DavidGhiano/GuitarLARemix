export async function getPosts() {
    const request = await fetch(
      `${process.env.API_URL}/posts?populate=imagen`
    );
    return await request.json();
  }
  
  export async function getPost(url) {
    const request = await fetch(
      `${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`
    );
    return await request.json();
  }
  