const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const MOCK_API_KEY = "KEY";

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Send the address to Google API
  //God damnit they need my credit card. Im going to just follow along

  //They want to render a map as well
  //Google map api would be added with declare var google

  //There is a types package for google maps
  //This will attach the types for the Google API results!

  //Ok so Typescripts advancements are brought forward by the community
  //== the types packages

  //OpenLayers is an alternative map to Google Maps
  //It uses OpenStreetMap
  const mockApiResponse = mockMapApi(enteredAddress);
  const mapDiv = document.getElementById("map")!;
  mapDiv.innerHTML = mockApiResponse.data.results[0]!.formatted_address;
}

//Listen for submit event
form.addEventListener("submit", searchAddressHandler);

function mockMapApi(address: string): MockApiResponse {
  console.log("Entered: " + address);
  //They are using Axios with the credit card version
  //encodeURI is used to convert a string into a URI compatible string! It is a vanilla Javascript function

  //Response is outside of Typescript's grasp
  //We could add Axios of Typescript the type of the return type
  //The type has to be created manually

  //Poor man's Google API
  return new MockApiResponse(
    new MockData([
      new MockAddressResult("Cool street", new Coordinate(123, 321)),
    ]),
    200
  );
}

class MockApiResponse {
  data: MockData;
  status: number;

  constructor(data: MockData, status: number) {
    this.data = data;
    this.status = status;
  }
}

class MockData {
  results: MockAddressResult[];

  constructor(results: MockAddressResult[]) {
    this.results = results;
  }
}

class MockAddressResult {
  formatted_address: string;
  coordinate: Coordinate;

  constructor(formatted_address: string, coordinate: Coordinate) {
    this.formatted_address = formatted_address;
    this.coordinate = coordinate;
  }
}

class Coordinate {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
