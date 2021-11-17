import { useNavigate } from 'react-router';
import SearchBar from '../SearchBar';
import { useRef, useState, useEffect } from 'react';

const Header = props =>{
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const [sticky, setSticky] = useState(false);

    useEffect(() =>{
        initalizeScrollObserver();
    }, []);

    const initalizeScrollObserver = () =>{

        if (!headerRef.current) return;

        let options = {
            root: null, //observing element
            threshold: 0, //when to trigger
            rootMargin: "0px" // margin for the observer
        }

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !entry.isVisible) {
                    setSticky(true)
                }

                if (entry.isIntersecting) {
                    setSticky(false);
                }
            });
        }, options);

        observer.observe(headerRef.current);
    }

    const getLogo = () =>{
        return (
            <div 
                className="header-logo" 
                onClick={() => navigate('/')}
            >
                MoviePrime
            </div>
        )
    }

    return (
        <header className="header-container">
            <div className="container header" ref={headerRef}>
                {getLogo()}
            </div> 

            <div id="sticky-header" className={sticky ? 'sticky' : ''}>
                <div className={`container header`}>
                    {getLogo()}
                    
                    <div className="header-search-bar">
                        <SearchBar />
                    </div>
                    
                    <div className="spacer"/>
                </div>
            </div>
        </header>
    )
}

export default Header;