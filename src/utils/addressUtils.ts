// File: src/utils/addressUtils.ts
import { ShippingAddress } from '../types';

export class AddressUtils {
  static shuffleAddress(shippingAddress?: ShippingAddress): string[] {
    if (!shippingAddress) {
      return ['', '', '', ''];
    }

    const addressParts = [
      shippingAddress.address1,
      shippingAddress.address2,
      shippingAddress.city,
      shippingAddress.country
    ];

    const compactedParts = addressParts.filter((part): part is string => 
      part !== undefined && part !== null && part.trim() !== '' && part.trim().toLowerCase() !== 'n/a'
    );

    return [...compactedParts, '', '', '', ''].slice(0, 4);
  }
}

