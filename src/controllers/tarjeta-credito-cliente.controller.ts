import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TarjetaCredito,
  Cliente,
} from '../models';
import {TarjetaCreditoRepository} from '../repositories';

export class TarjetaCreditoClienteController {
  constructor(
    @repository(TarjetaCreditoRepository)
    public tarjetaCreditoRepository: TarjetaCreditoRepository,
  ) { }

  @get('/tarjeta-creditos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to TarjetaCredito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof TarjetaCredito.prototype.id,
  ): Promise<Cliente> {
    return this.tarjetaCreditoRepository.cliente(id);
  }
}
