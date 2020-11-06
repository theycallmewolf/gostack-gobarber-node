import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface AppointmentConstructorDTO {
  provider: string;
  date: Date;
}

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

}

export default Appointment;