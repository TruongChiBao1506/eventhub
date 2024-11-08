
// export interface AddressModel {
//     address: Address;
//     distance: number;
//     id: string;
//     mapView: MapView;
//     position: Position;
//     resultType: string;
//     title: string;
//   }
  
//   export interface Address {
//     city: string;
//     countryCode: string;
//     countryName: string;
//     county: string;
//     district: string;
//     label: string;
//     postalCode: string;
//     street: string;
//   }
  
//   export interface MapView {
//     east: number;
//     north: number;
//     south: number;
//     west: number;
//   }
  
//   export interface Position {
//     lat: number;
//     lng: number;
//   }
export interface AddressModel {
  address: Address
  boundingbox: string[]
  display_name: string
  lat: string
  licence: string
  lon: string
  osm_id: string
  osm_type: string
  place_id: string
}

export interface Address {
  city: string
  commercial: string
  country: string
  country_code: string
  county: string
  house_number: string
  postcode: string
  road: string
  state: string
}