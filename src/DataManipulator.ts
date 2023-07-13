import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert: number | undefined,
  price_abc: number,
  price_def: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]){
    let priceABC: number, priceDEF: number, ratio: number, upperBound: number, lowerBound: number;
    priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    priceDEF = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    ratio = priceABC / priceDEF;
    upperBound = 1 + 0.05;
    lowerBound = 1 - 0.05;
    return serverResponds.map((el: any) => {
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio: ratio,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
          serverResponds[0].timestamp : serverResponds[1].timestamp,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
    })
  }
}
