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
  Contrato,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteContratoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Contrato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contrato)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Contrato>,
  ): Promise<Contrato[]> {
    return this.clienteRepository.contratoes(id).find(filter);
  }

  @post('/clientes/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contrato)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {
            title: 'NewContratoInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) contrato: Omit<Contrato, 'id'>,
  ): Promise<Contrato> {
    return this.clienteRepository.contratoes(id).create(contrato);
  }

  @patch('/clientes/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Cliente.Contrato PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {partial: true}),
        },
      },
    })
    contrato: Partial<Contrato>,
    @param.query.object('where', getWhereSchemaFor(Contrato)) where?: Where<Contrato>,
  ): Promise<Count> {
    return this.clienteRepository.contratoes(id).patch(contrato, where);
  }

  @del('/clientes/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Cliente.Contrato DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Contrato)) where?: Where<Contrato>,
  ): Promise<Count> {
    return this.clienteRepository.contratoes(id).delete(where);
  }
}
