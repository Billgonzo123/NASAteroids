export const DeviceWidthObject = {
    MobileSmall: { max: 320, min: 0 },
    MobileMedium: { max: 375, min: 321 },
    MobileLarge: { max: 767, min: 376 },
    Tablet: { max: 991, min: 768 },
    LaptopSmall: { max: 1024, min: 992 },
    LaptopLarge: { max: 1440, min: 1025 },
    LargerThanLaptop: { max: 2560, min: 1441 },
    LargeScreenMax: { max: 999999, min: 2561 }
  };
  
  export const IdDeviceBreakpointsByWidth = {
    laptop_max: 1440,
    laptop_min: 992,
    tablet_min: 768,
    tablet_max: 991,
    mobile_max: 767,
    default_min: 768 // Unrecognized device
  };
  export const IdMobileHeight = {
    mobileLandscape_min: 320,
    mobileLandscape_max: 425
  };
  
  export const getWindowDimension = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    return { width, height };
  };
  
  export const getDeviceTypeInfo = (windowDimension = getWindowDimension()) => {
    const { width, height } = windowDimension
  
    const buildDeviceDetails = {
      deviceType: "",
      deviceTypeVariant: "",
      orientation: "Portrait",
      width,
      height,
      isFallback: false
    };
  
    //  Edge case
    const hasEdgeCase = handleExceptions(buildDeviceDetails, width, height);
    if (hasEdgeCase) {
      return hasEdgeCase;
    }
  
    if (height < width) {
      // Orientation is landscape
      buildDeviceDetails.orientation = "Landscape";
      if (height <= IdMobileHeight.mobileLandscape_max) {
        // Mobile (landscape)
        buildDeviceDetails.deviceType = "Mobile";
  
        for (const devc in DeviceWidthObject) {
          if (
            height <= DeviceWidthObject[devc].max &&
            height >= DeviceWidthObject[devc].min
          ) {
            buildDeviceDetails.deviceTypeVariant = devc;
            break;
          }
        }
      } else if (
        width <= IdDeviceBreakpointsByWidth.tablet_max &&
        width >= IdDeviceBreakpointsByWidth.tablet_min
      ) {
        // Tablet (landscape)
        buildDeviceDetails.deviceType = "Tablet";
        buildDeviceDetails.deviceTypeVariant = "Tablet";
      } else if (
        width <= IdDeviceBreakpointsByWidth.laptop_max &&
        width >= IdDeviceBreakpointsByWidth.laptop_min
      ) {
        // Laptop (landscape)
        buildDeviceDetails.deviceType = "Laptop";
        for (const devc in DeviceWidthObject) {
          if (
            width <= DeviceWidthObject[devc].max &&
            width >= DeviceWidthObject[devc].min
          ) {
            buildDeviceDetails.deviceTypeVariant = devc;
            break;
          }
        }
      } else if (width > IdDeviceBreakpointsByWidth.laptop_max) {
        // Larger than Laptop (landscape)
        buildDeviceDetails.deviceType = "LargerThanLaptop";
        for (const devc in DeviceWidthObject) {
          if (
            width <= DeviceWidthObject[devc].max &&
            width >= DeviceWidthObject[devc].min
          ) {
            buildDeviceDetails.deviceTypeVariant = devc;
            break;
          }
        }
      } else {
        // TODO: UNKNOWN realm
        buildDeviceDetails.deviceType = "Mobile";
        buildDeviceDetails.deviceTypeVariant = "MobileLarge";
        buildDeviceDetails.isFallback = true;
      }
      return buildDeviceDetails;
    } else {
      // Orientation is portrait
      buildDeviceDetails.orientation = "Portrait";
      for (const devc in DeviceWidthObject) {
        if (
          width <= DeviceWidthObject[devc].max &&
          width >= DeviceWidthObject[devc].min
        ) {
          buildDeviceDetails.deviceTypeVariant = devc;
          break;
        }
      }
      if (
        width <= IdDeviceBreakpointsByWidth.laptop_max &&
        width >= IdDeviceBreakpointsByWidth.laptop_min
      ) {
        buildDeviceDetails.deviceType = "Laptop";
      }
      if (
        width <= IdDeviceBreakpointsByWidth.tablet_max &&
        width >= IdDeviceBreakpointsByWidth.tablet_min
      ) {
        buildDeviceDetails.deviceType = "Tablet";
      }
  
      if (width <= IdDeviceBreakpointsByWidth.mobile_max) {
        buildDeviceDetails.deviceType = "Mobile";
      }
      if (width > IdDeviceBreakpointsByWidth.laptop_max) {
        buildDeviceDetails.deviceType = "LargerThanLaptop";
      }
      return buildDeviceDetails;
    }
  };
  
  const handleExceptions = (buildDeviceDetails, width, height) => {
    //  iPadPro
    if (width === 1024 && height === 1366) {
      buildDeviceDetails.deviceType = "Tablet";
      buildDeviceDetails.deviceTypeVariant = "iPadPro";
      buildDeviceDetails.orientation = "Portrait";
  
      return buildDeviceDetails;
    } else if (width === 1366 && height === 1024) {
      //  Edge case
      buildDeviceDetails.deviceType = "Tablet";
      buildDeviceDetails.deviceTypeVariant = "iPadPro";
      buildDeviceDetails.orientation = "Landscape";
      return buildDeviceDetails;
    }
  
    return undefined;
  };
  
  export const isMobileDevice = () => {
    const deviceInformation = getDeviceTypeInfo();
    return deviceInformation.deviceType === "Mobile";
  };
  
  export const isTabletDevice = () => {
    const deviceInformation = getDeviceTypeInfo();
  
    return deviceInformation.deviceType === "Tablet";
  };
  
  export const isLaptopDevice = () => {
    const deviceInformation = getDeviceTypeInfo();
  
    return deviceInformation.deviceType === "Laptop";
  };
  
  export const isBiggerThanLaptop = () => {
    const deviceInformation = getDeviceTypeInfo();
  
    return deviceInformation.deviceType === "LargerThanLaptop";
  };