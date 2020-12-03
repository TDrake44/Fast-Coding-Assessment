import PropTypes from "prop-types";
import "./card.scss";

const Card = ({ heading, children, checked, ...other }) => (
  <div className="card" role="checkbox" aria-checked={checked} {...other}>
    <div className="card-heading">{heading}</div>
    <div className="card-content">{children}</div>
  </div>
);

Card.defaultProps = {
  children: null,
  heading: "",
  checked: false,
};

Card.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  checked: PropTypes.bool,
};

export default Card;
