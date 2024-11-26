import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const newToken = await this.tokenRepository.create(createTokenDto);
    await this.tokenRepository.save(newToken);
    return newToken;
  }
  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  async findAll(): Promise<Token[]> {
    const tokens = await this.tokenRepository.find();
    return tokens;
  }

  async findOne(id: number) {
    const token = await this.tokenRepository.findOne({
      where: { id: id },
    });
    if (token) {
      return token;
    }
    throw new NotFoundException(`Token with this id: ${id} does not exist`);
  }

  async update(id: number, updateTokenDto: UpdateTokenDto) {
    const token = await this.tokenRepository.findOne(id);
    if (!token) {
      throw new NotFoundException(`Token with this id: ${id} does not exist`);
    }
    token.token = updateTokenDto.token;

    const updatedToken = await this.tokenRepository.save(token);

    return updatedToken;
  }
  /**
   * A method that deletes a token from the database
   * @param id An id of a token. A token with this id should exist in the database
   */
  async remove(id: number) {
    const deleteResponse = await this.tokenRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Token with this id: ${id} does not exist`);
    }
    return;
  }
}
