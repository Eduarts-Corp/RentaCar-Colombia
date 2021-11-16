import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {RentacarsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud, Contrato, Usuario, TarjetaCredito} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {ContratoRepository} from './contrato.repository';
import {UsuarioRepository} from './usuario.repository';
import {TarjetaCreditoRepository} from './tarjeta-credito.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.id>;

  public readonly contratoes: HasManyRepositoryFactory<Contrato, typeof Cliente.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Cliente.prototype.id>;

  public readonly tarjetaCreditos: HasManyRepositoryFactory<TarjetaCredito, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.rentacars') dataSource: RentacarsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ContratoRepository') protected contratoRepositoryGetter: Getter<ContratoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('TarjetaCreditoRepository') protected tarjetaCreditoRepositoryGetter: Getter<TarjetaCreditoRepository>,
  ) {
    super(Cliente, dataSource);
    this.tarjetaCreditos = this.createHasManyRepositoryFactoryFor('tarjetaCreditos', tarjetaCreditoRepositoryGetter,);
    this.registerInclusionResolver('tarjetaCreditos', this.tarjetaCreditos.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.contratoes = this.createHasManyRepositoryFactoryFor('contratoes', contratoRepositoryGetter,);
    this.registerInclusionResolver('contratoes', this.contratoes.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
