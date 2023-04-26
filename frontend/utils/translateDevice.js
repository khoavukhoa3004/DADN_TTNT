const translateDevice = (deviceNameSystem) => {
    const parts = deviceNameSystem.split('-');
    // const userName = parts[0];
    // const room = parseInt(parts[1]);
    // const deviceName = parts[2];
    // const index = parseInt(parts[3]);
    if(parts[2] === 'fanstatus')
      return 'Fan';
    else if(parts[2] === 'doorstatus')
      return 'Door';
    else if(parts[2] === 'ledstatus')
      return 'Led'; 
    return parts[2];
}

const getVietNameseDevice = (deviceNameSystem) => {
    const parts = deviceNameSystem.split('-');
    // const userName = parts[0];
    // const room = parseInt(parts[1]);
    // const deviceName = parts[2];
    // const index = parseInt(parts[3]);
    if(parts[2] === 'fanstatus')
      return 'Quạt';
    else if(parts[2] === 'doorstatus')
      return 'Cánh cửa';
    else if(parts[2] === 'ledstatus')
      return 'Đèn'; 
    return parts[2];
}

export {translateDevice, getVietNameseDevice};