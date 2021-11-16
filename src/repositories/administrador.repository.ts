import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {RentacarsDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Usuario, Sede, Asesor} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {SedeRepository} from './sede.repository';
import {AsesorRepository} from './asesor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Administrador.prototype.id>;

  public readonly sede: HasOneRepositoryFactory<Sede, typeof Administrador.prototype.id>;

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.rentacars') dataSource: RentacarsDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Administrador, dataSource);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
    this.sede = this.createHasOneRepositoryFactoryFor('sede', sedeRepositoryGetter);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
