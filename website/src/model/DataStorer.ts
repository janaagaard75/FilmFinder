import { Data } from "./data/Data"

interface TimestampedData {
  buildTimestamp: number,
  data: Data,
  storeTimestamp: Date
}

export class DataStorer {
  private static readonly dataKey = "data"

  public static dataIsOkay(storedData: TimestampedData | undefined): storedData is TimestampedData {
    const isUpToDate = storedData !== undefined
      && DataStorer.isCorrectVersion(storedData.buildTimestamp)
      && DataStorer.isRecentEnough(storedData.storeTimestamp)
    return isUpToDate
  }

  public static loadData(): TimestampedData | undefined {
    const dataString = localStorage.getItem(this.dataKey)
    // tslint:disable-next-line no-null-keyword
    if (dataString === null) {
      return undefined
    }

    return JSON.parse(dataString) as TimestampedData
  }

  public static saveData(data: Data) {
    const storedData: TimestampedData = {
      buildTimestamp: __BUILD_TIMESTAMP__,
      data: data,
      storeTimestamp: new Date()
    }

    const dataString = JSON.stringify(storedData)
    localStorage.setItem(this.dataKey, dataString)
  }

  private static isCorrectVersion(storedBuildTimestamp: number) {
    const timestampMatches = storedBuildTimestamp === __BUILD_TIMESTAMP__
    return timestampMatches
  }

  private static isRecentEnough(storeTimestamp: Date) {
    const now = new Date()
    // tslint:disable-next-line prefer-const
    let latestDataCrawl = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0)
    if (latestDataCrawl.valueOf() > now.valueOf()) {
      latestDataCrawl.setDate(latestDataCrawl.getDate() - 1)
    }

    const millisecondsIn24Hours = 24 * 60 * 60 * 1000
    const millisecondsSinceLatestFetch = latestDataCrawl.valueOf() - storeTimestamp.valueOf()
    const isRecentEnough = millisecondsSinceLatestFetch < millisecondsIn24Hours
    return isRecentEnough
  }
}