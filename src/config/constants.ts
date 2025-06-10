// File: src/config/constants.ts
export const API_CONFIG = {
    PROXY_BASE: process.env.REACT_APP_PROXY_BASE || 'http://localhost:3001/api/shopify',
    API_VERSION: '2024-04'
  } as const;
  
  export const COURIER_CONFIG = {
    NEXT_DAY_SERVICE_NAME: 'Next Day',
    STANDARD_SERVICE_NAME: 'Standard',
    HIGHLANDS_AND_ISLANDS_POSTCODES: [
      'AB31', 'AB32', 'AB33', 'AB34', 'AB35', 'AB36', 'AB37', 'AB38', 'AB40', 'AB41', 'AB42', 'AB43', 'AB44', 'AB45', 'AB46', 'AB47', 'AB48', 'AB49', 'AB50', 'AB51', 'AB52', 'AB53', 'AB54', 'AB55', 'AB56',
      'IV1', 'IV2', 'IV3', 'IV4', 'IV5', 'IV6', 'IV7', 'IV8', 'IV9', 'IV10', 'IV11', 'IV12', 'IV13', 'IV14', 'IV15', 'IV16', 'IV17', 'IV18', 'IV19', 'IV20', 'IV21', 'IV22', 'IV23', 'IV24', 'IV25', 'IV26', 'IV27', 'IV28',
      'IV30', 'IV31', 'IV32', 'IV36', 'IV40', 'IV41', 'IV42', 'IV43', 'IV44', 'IV45', 'IV46', 'IV47', 'IV48', 'IV49', 'IV51', 'IV52', 'IV53', 'IV54', 'IV55', 'IV56', 'IV63',
      'KA27', 'KA28', 'KW1', 'KW2', 'KW3', 'KW4', 'KW5', 'KW6', 'KW7', 'KW8', 'KW9', 'KW10', 'KW11', 'KW12', 'KW13', 'KW14', 'KW15', 'KW16', 'KW17',
      'PA20', 'PA21', 'PA22', 'PA23', 'PA24', 'PA25', 'PA26', 'PA27', 'PA28', 'PA29', 'PA30', 'PA31', 'PA32', 'PA33', 'PA34', 'PA35', 'PA36', 'PA37', 'PA38', 'PA41', 'PA42', 'PA43', 'PA44', 'PA45', 'PA46', 'PA47', 'PA48', 'PA49', 'PA60', 'PA61', 'PA62', 'PA63', 'PA64', 'PA65', 'PA66', 'PA67', 'PA68', 'PA69', 'PA70', 'PA71', 'PA72', 'PA73', 'PA74', 'PA75', 'PA76', 'PA77', 'PA78',
      'PH4', 'PH5', 'PH6', 'PH7', 'PH8', 'PH9', 'PH10', 'PH11', 'PH12', 'PH13', 'PH14', 'PH15', 'PH16', 'PH17', 'PH18', 'PH19', 'PH20', 'PH21', 'PH22', 'PH23', 'PH24', 'PH25', 'PH26',
      'PH30', 'PH31', 'PH32', 'PH33', 'PH34', 'PH35', 'PH36', 'PH37', 'PH38', 'PH39', 'PH40', 'PH41', 'PH42', 'PH43', 'PH44', 'PH49', 'PH50',
      'ZE1', 'ZE2', 'ZE3', 'HS', 'BT', 'IM', 'GY', 'JE'
    ]
  } as const;
  