import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const newProfile = await this.profileRepository.create(createProfileDto);
    await this.profileRepository.save(newProfile);
    return newProfile;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileRepository.find();
    return profiles;
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id: id },
    });
    if (profile) {
      return profile;
    }
    throw new NotFoundException(`Profile with this id: ${id} does not exist`);
  }

  async findOneByName(name: string) {
    const profile = await this.profileRepository.findOne({
      where: { name: name },
    });
    if (profile) {
      return profile;
    }
    throw new NotFoundException(`Profile with this id: ${name} does not exist`);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne(id);
    if (!profile) {
      throw new NotFoundException(`Profile with this id: ${id} does not exist`);
    }
    profile.name = updateProfileDto.name;

    const updatedProfile = await this.profileRepository.save(profile);

    return updatedProfile;
  }
  /**
   * A method that deletes a profile from the database
   * @param id An id of a profile. A profile with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.profileRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Profile with this id: ${id} does not exist`);
    }
    return;
  }
}
