import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {RentacarsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Sede} from '../models';
import {SedeRepository} from './sede.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly sedes: HasManyRepositoryFactory<Sede, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.rentacars') dataSource: RentacarsDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Ciudad, dataSource);
    this.sedes = this.createHasManyRepositoryFactoryFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
  }
}
