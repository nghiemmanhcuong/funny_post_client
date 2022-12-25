const uploadImage = async (file: File):Promise<string> => {
    let image = '';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'shemhvan');
    formData.append('cloud_name', 'dajfqgjix');

    await fetch('https://api.cloudinary.com/v1_1/dajfqgjix/image/upload', {
        method: 'POST',
        body: formData,
    })
        .then((response: Response) => {
            return response.json();
        })
        .then((data) => {
            image = data.url;
        })
        .catch((error) => {
            console.log(error);
        });

    return image;
};

export default uploadImage;
