
import Button from './Button'
import {useLocation} from 'react-router-dom';
const Header = ({ title, onAdd, showAdd}) => {
    const location = useLocation()
    return (
        <header className="header">
            <h1> Task Tracker {title}</h1>
            {location.pathname ==='/' && <Button onClick={onAdd} color={showAdd? 'red': 'green'} text={showAdd? 'Close' : 'Add'} />}
        </header>
    )
}

Header.defaultProps = {
    title: 'def props'
}

export default Header
