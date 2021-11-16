import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {RentacarsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Vehiculo, Asesor, Cliente} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Solicitud.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Solicitud.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.rentacars') dataSource: RentacarsDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
