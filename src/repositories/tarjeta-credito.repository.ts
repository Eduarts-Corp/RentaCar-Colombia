import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {RentacarsDataSource} from '../datasources';
import {TarjetaCredito, TarjetaCreditoRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class TarjetaCreditoRepository extends DefaultCrudRepository<
  TarjetaCredito,
  typeof TarjetaCredito.prototype.id,
  TarjetaCreditoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof TarjetaCredito.prototype.id>;

  constructor(
    @inject('datasources.rentacars') dataSource: RentacarsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(TarjetaCredito, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
