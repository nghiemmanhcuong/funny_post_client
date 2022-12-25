import {createContext, ReactNode, useReducer} from 'react';
import modalReducer, {ModalState} from './reducers/modalReducer';
import {ModalActionType} from '../type';

interface ModalContextProps {
    children: ReactNode;
}

interface ModalContextType {
    modal: ModalState;
    openModal: (type: ModalActionType) => void;
    closeModal: (type: ModalActionType) => void;
}

const initialState: ModalState = {
    isOpenAddFriendModal: false,
    isOpenEditPostModal: false,
    isOpenUserImageModal:false,
    isOpenCommentModal:false,
};

const ModalContext = createContext<ModalContextType>({
    modal: initialState,
    openModal: () => null,
    closeModal: () => null,
});

function ModalContextProvider({children}: ModalContextProps) {
    const [modal, dispatch] = useReducer(modalReducer, initialState);

    const openModal = (type: ModalActionType) => dispatch({type});
    const closeModal = (type: ModalActionType) => dispatch({type});

    const modalContextData = {
        modal,
        openModal,
        closeModal,
    };

    return <ModalContext.Provider value={modalContextData}>{children}</ModalContext.Provider>;
}

export {ModalContext};
export default ModalContextProvider;
