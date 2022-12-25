const handlePostCreatedAt = (createdAt: Date) => {
    const date = new Date(createdAt);
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export default handlePostCreatedAt;
