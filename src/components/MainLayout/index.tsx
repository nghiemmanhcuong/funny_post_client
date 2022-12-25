import LeftBar from '../LeftBar';
import RightBar from '../RightBar';
import {ReactNode, useEffect, useRef} from 'react';
import {MainLayoutContanier, MainStyled, SiteBarStyled} from './styles';
import {useLocation, useNavigate} from 'react-router-dom';

interface Props {
    children?: ReactNode;
}

const MainLayout = ({children}: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const mainLayoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/auth/login');
        }
    }, []);

    useEffect(() => {
        mainLayoutRef.current?.scrollTo({top: 0, behavior: 'smooth'})
    },[location.pathname])

    return (
        <MainLayoutContanier>
            <SiteBarStyled>
                <LeftBar />
            </SiteBarStyled>
            <MainStyled ref={mainLayoutRef}>{children}</MainStyled>
            <SiteBarStyled>
                <RightBar />
            </SiteBarStyled>
        </MainLayoutContanier>
    );
};

export default MainLayout;
