import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';

@model()
export class Solicitud extends Entity {
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
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_final: string;

  @property({
    type: 'number',
    required: true,
  })
  total_alquiler: number;

  @property({
    type: 'string',
    required: true,
  })
  comentarios: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
