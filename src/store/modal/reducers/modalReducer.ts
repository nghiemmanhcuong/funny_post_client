import {ModalActionType} from '../../type';

export interface ModalState {
    isOpenAddFriendModal: boolean;
    isOpenEditPostModal: boolean;
    isOpenUserImageModal: boolean;
    isOpenCommentModal: boolean;
}

export interface ModalAction {
    type: ModalActionType;
    payload?: boolean;
}

const modalReducer = (state: ModalState, action: ModalAction) => {
    switch (action.type) {
        case ModalActionType.OPEN_ADD_FRIEND_MODAL:
            return {
                ...state,
                isOpenAddFriendModal: true,
            };

        case ModalActionType.CLOSE_ADD_FRIEND_MODAL:
            return {
                ...state,
                isOpenAddFriendModal: false,
            };

        case ModalActionType.OPEN_EDIT_POST_MODAL:
            return {
                ...state,
                isOpenEditPostModal: true,
            };

        case ModalActionType.CLOSE_EDIT_POST_MODAL:
            return {
                ...state,
                isOpenEditPostModal: false,
            };

        case ModalActionType.OPEN_USER_IMAGE_MODAL:
            return {
                ...state,
                isOpenUserImageModal: true,
            };

        case ModalActionType.CLOSE_USER_IMAGE_MODAL:
            return {
                ...state,
                isOpenUserImageModal: false,
            };

        case ModalActionType.OPEN_COMMENT_MODAL:
            return {
                ...state,
                isOpenCommentModal: true,
            };

        case ModalActionType.CLOSE_COMMENT_MODAL:
            return {
                ...state,
                isOpenCommentModal: false,
            };

        default:
            return state;
    }
};

export default modalReducer;
