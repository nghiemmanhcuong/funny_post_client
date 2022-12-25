
export interface ContactItemType {
    image: string;
    name: string;
}

export interface PostType {
    _id: string;
    userId:string,
    description: string;
    image: string;
    liked:string[];
    createdAt:Date;
}

export interface NewPostType{
    description: string;
    image: string;
};

export interface InputRegisterType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface InputLoginType {
    email: string;
    password: string;
}

export interface UserClientType {
    _id?:string;
    email:string;
    firstName:string;
    lastName:string;
    profilePicture?: string;
    coverPicture?: string;
    followers?:string[];
    followings?:string[];
    about?: string,
    livesIn?: string,
    address?: string,
    worksAt?: string,
    relationships?: string,
    job?: string,
    isAdmin?: boolean
}

export interface UserInfoType {
    about?: string;
    livesIn?: string;
    address?: string;
    worksAt?: string;
    relationships?: string;
    job?: string;
    profilePicture?: string;
    coverPicture?: string;
}

export interface CommentType {
    _id?:string;
    content: string;
    postId?:string;
    userId?:string;
    user?:UserClientType;
    createdAt?:string;
}

export interface NotificationType {
    _id?:string;
    senderId:string;
    receiverId:string;
    content: string;
    link: string;
    createdAt?: Date;
    user?:UserClientType;
    read?:boolean;
}