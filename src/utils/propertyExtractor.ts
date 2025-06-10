// File: src/utils/propertyExtractor.ts
import { Property } from '../types';

export class PropertyExtractor {
  static extractProperty(properties: Property[], name: string): string {
    const prop = properties.find(p => 
      p.name.trim().toLowerCase() === name.toLowerCase()
    );
    return prop ? prop.value.trim().toUpperCase() : '';
  }
}
