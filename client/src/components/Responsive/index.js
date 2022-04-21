import React from "react";
import {
  getWindowDimension,
  IdDeviceBreakpointsByWidth,
  IdMobileHeight
} from "../../util/responsive";

const { width, height } = getWindowDimension();

export class Responsive extends React.PureComponent {
  state = { width, height };
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }

  render = () => {
    const { children, displayIn } = this.props;
    const { width, height } = this.state;

    const dispInArr = displayIn.map(val => val.toLowerCase());
    const shouldRenderChildren = this.shouldRender(dispInArr, width, height);

    return (
      <React.Fragment>{shouldRenderChildren ? children : null}</React.Fragment>
    );
  };

  handleResize = () => {
    const { width, height } = getWindowDimension();
    this.setState({ width, height });
  };

  shouldRender = (display, width, height) => {
    if (
      display.indexOf("laptop") !== -1 &&
      width > height &&
      width >= IdDeviceBreakpointsByWidth.laptop_min
    ) {
      //  always landscape
      return true;
    }

    if (display.indexOf("tablet") !== -1) {
      if (
        width <= IdDeviceBreakpointsByWidth.tablet_max &&
        width >= IdDeviceBreakpointsByWidth.tablet_min
      ) {
        return true;
      }
      //  Cater iPad pro portrait (ONLY)
      if (width === 1024 && height === 1366) {
        return true;
      }
    }

    // For mobile regardless of orientation
    if (
      display.indexOf("mobile") !== -1 &&
      width <= IdDeviceBreakpointsByWidth.mobile_max
    ) {
      return true;
    }

    if (
      display.indexOf("mobileportrait") !== -1 &&
      (width <= IdDeviceBreakpointsByWidth.mobile_max &&
        height >= IdMobileHeight.mobileLandscape_max)
    ) {
      return true;
    }

    return !!(
      display.indexOf("mobilelandscape") !== -1 &&
      (width <= IdDeviceBreakpointsByWidth.mobile_max &&
        height <= IdMobileHeight.mobileLandscape_min)
    );
  };
}