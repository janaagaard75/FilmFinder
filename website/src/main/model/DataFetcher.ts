import "whatwg-fetch"

import { LzstringWorkerCaller } from "./LzstringWorkerCaller"
import { ApiData } from "./serializable-data/SerializableData"

export class DataFetcher {
  private static readonly dataUrl = "https://film-filter-data.herokuapp.com/compressed"

  public static async fetchData(): Promise<ApiData | undefined> {
    try {
      const response = await window.fetch(this.dataUrl, { mode: "cors" })
      const compressedString = await response.text()
      const serializableData = await LzstringWorkerCaller.decompressStringToSerializableData(compressedString)
      return serializableData
    }
    catch (error) {
      console.error(error)
      return undefined
    }
  }
}