/* eslint-disable no-console */
import {
  Client,
  DirectionsRequest,
  FindPlaceFromTextRequest,
  PlaceInputType,
  PlaceDetailsRequest,
  TravelMode,
  LatLngLiteral,
} from '@googlemaps/google-maps-services-js';
import { DirectionsResponseData } from '@googlemaps/google-maps-services-js/dist/directions';
import CacheUtil from '../../utils/caches/CacheUtil';

type PlaceId = string;
export default class DirectionService {
  static async getBestDirection(): Promise<DirectionsResponseData | null> {
    const cacheValue = CacheUtil.getCacheValueByKey<DirectionsResponseData>('some-key');
    if (cacheValue) {
      return cacheValue;
    }
    const client = new Client();
    const key = process.env.GOOGLE_API_KEY || '';

    const scgPlaceId = await DirectionService.findPlaceIdFromString('SCG Building, Bangkok', client, key);
    const ctwPlaceId = await DirectionService.findPlaceIdFromString('Central World, Bangkok', client, key);

    const latlongSCG = await DirectionService.findLocationFromPlaceId(scgPlaceId, client, key);
    const latlongCTW = await DirectionService.findLocationFromPlaceId(ctwPlaceId, client, key);

    const direction: DirectionsResponseData | null = await DirectionService
      .findBestDirectionFromTo(client, key, latlongSCG, latlongCTW);
    if (!direction) return null;
    CacheUtil.setCacheValue<DirectionsResponseData>('some-key', direction);
    return direction;
  }

  static async findPlaceIdFromString(
    placeStr: string,
    client: Client,
    key: string,
  ): Promise<PlaceId | null> {
    const req: FindPlaceFromTextRequest = {
      params: {
        input: placeStr,
        inputtype: PlaceInputType.textQuery,
        key,
      },
    };
    return client.findPlaceFromText(req)
      .then((res) => {
        const placeId = res.data.candidates[0].place_id;
        if (placeId) return placeId;
        console.log(`Cannot find place id for req: ${req}, res: ${res}`);
        return null;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  static async findLocationFromPlaceId(
    placeId: PlaceId | null,
    client: Client,
    key: string,
  ): Promise<LatLngLiteral | null> {
    if (!placeId) return null;
    const req: PlaceDetailsRequest = {
      params: {
        place_id: placeId,
        key,
      },
    };
    return client.placeDetails(req)
      .then((res) => {
        const latlng = res.data.result.geometry?.location;
        if (latlng) return latlng;
        console.log(`Cannot find location from req ${req}, res: ${res}`);
        return null;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  static async findBestDirectionFromTo(
    client: Client,
    key: string,
    from: LatLngLiteral | null,
    to: LatLngLiteral | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    if (!from || !to) return null;
    const req: DirectionsRequest = {
      params: {
        origin: from,
        destination: to,
        mode: TravelMode.driving,
        key,
      },
    };
    return client.directions(req).then((res) => {
      console.log(res);
      const { data } = res;
      if (data) return data;
      console.log(`Cannot find direction from req: ${req}, res: ${res}`);
      return null;
    })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}
