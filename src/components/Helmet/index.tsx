import {ReactNode, useEffect} from 'react';

interface HelmetProps {
    title: string;
    children: ReactNode;
}

const Helmet = ({title, children}: HelmetProps) => {
    document.title = title ? title : '';
    return <div>{children}</div>;
};

export default Helmet;
