import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const newCompany = await this.companyRepository.create(createCompanyDto);
    await this.companyRepository.save(newCompany);
    return newCompany;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Company[]> {
    const companys = await this.companyRepository.find({
      order: { id: 'ASC' },
    });
    return companys;
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id: id },
    });
    if (company) {
      return company;
    }
    throw new NotFoundException(`Company with this id: ${id} does not exist`);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne(id, {});
    if (!company) {
      throw new NotFoundException(`Company with this id: ${id} does not exist`);
    }
    company.welcome = updateCompanyDto.welcome;

    const updatedCompany = await this.companyRepository.save(company);

    return updatedCompany;
  }
  /**
   * A method that deletes a company from the database
   * @param id An id of a company. A company with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.companyRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Company with this id: ${id} does not exist`);
    }
    return;
  }
}
