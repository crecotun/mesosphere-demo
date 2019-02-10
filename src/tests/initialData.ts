export const storeInitialData = {
  cluster: {
    id: 'cluster-1',
    createdAt: 'Sun Feb 10 2019 18:39:52 GMT+0100',
    applications: [
      {
        id: 'application-1',
        createdAt: 'Sun Feb 10 2019 18:40:01 GMT+0100',
        image: 'hadoop',
      },
      {
        id: 'application-2',
        createdAt: 'Sun Feb 10 2019 18:40:02 GMT+0100',
        image: 'rails',
      },
      {
        id: 'application-3',
        createdAt: 'Sun Feb 10 2019 18:40:03 GMT+0100',
        image: 'chronos',
      },
      {
        id: 'application-4',
        createdAt: 'Sun Feb 10 2019 18:40:04 GMT+0100',
        image: 'spark',
      },
    ],
    servers: [
      {
        id: 'server-1',
        createdAt: 'Sun Feb 10 2019 18:39:55 GMT+0100',
        applicationIds: ['application-1'],
      },
      {
        id: 'server-2',
        createdAt: 'Sun Feb 10 2019 18:39:56 GMT+0100',
        applicationIds: [],
      },
      {
        id: 'server-3',
        createdAt: 'Sun Feb 10 2019 18:39:57 GMT+0100',
        applicationIds: ['application-2', 'application-3'],
      },
      {
        id: 'server-4',
        createdAt: 'Sun Feb 10 2019 18:39:58 GMT+0100',
        applicationIds: ['application-4'],
      },
    ],
  },
}
