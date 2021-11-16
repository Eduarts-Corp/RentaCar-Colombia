import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {RentacarsDataSource} from '../datasources';
import {Asesor, AsesorRelations, Administrador, Solicitud, Usuario} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {SolicitudRepository} from './solicitud.repository';
import {UsuarioRepository} from './usuario.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.rentacars') dataSource: RentacarsDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Asesor, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
