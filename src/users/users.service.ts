import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ILike, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = createUserDto.password
    const min = 225308;
    const max = 325308;
    createUserDto.sisid = Math.floor(Math.random() * (max - min) + min)
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(filterDto: UserFilterDto): Promise<User[]> {
    let users = []
    const {profile, search, offset= 0, limit} = filterDto;
    if (profile || search) {
      if (profile && search) {
        const profi = await this.profilesService.findOneByName(profile);
        const profileId = profi.id;
        users = await this.userRepository.find({
          order: { id: 'ASC' },
          where: [
            { firstname: ILike(`%${search}%`), id_profile: profileId},
            { email: ILike(`%${search}%`), id_profile: profileId},
            { lastname: ILike(`%${search}%`), id_profile: profileId }
          ],
          skip: offset,
          take: limit
        });
      }
      if (profile && !search) {
        const profi = await this.profilesService.findOneByName(profile);
        const profileId = profi.id;
        users = await this.userRepository.find({
          order: { id: 'ASC' },
          where: { id_profile: profileId },
          skip: offset,
          take: limit
        });
      }
      if (!profile && search) {
        users = await this.userRepository.find({
          order: { id: 'ASC' },
          where: [
            { firstname: ILike(`%${search}%`) },
            { email: ILike(`%${search}%`) },
            { lastname: ILike(`%${search}%`) },
          ],
          skip: offset,
          take: limit
        });
      }
    } else {
      users = await this.userRepository.findAndCount({
        order: { id: 'ASC' },
        skip: offset,
        take: limit
      });
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException(`User with this id: ${id} does not exist`);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id, {});
    if (!user) {
      throw new NotFoundException(`User with this id: ${id} does not exist`);
    }
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    user.password = hashedPassword;
    user.firstname = updateUserDto.firstname;
    user.lastname = updateUserDto.lastname;
    user.id_profile = updateUserDto.id_profile;
    user.email = updateUserDto.email;

    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }
  /**
   * A method that deletes a user from the database
   * @param id An id of a user. A user with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.userRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`User with this id: ${id} does not exist`);
    }
    return;
  }
  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException(`User with this email:${email} does not exist`);
  }
}
