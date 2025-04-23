import PropTypes from 'prop-types';

function Header({ text, bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  };
  return (
    <header style={({ backgroundColor: 'black', color: 'gold' }, headerStyles)}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  text: 'Tela opinatória',
  bgColor: '#dce6f1',
  textColor: '#2c3e50',
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
