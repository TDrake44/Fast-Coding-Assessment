import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./bag.scss";

const Bag = ({ children }) => {
  const [show, setShow] = useState(false);

  const classes = classNames("bag", {
    show: show && children.length > 0,
  });

  const handleShow = () => {
    if (children.length > 0) {
      setShow(!show);
    }
  };

  return (
    <div className={classes}>
      <button
        type="button"
        data-testid="bag-trigger"
        className="trigger"
        onClick={() => handleShow()}
      >
        {`Movie Bag (${children ? children.length : 0})`}
      </button>
      {children.length > 0 && (
        <div className="content" data-testid="bag-content">
          {children}
        </div>
      )}
    </div>
  );
};

Bag.defaultProps = {
  children: [],
};

Bag.propTypes = {
  children: PropTypes.node,
};

export default Bag;
