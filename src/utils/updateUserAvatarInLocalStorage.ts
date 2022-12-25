const updateUserAvatarInLocalStorage = (newAvatar: string) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    currentUser.profilePicture = newAvatar;
    localStorage.setItem('user',JSON.stringify(currentUser));
}

export default updateUserAvatarInLocalStorage;