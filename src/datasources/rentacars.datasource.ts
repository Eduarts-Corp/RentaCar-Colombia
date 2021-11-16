import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'rentacars',
  connector: 'mongodb',
  url: 'mongodb+srv://Eduarts:soporte2021@clusterc4g6.aceia.mongodb.net/RentacarsBD?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RentacarsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'rentacars';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.rentacars', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
