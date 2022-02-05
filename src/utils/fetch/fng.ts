export interface FngProps {
  value: string
  value_classification: string
  timestamp: string
  time_until_update: string
}

export interface formatedFngProps {
  value: string
  classification: string
}

export const fngFormatter = ({ data }: { data: FngProps[] }): formatedFngProps[] => {
  return data.map((item) => {
    return {
      time: +item.timestamp * 1000,
      value: item.value,
      classification: item.value_classification,
    }
  })
}

// {
//   "name": "Fear and Greed Index",
//   "data": [
//   {
//   "value": "33",
//   "value_classification": "Fear",
//   "timestamp": "1644019200",
//   "time_until_update": "33291"
//   }
//   ],
//   "metadata": {
//   "error": null
//   }
//   }
