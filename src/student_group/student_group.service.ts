import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateStudentGroupDto } from './dto/create-student_group.dto';
import { UpdateStudentGroupDto } from './dto/update-student_group.dto';
import { StudentGroup } from './entities/student_group.entity';

@Injectable()
export class StudentGroupService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(StudentGroup)
    private studentGroupRepository: Repository<StudentGroup>,
  ) {}

  async create(createStudentGroupDto: CreateStudentGroupDto) {
    const newStudentGroup = await this.studentGroupRepository.create(
      createStudentGroupDto,
    );
    await this.studentGroupRepository.save(newStudentGroup);
    return newStudentGroup;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<StudentGroup[]> {
    const studentGroups = await this.studentGroupRepository.find();
    return studentGroups;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllByUser(studentId: number): Promise<StudentGroup[]> {
    const studentGroups = await this.studentGroupRepository.find({where: { id_student: studentId }});
    return studentGroups;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAllByIdGroup(id_group: number): Promise<StudentGroup[]> {
    const studentGroups = await this.studentGroupRepository.find({where: { id_group: id_group }});
    let users = []
    for ( const studentGroup of studentGroups) {
      const user = await this.usersService.findOne(studentGroup.id_student);
      users.push(user);
    }
    return users;
  }
    /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
     async findAllByGroupId(id_group: number): Promise<StudentGroup[]> {
      const studentGroups = await this.studentGroupRepository.find({where: { id_group: id_group }});
      return studentGroups;
    }

  async findOne(id: number) {
    const studentGroup = await this.studentGroupRepository.findOne({
      where: { id: id },
    });
    if (studentGroup) {
      return studentGroup;
    }
    throw new NotFoundException(
      `StudentGroup with this id: ${id} does not exist`,
    );
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    const studentGroup = await this.studentGroupRepository.findOne(id);
    if (!studentGroup) {
      throw new NotFoundException(
        `StudentGroup with this id: ${id} does not exist`,
      );
    }
    studentGroup.id_group = updateStudentGroupDto.id_group;

    const updatedStudentGroup = await this.studentGroupRepository.save(
      studentGroup,
    );

    return updatedStudentGroup;
  }
  /**
   * A method that deletes a studentGroup from the database
   * @param id An id of a studentGroup. A studentGroup with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.studentGroupRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(
        `StudentGroup with this id: ${id} does not exist`,
      );
    }
    return;
  }
}
