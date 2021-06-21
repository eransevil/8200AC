import PropTypes from 'prop-types'


const button = ({ color, text, onClick }) => {

    

    return (
        <div>
            <button onClick={onClick} style={{ backgroundColor: color }} className="btn"> {text}</button>
        </div>
    )
}

button.defaultProps = {
    color: 'steelblue'
}

button.propTypes ={
    tex:PropTypes.string,
    color:PropTypes.string,
    onClick:PropTypes.func
}

export default button
