import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {RentacarsDataSource} from '../datasources';
import {Sede, SedeRelations, Administrador, Ciudad, Vehiculo} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {CiudadRepository} from './ciudad.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id,
  SedeRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Sede.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Sede.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Sede.prototype.id>;

  constructor(
    @inject('datasources.rentacars') dataSource: RentacarsDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Sede, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
