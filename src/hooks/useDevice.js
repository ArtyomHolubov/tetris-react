import {useState, useEffect} from "react";

export const devices = {
    mobile: 1,
    computer: 2
}

export const useDevice = () => {
    const [device, setDevice] = useState(null);

    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // код для мобильных устройств
            setDevice(devices.mobile);
        } else {
            // код для обычных устройств
            setDevice(devices.computer);
        }
    }, []);

    return device;
}
