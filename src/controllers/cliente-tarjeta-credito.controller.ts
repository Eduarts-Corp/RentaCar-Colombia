import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  TarjetaCredito,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteTarjetaCreditoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/tarjeta-creditos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many TarjetaCredito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TarjetaCredito)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TarjetaCredito>,
  ): Promise<TarjetaCredito[]> {
    return this.clienteRepository.tarjetaCreditos(id).find(filter);
  }

  @post('/clientes/{id}/tarjeta-creditos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(TarjetaCredito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarjetaCredito, {
            title: 'NewTarjetaCreditoInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) tarjetaCredito: Omit<TarjetaCredito, 'id'>,
  ): Promise<TarjetaCredito> {
    return this.clienteRepository.tarjetaCreditos(id).create(tarjetaCredito);
  }

  @patch('/clientes/{id}/tarjeta-creditos', {
    responses: {
      '200': {
        description: 'Cliente.TarjetaCredito PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarjetaCredito, {partial: true}),
        },
      },
    })
    tarjetaCredito: Partial<TarjetaCredito>,
    @param.query.object('where', getWhereSchemaFor(TarjetaCredito)) where?: Where<TarjetaCredito>,
  ): Promise<Count> {
    return this.clienteRepository.tarjetaCreditos(id).patch(tarjetaCredito, where);
  }

  @del('/clientes/{id}/tarjeta-creditos', {
    responses: {
      '200': {
        description: 'Cliente.TarjetaCredito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TarjetaCredito)) where?: Where<TarjetaCredito>,
  ): Promise<Count> {
    return this.clienteRepository.tarjetaCreditos(id).delete(where);
  }
}
