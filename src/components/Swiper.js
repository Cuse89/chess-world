import React from "react";
//https://github.com/voronianski/react-swipe
import ReactSwipe from "react-swipe";

class Swiper extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    // important to not re-render, on props.options update as it will reset menu to first option unexpectedly
    return this.props.options === nextProps.options;
  }

  render() {
    let reactSwipeEl;

    return (
      <div>
        <ReactSwipe
          className="carousel"
          swipeOptions={{
            continuous: true,
            callback: (index, elem) =>
              this.props.handleNav(this.props.options[index].val)
          }}
          ref={el => (reactSwipeEl = el)}
        >
          {this.props.options.map((option, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              {option.pretty}
            </div>
          ))}
        </ReactSwipe>

        <button onClick={() => reactSwipeEl.prev()}>Previous</button>
        <button onClick={() => reactSwipeEl.next()}>Next</button>
      </div>
    );
  }
}

export default Swiper;
