import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class TarjetaCredito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_propietario: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_tarjeta: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_vencimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_verificacion: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<TarjetaCredito>) {
    super(data);
  }
}

export interface TarjetaCreditoRelations {
  // describe navigational properties here
}

export type TarjetaCreditoWithRelations = TarjetaCredito & TarjetaCreditoRelations;
